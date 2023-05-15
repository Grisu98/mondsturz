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

  prepareDerivedData() {

    // goning the actor.overrides route as prepareData is getting called 3 times? idk why
    // and for some reason only on the first call the active effects are being applied.
    // But overrides is always correct
    // Maybe the effect thing i did in items is bugged 
    if (this.actor && this.type === "waffe" && this.system.stats?.skillKey) {
      const tKey = this.system?.stats?.skillKey8;
      const overrides = this.actor.overrides;
      let dmgMod = 0;
      if (overrides?.system?.talente && tKey) {
        dmgMod = overrides.system.talente[tKey]?.dmgMod || 0;
      }
      this.system.stats.finalDmg = `${this.system.stats.damage}+${this.system.stats.level}+${dmgMod}`;
    }
    super.prepareDerivedData();
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

  async roll(dataset) {

    switch (this.type) {
      case "zauber":
        await this._rollZauber(dataset);
        break;
      case "waffe":
        await this._rollWaffe(dataset);
        break;
      default:

        break;
    }
  }

  async _rollWaffe(context) {

    const tKey = this.system.stats.skillKey;
    const talent = this.actor.system.talente[tKey];

    let dialogData = {
      tValue: talent?.wert || 0,
      tName: talent?.label || "Talent",
      mod: talent?.mod || 0
    }

    dialogData.mod += this.system.stats.level;

    if (context?.map) {
      dialogData.mod -= 3
    }

    let dialog = new msRollDialog(dialogData);
    let rd = await dialog.createDialog();
    let r;

    if (rd.mode) {
      r = await new Roll(`3d6${rd.mode}2 + ${rd.talent}+${rd.mod}`).evaluate({ async: false })
    }
    else {
      r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.mod}`).evaluate({ async: false })

    }

    let finalDmg = this.system.stats.finalDmg;
    let htmlData = { itm: this, dmg: finalDmg }
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/waffe-message.hbs", htmlData)
    let message = await new ChatMessage({
      rolls: [r],
      flavor: flavor,
      content: r.total,
      type: 5,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flags: { mondsturz: { type: "attackMessage", value: this.system.stats.damage } },

    });
    ChatMessage.create(message)
  }

  async _rollZauber(dataset) {
    const zauberLevel = this.system.level[dataset.zauberLevel];
    const zauberSystem = this.system;
    const actorData = this.actor.system.talente[zauberSystem.stats.talentKey];
    const dialogData = {
      tValue: actorData.wert,
      tName: actorData.label,
      item: this
    }
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
      speaker: ChatMessage.getSpeaker({ speaker: this.actor })
    });
    ChatMessage.create(message)
  }

  async rollDamage() {

    const flavor = await renderTemplate("systems/mondsturz/templates/chat/damage-message.hbs", this);

    let r = await new Roll(this.system.stats.finalDmg).evaluate({ async: false })

    let message = await new ChatMessage({
      rolls: [r],
      content: r.total,
      flavor: flavor,
      type: 5,
      speaker: ChatMessage.getSpeaker(this.actor),
    });
    ChatMessage.create(message);

  }

  async applyDamage() {
    ui.notifications.warn("Schaden über Chatnachricht zufügen ist noch nicht möglich")
    return
  }

}
