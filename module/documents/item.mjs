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


  _onUpdate(data, options, userId) {

    super._onUpdate(data, options, userId);

    if (this.type === "waffe" && this.actor && this.permission === 3) {
      this.giveComputedDmg();
    }

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

  giveComputedDmg() {

    if (this.permission === 3) {
      const dmgMod = this.actor.system.talente[this.system.stats.skillKey]?.dmgMod;
      const lvlMod = this.system.stats?.level;
      const dmgWpn = this.system.stats?.damage;

      let compDmgMod = dmgMod ? `+${dmgMod}` : "";
      let compLvlMod = lvlMod ? `+${lvlMod}` : "";
      let compDmgWpn = dmgWpn ? `${dmgWpn}` : "";
      const computedDmg = compDmgWpn + compLvlMod + compDmgMod;

      this.setFlag("mondsturz", "computedDmg", computedDmg)
      return computedDmg
    }
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

    let finalDmg = `${this.system.stats.damage} + ${this.system.stats.level} + ${talent.dmgMod}`;
    let htmlData = { itm: this, dmg: finalDmg }
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/waffe-message.hbs", htmlData)
    let message = await new ChatMessage({
      rolls: [r],
      flavor: flavor,
      content: r.total,
      type: 5,
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flags: { mondsturz: { type: "attackMessage", value: this.system.stats.damage } },

    });
    ChatMessage.create(message)
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

  async _rollWaffeOld(dialogData, actor, dataset) {
    dialogData.mod += this.system.stats.level;
    // handle roll Dialog
    let dialog = new msRollDialog(dialogData);
    let rd = await dialog.createDialog();
    let r;
    // roll with the input of the dialog
    if (rd.mode) {
      r = await new Roll(`3d6${rd.mode}2 + ${rd.talent}+${rd.mod}`).evaluate({ async: false })
    }
    else {
      r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.mod}`).evaluate({ async: false })

    }
    // create the chat message

    let computedDmg = this.giveComputedDmg();

    let htmlData = { itm: this, dmg: computedDmg }
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/waffe-message.hbs", htmlData)

    let message = await new ChatMessage({
      rolls: [r],
      flavor: flavor,
      content: r.total,
      type: 5,
      speaker: ChatMessage.getSpeaker({ actor }),
      flags: { mondsturz: { type: "attackMessage", value: this.system.stats.damage } },


    });
    ChatMessage.create(message)
  }

  async rollDamage(key) {

    const flavor = await renderTemplate("systems/mondsturz/templates/chat/damage-message.hbs", this);
    let rollFormula;
    if (this.type === "waffe") {
      let dmgMod = this.parent.system.talente[this.system.stats.skillKey].dmgMod || 0;
      let lvlMod = this.system.stats.level || 0;
      rollFormula = this.system.stats.damage + "+" + lvlMod + "+" + dmgMod
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
      speaker: ChatMessage.getSpeaker(this.actor),
    });
    ChatMessage.create(message);

  }

  async applyDamage() {
    ui.notifications.warn("Schaden über Chatnachricht zufügen ist noch nicht möglich")
    return
  }

}
