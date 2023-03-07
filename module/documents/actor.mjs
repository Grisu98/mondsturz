import { msRollDialog } from "../helpers/utils.js"

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class MondsturzActor extends Actor {
  constructor(data, context) {
    super(data, context);

    this.merkmale = {}
  }
  /** @override */
  prepareData(data) {
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


    // calculate talentgruppe

    // find out how many points have been invested in each talentgruppe
    for (let talentKey in systemData.talente) {
      let talent = systemData.talente[talentKey];
      if (talent.talentKey) {
        systemData.talentGruppen[talent.talentKey].invested += talent.wert;
      }
    }

    // deactivated for now 
    // // calucalte how many points each talentgruppe has 6 18 36
    // for (let tGruppe in systemData.talentGruppen) {
    //   let invested = systemData.talentGruppen[tGruppe].invested;
    //   if (invested < 6) {
    //     systemData.talentGruppen[tGruppe].wert = 1;
    //     systemData.talentGruppen[tGruppe].maxTalent = 3;
    //   }
    //   else if (invested < 18) {
    //     systemData.talentGruppen[tGruppe].wert = 2;
    //     systemData.talentGruppen[tGruppe].maxTalent = 6;
    //   }
    //   else if (invested < 36) {
    //     systemData.talentGruppen[tGruppe].wert = 3;
    //     systemData.talentGruppen[tGruppe].maxTalent = 9;
    //   }
    //   else {
    //     systemData.talentGruppen[tGruppe].wert = 4;
    //     systemData.talentGruppen[tGruppe].maxTalent = 12;
    //   }
    // }

    // // fix diverse to zeropoints and magic to 0/12
    // systemData.talentGruppen.diverse1.wert = 0;
    // systemData.talentGruppen.diverse1.maxTalent = 12;

    // systemData.talentGruppen.diverse2.wert = 0;
    // systemData.talentGruppen.diverse2.maxTalent = 12;

    // systemData.talentGruppen.magieschulen.wert = 0;
    // systemData.talentGruppen.magieschulen.maxTalent = 12;

    // systemData.talentGruppen.mysthkuenste.wert = 0;
    // systemData.talentGruppen.mysthkuenste.maxTalent = 12;


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
        talent = this.system.talentGruppen[dataset.talent];
        skill = { label: talent.label };
        break;
      case "skill":
        talent = this.system.talentGruppen[dataset.talent];
        skill = this.system.talente[dataset.skill];
        break;
      case "properties":

        break;
      default:
        talent = this.system.attribute.resistenzen[dataset.talent];
        skill = { label: talent.label };
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
      speaker: ChatMessage.getSpeaker(this)
    });
    ChatMessage.create(message)
  }

  // _onCreateEmbeddedDocuments(embeddedName, ...args) {
  //   super._onCreateEmbeddedDocuments(embeddedName, ...args);

  //   if (args[1][0].type === "merkmal") {
  //     this._handleMerkmal(args[1][0]);
  //   }
  // }

  // _onDeleteEmbeddedDocuments(embeddedName, ...args) {
  //   super._onDeleteEmbeddedDocuments(embeddedName, ...args);
  //   let barear = args[0][0].type;
  //   if (args[0][0].type === "merkmal") {
  //     this._handleMerkmal(args[0][0], false);
  //   }
  // }

  _handleMerkmal(merkmal, add = true) {

    let sysData = merkmal.system
    let updateKey = `system.${sysData.key}`;
    let oldValueString = updateKey.split(".").reduce((obj, prop) => obj[prop], this);
    let oldValue = parseInt(oldValueString);
    let newValue = add ? oldValue + sysData.value : oldValue - sysData.value;
    let update = {};
    update[updateKey] = newValue;
    this.update(update);
  }
}