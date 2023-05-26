import { msRollDialog, msRollDialogHelper } from "../helpers/utils.js"

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class MondsturzActor extends Actor {
  constructor(data, context) {
    super(data, context);
    data.prototypeToken.vision = true;
  }
  /** @override */
  prepareData(data) {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }
  /**
   * @override
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    this._prepareCharacterData(actorData, systemData);
    this._prepareNpcData(actorData, systemData);
  }


  _prepareCharacterData(actorData, systemData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:

    const flags = actorData.flags.mondsturz || {};

    const items = actorData.items.contents;
    items.forEach((element) => {
      if (element.system.weight) {
        systemData.misc.inventar.wert += element.system.weight;
      }
    })

    systemData.attributeBars = {
      "leben": {
        value: systemData.attribute.koerper.leben.wert,
        max: systemData.attribute.koerper.leben.max
      }
    };


    for (let talentKey in systemData.talente) {
      let talent = systemData.talente[talentKey];
      if (talent.talentKey) {
        systemData.talentGruppen[talent.talentKey].invested += talent.wert;
      }
    }


    // calucalte how many points each talentgruppe has 6 18 36
    for (let tGruppe in systemData.talentGruppen) {
      let invested = systemData.talentGruppen[tGruppe].invested;
      if (invested < 6) {
        systemData.talentGruppen[tGruppe].wert = 1;
        systemData.talentGruppen[tGruppe].maxTalent = 3;
      }
      else if (invested < 18) {
        systemData.talentGruppen[tGruppe].wert = 2;
        systemData.talentGruppen[tGruppe].maxTalent = 6;
      }
      else if (invested < 36) {
        systemData.talentGruppen[tGruppe].wert = 3;
        systemData.talentGruppen[tGruppe].maxTalent = 9;
      }
      else {
        systemData.talentGruppen[tGruppe].wert = 4;
        systemData.talentGruppen[tGruppe].maxTalent = 12;
      }
    }

    // fix diverse to zeropoints and magic to 0/12
    systemData.talentGruppen.diverse1.wert = 0;
    systemData.talentGruppen.diverse1.maxTalent = 12;

    systemData.talentGruppen.diverse2.wert = 0;
    systemData.talentGruppen.diverse2.maxTalent = 12;

    systemData.talentGruppen.magieschulen.wert = 0;
    systemData.talentGruppen.magieschulen.maxTalent = 12;

    systemData.talentGruppen.mysthkuenste.wert = 0;
    systemData.talentGruppen.mysthkuenste.maxTalent = 12;

    this._calcualteSpendPointsInfo(actorData, systemData)

  }


  _calcualteSpendPointsInfo(actorData, systemData) {

    // alle Talente
    let talentP = 0;
    const talente = systemData.talente;
    for (let key in talente) {
      talentP += talente[key].wert
    }

    // alle Attribute (kein reflex, ruestwert[ruestzustand], hyperarmor)
    let attriP = 0;
    const attribute = systemData.attribute;

    for (const [key, value] of Object.entries(attribute.koerper)) {
      if (key === "hyperarmor" || key === "ruestwert" || key === "reflex") {
        continue;
      }
      attriP += value.wert;
    }

    // resistenzen noch
    let resiP = 0;
    for (const [_key, value] of Object.entries(attribute.resistenzen)) {
      resiP += value.wert;
    }

    systemData.misc.talentPunkte = talentP;
    systemData.misc.attributPunkte = attriP + (resiP / 4);
  }

  _prepareNpcData(actorData, systemData) {
    if (actorData.type !== 'npc') return;




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

  _getCharacterRollData(data) {
    if (this.type !== 'character') return;
  }

  _getNpcRollData(data) {
    if (this.type !== 'npc') return;
  }

  async rollProp(path) {


    let prop = this._getPropertyByPath(path)

    const msDialogData = {
      title: this.name,
      modifiers: [["Talent", prop.value]],
      options: [["checkbox", "vornach"]]
    }

    if (prop.mod) {
      msDialogData.modifiers.push(["Talent Mod", prop.mod])
    }

    const data = {
      tValue: prop.wert,
      tName: prop.label,
      mod: prop.mod || 0,
    }

    const context = {
      modifiers: [
        { value: prop.wert, label: prop.label },
      ],
      options: {
      }
    }

    if (prop.mod) {
      context.modifiers.push({ value: prop.mod, label: `${prop.label} Mod` })
    }

    let a = new msRollDialogHelper(prop);
    let b = await a.createDialog()
    console.log("after")


    // let dialog = new msRollDialog(data);
    // let rd = await dialog.createDialog();
    // let r
    // if (rd.mode) {
    //   r = await new Roll(`3d6${rd.mode}2 + ${rd.talent}+${rd.mod}`).evaluate({ async: false })
    // }
    // else {
    //   r = await new Roll(`2d6${rd.mode} + ${rd.talent}+${rd.mod}`).evaluate({ async: false })
    // }
    // let flavor = `<h3>${data.tName} Wurf</h3>`

    // let message = await new ChatMessage({
    //   rolls: [r],
    //   content: r.total,
    //   flavor: flavor,
    //   type: 5,
    //   speaker: ChatMessage.getSpeaker(this)
    // });
    // ChatMessage.create(message)
  }

  _getPropertyByPath(path) {
    const keys = path.split('.'); // Split the path into individual keys
    let value = this;

    for (let key of keys) {
      if (value && value.hasOwnProperty(key)) {
        value = value[key]; // Move deeper into the object
      } else {
        return undefined; // Property not found
      }
    }

    return value;
  }

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

  async createDivTalent(ev) {

    // create array of all div taletnte
    let divArray = [];
    let talenteData = this.system.talente;
    let divAccu = 0;
    Object.keys(talenteData).forEach(key => {
      let value = talenteData[key];
      if (value.talentKey === "diverse1") {
        divArray.push(key)
      }
    })

    // find lowest not used number 
    const nums = divArray.map(str => parseInt(str.replace('divTalent', '')));
    let lowestNum = 1;
    while (nums.includes(lowestNum)) {
      lowestNum++;
    }

    let update = {};
    let updatePath = `system.talente.divTalent${lowestNum}`;
    update[updatePath] = {
      label: "",
      wert: 0,
      mod: 0,
      talentKey: "diverse1",
      istBeruf: false,
      istHobby: false,
    }

    await this.update(update)
    return lowestNum
  }
}