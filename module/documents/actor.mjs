import { msRollDialog } from "../helpers/utils.js"

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class MondsturzActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.mondsturz || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    const items = actorData.items.contents;
    items.forEach((element) => {
      if (element.system.weight) {
        systemData.misc.inventar.wert += element.system.weight;
      }
    })
    // 



    // Loop through ability scores, and add their modifiers to our sheet output.
    // 
    //  for (let [name, props] of Object.entries(systemData.skills)) {
    //      ability.derived = props.value + props.modifier;
    //  }
  }
  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

  }

  async rollProp(dataset) {
    let talent;
    let skill;
    switch (dataset.type) {
      case "talent":
        talent = this.system.talente[dataset.talent];
        skill = {label: talent.label};
        break;
      case "skill":
        talent = this.system.talente[dataset.talent];
        skill = talent.skills[dataset.skill];
        break;
      case "properties":

        break;
      default:
        talent = this.system.attribute.resistenzen[dataset.talent];
        skill = {label: talent.label};
        break;
    }

    const data = {
      tValue: talent.wert,
      sValue: skill.wert || 0,
      tName: talent.label,
      sName: skill.label,
      mod: (skill.mod || 0) + (talent.mod || 0),
    }
    let dialog = new msRollDialog(data);
    let rd = await dialog.createDialog();

    let r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.skill}+${rd.mod}`).evaluate({ async: false })

    let flavor = `<h3>${data.sName} Wurf</h3>`

    let message = await new ChatMessage({
      rolls: [r],
      content: r.total,
      flavor: flavor,
      type: 5,
      speaker: ChatMessage.getSpeaker(this )
    });
    ChatMessage.create(message)
  }

}