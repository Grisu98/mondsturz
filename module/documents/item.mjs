import { msDialogHelper } from "../helpers/utils.js"
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
    // if (this.actor && this.type === "waffe" && this.system.stats?.skillKey) {
    //   const tKey = this.system?.stats?.skillKey;
    //   const overrides = this.actor.overrides;
    //   let dmgMod = 0;
    //   if (overrides?.system?.talente && tKey) {
    //     dmgMod = overrides.system.talente[tKey]?.dmgMod || 0;
    //   }
    //   this.system.stats.finalDmg = `${this.system.stats.damage}+${this.system.stats.level}+${dmgMod}`;
    // }
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
    const prop = this.actor.system.talente[tKey];

    const info = {
      name: this.name,
      rollTerm: "2d6",
      prop: false
    }

    const modifiers = [
      ["Talent", prop.wert, true],
      ["Multi Angriff", -3, false]

    ]
    const options = [
      ["Vorteil", false],
      ["Nachteil", false]
    ]

    if (prop.mod) { modifiers.push(["Mod", prop.mod, true]) }
    if (this.system.stats.level) { modifiers.splice(1,0,["Waffen Level", this.system.stats.level, true]) }

    let dialog = new msDialogHelper(info, modifiers, options);

    let userData = await dialog.createDialog();
    if (userData.options[0][1]) {
      userData.info.rollTerm = "3d6kh2"
    }
    else if (userData.options[1][1]) {
      userData.info.rollTerm = "3d6kl2"
    }

    let finalTerm = userData.info.rollTerm;

    userData.modifiers.forEach((curr, index, array) => {
      if (curr[2]) {
        finalTerm += ` + ${curr[1]}`
      }
    })

    let roll = await new Roll(finalTerm).evaluate();
    const htmlData = {userData: userData, item: this, attack: true}
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/waffe-message.hbs", htmlData)
    let message = await new ChatMessage({
      rolls: [roll],
      content: roll.total,
      flavor: flavor,
      type: 5
    });
    ChatMessage.create(message)
  }



  async _rollZauber(dataset) {
    const tKey = this.system.stats.talentKey;
    const prop = this.actor.system.talente[tKey];
    const zauberLevel = this.system.level[dataset.zauberLevel];

    const info = {
      name: this.name,
      rollTerm: "2d6",
      prop: false
    }

    const modifiers = [
      ["Talent", prop.wert, true],
    ]
    const options = [
      ["Vorteil", false],
      ["Nachteil", false]
    ]

    if (prop.mod) { modifiers.push(["Mod", prop.mod, true]) }

    let dialog = new msDialogHelper(info, modifiers, options);

    let userData = await dialog.createDialog();
    if (userData.options[0][1]) {
      userData.info.rollTerm = "3d6kh2"
    }
    else if (userData.options[1][1]) {
      userData.info.rollTerm = "3d6kl2"
    }

    let finalTerm = userData.info.rollTerm;

    userData.modifiers.forEach((curr, index, array) => {
      if (curr[2]) {
        finalTerm += ` + ${curr[1]}`
      }
    })
    userData.misc = zauberLevel.text

    let roll = await new Roll(finalTerm).evaluate();
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/std-message.hbs", userData)
    let message = await new ChatMessage({
      rolls: [roll],
      content: roll.total,
      flavor: flavor,
      type: 5
    });
    ChatMessage.create(message)
  }

  async rollDamage() {

    const tKey = this.system.stats.skillKey;
    const prop = this.actor.system.talente[tKey];

    const info = {
      name: this.name + " Schaden",
      rollTerm: this.system.stats.damage,
      prop: false
    }

    const modifiers = []

    const options = [
    ]

    if (this.system.stats.level) { modifiers.push(["Waffen Level", this.system.stats.level, true]) }
    if (prop.dmgMod) { modifiers.push(["Schaden Mod", prop.dmgMod, true]) }

    let dialog = new msDialogHelper(info, modifiers, options);
    let userData = await dialog.createDialog();
    let finalTerm = userData.info.rollTerm;

    userData.modifiers.forEach((curr, index, array) => {
      if (curr[2]) {
        finalTerm += ` + ${curr[1]}`
      }
    })

    

    let roll = await new Roll(finalTerm).evaluate();

    const htmlData = {userData: userData, item: this}
    const flavor = await renderTemplate("systems/mondsturz/templates/chat/waffe-message.hbs", htmlData)
    let message = await new ChatMessage({
      rolls: [roll],
      content: roll.total,
      flavor: flavor,
      type: 5
    });
    ChatMessage.create(message)

  }

  async applyDamage() {
    ui.notifications.warn("Schaden über Chatnachricht zufügen ist noch nicht möglich")
    return
  }

}
