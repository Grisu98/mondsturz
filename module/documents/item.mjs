import { msRollDialog } from "../helpers/utils.js"
/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class MondsturzItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
  getRollData() {
    // If present, return the actor's roll data.
    if (!this.actor) return null;
    const rollData = this.actor.getRollData();
    // Grab the item's system data as well.
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async oldRoll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.system.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }

  async rollOldOld(a) {
    let context = {};
    let options = {};


    context.type = this.type;
    context.actor = a;
    context.item = this;
    context.talent = a.system.talente[context.item.system.stats.talentKey] ??
      a.system.magie.kuenste[context.item.system.stats.talentKey];

    context.skill = context.talent.skills?.[context.item.system.stats.skillKey] ??
      a.system.magie.schulen?.[context.item.system.stats.talentKey] ??
      { wert: 0, label: "Skill", mod: 0 };

    context.mod = { wert: context.item.system.stats.level };

    if (context.type === "zauber") {
      context.zauberLevel = 1
    }
    let msR = new MsRoll(context)
    msR.createDialog();

  }

  async roll(actor, dataset) {
    if (!actor) {
      return
    }

    let dialogData = {};
    const tKey = this.system.stats.talentKey;
    const sKey = this.system.stats.skillKey;

    const talent = actor.system?.talente[tKey] ? actor.system.stats.talente[tKey] : actor.system.talente.mysthkuenste.skills[tKey];
    const skill= talent?.skills ? talent.skills[sKey] : actor.system.talente.magieschulen.skills[sKey];

    dialogData.tValue = talent.wert || 0;
    dialogData.sValue = skill.wert || 0;
    dialogData.tName = talent.label;
    dialogData.sName = skill.label;
    dialogData.mod = talent.mod + skill.mod;

    switch (this.type) {
      case "zauber":
        await this._rollZauber(dialogData, actor, dataset);
        break;
      case "waffe":
        await this._rollWaffe(dialogData, actor, dataset);
        break;
      default:

        break;
    }
  }


  async _rollZauber(dialogData, actor, dataset) {
    const zauberLevel = this.system.level[dataset.zauberLevel]
    let dialog = new msRollDialog(dialogData);
    let rd = await dialog.createDialog();

    // roll with the input of the dialog
    let r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.skill}+${rd.mod}`).evaluate({ async: false });

    // create the chat message
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/zauber-message.hbs", {item: this, misc: zauberLevel})

    let message = await new ChatMessage({
      rolls: [r],
      content: r.total,
      flavor: flavor,
      type: 5,
      speaker: ChatMessage.getSpeaker({ actor })
    });
    ChatMessage.create(message)
  }

  async _rollWaffe(dialogData, actor, dataset) {


    // handle roll Dialog
    let dialog = new msRollDialog(dialogData);
    let rd = await dialog.createDialog();

    // roll with the input of the dialog
    let r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.skill}+${rd.mod}`).evaluate({ async: false })

    // create the chat message
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/waffe-message.hbs", this)

    let message = await new ChatMessage({
      rolls: [r],
      flavor: flavor,
      content: r.total,
      type: 5,
      speaker: ChatMessage.getSpeaker({ actor })

    });
    ChatMessage.create(message)
  }

  async rollDamage() {

    const flavor = await renderTemplate("systems/mondsturz/templates/chat/damage-message.hbs", this)

    // create Roll
    let r = await new Roll(`${this.system.stats.damage}`).evaluate({ async: false })

    let message = await new ChatMessage({
      rolls: [r],
      content: r.total,
      flavor: flavor,
      type: 5,
      speaker: ChatMessage.getSpeaker( this.actor)
    });
    ChatMessage.create(message)
  }

  async applyDamage() {
    ui.notifications.warn("Schaden über Chatnachricht zufügen ist noch nicht möglich")
    return
  }
}
