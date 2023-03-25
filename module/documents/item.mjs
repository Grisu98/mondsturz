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

  async roll(actor, dataset) {
    if (!actor) {
      return
    }

    let dialogData = {};
    const tKey = this.system.stats.skillKey;

    const talent = actor.system.talente[tKey];

    dialogData.tValue = talent.wert || 0;
    dialogData.tName = talent.label;
    dialogData.mod = talent.mod;

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
    const zauberLevel = this.system.level[dataset.zauberLevel];
    zauberLevel.key = dataset.zauberLevel;
    let dialog = new msRollDialog(dialogData);
    let rd = await dialog.createDialog();

    // roll with the input of the dialog
    let r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.mod}`).evaluate({ async: false });

    // create the chat message
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/zauber-message.hbs", { item: this, misc: zauberLevel })

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
    let r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.mod}`).evaluate({ async: false })

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

  async rollDamage(key) {

    const flavor = await renderTemplate("systems/mondsturz/templates/chat/damage-message.hbs", this);
    let rollFormula;
    if (this.type === "waffe") {
      rollFormula = this.system.stats.damage;
    }
    else {
      rollFormula = this.system.level[key].formula;
    }
    let r = await new Roll(rollFormula).evaluate({ async: false })

    let message = await new ChatMessage({
      rolls: [r],
      content: r.total,
      flavor: flavor,
      type: 5,
      speaker: ChatMessage.getSpeaker(this.actor)
    });
    ChatMessage.create(message)
  }

  async applyDamage() {
    ui.notifications.warn("Schaden über Chatnachricht zufügen ist noch nicht möglich")
    return
  }
}
