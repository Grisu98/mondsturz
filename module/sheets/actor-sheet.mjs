import { MsRoll } from "../helpers/utils.js";
import { ActorSettings } from "../sheets/actor-settings.mjs"
import { AdrenalinSheet } from "../sheets/adrenalin-sheet.mjs"
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class MondsturzActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["mondsturz", "sheet", "actor"],
      template: "systems/mondsturz/templates/actor/actor-sheet.hbs",
      width: 700,
      height: 860,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "allgemein" }]
    });
  }

  /** @override */
  get template() {
    return `systems/mondsturz/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.actor.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }



    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {

    // this is a mess


    // context.system
    // handle talent and talentgruppen splitting

    // shallow copy as only primitives inside
    // only do this if not exting already
    context.talentGruppen = { ...context.system.talentGruppen };
    for (let tg in context.talentGruppen) {
      if (!context.talentGruppen[tg].talente)
        context.talentGruppen[tg].talente = {};
    }

    for (let key in context.system.talente) {
      let talent = context.system.talente[key];
      if (talent.talentKey) {
        let gKey = talent.talentKey;
        context.talentGruppen[gKey].talente[key] = talent;
      }
    }

    for (let i in context.talentGruppen) {
      let length = Object.keys(context.talentGruppen[i].talente).length
      if (!length) {
        delete context.talentGruppen[i];
      }
    }


    // handle the mana/life bar
    const koerper = context.system.attribute.koerper;
    context.bars = {
      leben: { ...koerper.leben, css: "leben-bar" },
      mana: { ...koerper.mana, css: "mana-bar" },
      ruestwert: { ...koerper.ruestwert, css: "ruestwert-bar" }
    }

    for (let key in context.bars) {
      let bar = context.bars[key];
      let newVal = (100 * bar.wert) / bar.max
      if (Number.isInteger(newVal)) {
        bar.percentage = newVal;
      }
      else {
        bar.percentage = 0;
      }
    }


    // handle other koerper attributes
    context.koerper = {};

    for (let key in context.system.attribute.koerper) {
      if (key === "mana" || key === "ruestwert" || key === "leben") {
      }
      else {
        let attr = context.system.attribute.koerper[key];
        context.koerper[key] = attr;
      }
    }


    // prepare Adrenalin
    context.adrenalin = {}

    for (let pKey in context.system.misc.adrenalin) {
      for (let cKey in context.system.misc.adrenalin[pKey]) {
        if (context.system.misc.adrenalin[pKey][cKey]) {
          context.adrenalin[pKey] = CONFIG.ms.adrenalin[pKey][cKey]
        }
      }
    }

  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const waffen = [];
    const zauber = [];
    const gegenstande = [];
    const equipments = [];
    const eigenschaften = [];
    const merkmale = [];
    let invSpace = 0;



    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;

      // finding out how much inv space is being used up
      if (i.system?.weight) {
        invSpace = i.system.weight + invSpace;
      }

      switch (i.type) {
        case "waffe":
          waffen.push(i);
          break;

        case "zauber":
          zauber.push(i);
          break;

        case "gegenstand":
          gegenstande.push(i)
          break;

        case "equipment":
          equipments.push(i)
          break;

        case "eigenschaft":
          eigenschaften.push(i)
          break;

        case "merkmal":
          merkmale.push(i)
          break;
        default:
          break;
      }


    }



    // Assign and return
    context.waffen = waffen;
    context.zauber = zauber;
    context.equipments = equipments;
    context.gegenstande = gegenstande;
    context.usedInv = { used: invSpace };
    context.eigenschaften = eigenschaften;
    context.config = CONFIG.ms;
    context.sortedEig = [];
    context.merkmale = merkmale;


    this._prepareMerkmale(context);

    // eigenschaften.forEach(element => {
    //   let rankArray = Object.keys(element.system.ranks);
    //   let textKey = rankArray[element.system.rank];
    //   context.sortedEig.push({
    //     text: element.system.ranks[textKey].text,
    //     name: element.name,
    //     descr: element.system.description,
    //     id: element._id,
    //     img: element.img
    //   })
    // });


  }

  _prepareMerkmale(context) {
    if (!context.merkmale.length) {
      return
    }
    let merkmale = foundry.utils.deepClone(context.merkmale);

    // convert ranks to array so i dont have to rewrite this whole thing


    // maybe implement differnt things for volk?
    merkmale.forEach(element => {
      if (element.system.type === "charakterklasse") {

        const filteredArr = Object.values(element.system.ranks).filter((_ele, index) => index >= 0 && index <= element.system.rank)
        element.system.description = filteredArr.join('\n');
      }
    });

    context.merkmale = merkmale;
  }

  /** @override */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();
    const canConfigure = game.user.isGM || (this.actor.isOwner && game.user.can("TOKEN_CONFIGURE"));
    if (this.options.editable && canConfigure) {
      buttons.splice(1, 0, {
        label: "Adrenalin",
        class: "configure-actor",
        icon: "fas fa-syringe",
        onclick: ev => {
          ev.preventDefault();
          new AdrenalinSheet(this.actor).render(true);
        }
      });
    }
    return buttons
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      ev.stopPropagation();
      const li = ev.currentTarget.closest(".item");
      const item = this.actor.items.get(li.dataset.itemId);
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      ev.stopPropagation();
      new Promise(resolve => {
        new Dialog({
          content: "Item wirklich löschen?",
          buttons: {
            ja: {
              label: "ja",
              callback: _delItem.bind(this)
            },
            nein: {
              label: "nein",
              callback: resolve(null)
            }
          }
        }).render(true)
      })

      function _delItem() {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("item-id"));
        item.delete();
        li.slideUp(200, () => this.render(false));
      };
    });

    // In Sheet value edit of items
    html.find(".edit-item-insheet").change(ev => this._onEditItemValue(ev))

    // Rollable abilities.
    //html.find('.rollable-skill').click(this._onRoll.bind(this));

    html.find('.rollabe-prop').click((event) => {
      let dataset = event.currentTarget.dataset;
      this.actor.rollProp(dataset)
    })

    // html.find('.rollable-talent').click(this._onRollTalent.bind(this));

    html.find('.clear-input').click(async function (event) {
      await event.stopPropagation();
    });
    // Rollable items,
    html.find('.rollable-item').click(this._onRollItem.bind(this));

    // Rollable Misc,
    // html.find('.rollable-misc').click(this._onRoll.bind(this));

    html.find('.accordion-header').click(async (ev) => {
      let allHeaders = document.getElementsByClassName("accordion-header");
      let allContents = document.getElementsByClassName("accordion-content");
      for (let i = 0; i < allHeaders.length; i++) {
        allHeaders[i].classList.remove("active");
      }
      for (let i = 0; i < allContents.length; i++) {
        allContents[i].classList.remove("active");
      }
      let curr = ev.currentTarget;
      curr.classList.toggle("active");
      curr.nextElementSibling.classList.toggle("active")
      await this.actor.setFlag("mondsturz", "activeId", curr.id)
    })

    html.find('.zauber-level').click((ev) => {
      ev.preventDefault();
      let txtId = ev.currentTarget.dataset.target;
      let txt = document.getElementById(txtId);
      let allTxt = document.getElementsByClassName("zauber-texts");
      let allTxtArr = Array.from(allTxt).reduce((acc, curr) => {
        let childs = Array.from(curr.children);
        acc = acc.concat(childs)
        return acc;
      }, []);

      if (txt.classList.contains("visible")) {
        txt.classList.remove("visible")
      }
      else {
        for (let i = 0; i < allTxtArr.length; i++) {
          allTxtArr[i].classList.remove("visible");
        }
        txt.classList.add("visible")
      }
    }
    )

    html.find('.zauber-text').click(this._onRollItem.bind(this));

    html.find('.trape-control').click(async (ev) => {
      ev.preventDefault();
      let kind = ev.currentTarget.dataset.controlType;
      let type = ev.currentTarget.parentElement.dataset.hpType;
      let val = this.actor.system.attribute.koerper[type].wert;
      if (kind === "add") {
        let newVal = val + 1;
        let update = {};
        update[`system.attribute.koerper.${type}.wert`] = newVal;
        await this.actor.update(update);
      }
      else {
        let newVal = val - 1;
        let update = {};
        update[`system.attribute.koerper.${type}.wert`] = newVal;
        await this.actor.update(update);
      }
    })

    html.find('.hp-control').click(async (ev) => {
      ev.preventDefault();
      let kind = ev.currentTarget.dataset.controlType;
      let type = ev.currentTarget.closest(".bar-graph").dataset.barType;
      let val = this.actor.system.attribute.koerper[type].wert;
      if (kind === "add") {
        let newVal = val + 1;
        let update = {};
        update[`system.attribute.koerper.${type}.wert`] = newVal;
        await this.actor.update(update);
      }
      else {
        let newVal = val - 1;
        let update = {};
        update[`system.attribute.koerper.${type}.wert`] = newVal;
        await this.actor.update(update);
      }
    })

    html.find('.item-header').click((ev) => {
      let curr = ev.currentTarget;
      curr.nextElementSibling.classList.toggle("active")
    })

    // Drag events for macros.
    // if (this.actor.isOwner) {
    //   let handler = ev => this._onDragStart(ev);
    //   let allItems = html.find(".item");
    //   for (let item of allItems) {
    //     item.setAttribute("draggable", true)
    //     item.addEventListener("dragstart", handler, false)
    //   }

    //   //html.find('.item').forEach((i) => {
    //   //  if (li.classList.contains("inventory-header")) return;
    //   //  li.setAttribute("draggable", true);
    //   //  li.addEventListener("dragstart", handler, false);
    //   // });
    // }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  _onEditItemValue(event) {

    let id = $(event.currentTarget).parents(".item").attr("data-item-id");
    let item = duplicate(this.actor.getEmbeddedDocument("Item", id));
    let propKey = event.target.dataset.prop;
    let propValue = event.target.value;
    if (event.target.dataset.dtype === "Number") { propValue = parseInt(propValue) }
    if (Number.isNaN(propValue)) { return }
    let update = { _id: id, [propKey]: propValue };
    this.actor.updateEmbeddedDocuments("Item", [update]);
  }

  _onRollTalent(event) {
    if (event.currentTarget.classList.contains('active')) {
      this._onRoll(event)
    }
  }

  _onRoll(event) {

    event.preventDefault();
    let data = event.currentTarget.dataset;
    if (data?.itemType) {
      data.create = false
    }
    let msR = new MsRoll(data);
    return msR.createDialog();
  }

  _onRollMisc(event) {
    event.preventDefault();
    const element = event.currentTarget;
    let context = {
      actor: this.actor,
      talent: {
        label: element.dataset.rollLabel,
        wert: element.dataset.rollValue
      }
    }
    let msR = new MsRoll(context)
    msR.createDialog();
  }

  async _onRollItem(event) {
    event.preventDefault();
    const id = $(event.currentTarget)[0].dataset.itemId;
    const dataset = $(event.currentTarget)[0].dataset;
    const item = this.actor.items.get(id);
    await item.roll(this.actor, dataset);
  }

  async _onConfigureActor(event) {
    event.preventDefault();
    new ActorSettings(this).render(true);
  }

}
