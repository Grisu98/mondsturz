/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class MondsturzItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["mondsturz", "sheet", "item"],
      width: 520,
      height: 630,
      closeOnSubmit: false,
      submitOnClose: true,
      submitOnChange: true,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "allgemein" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/mondsturz/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    context.system = itemData.system;
    context.flags = itemData.flags;
    context.config = CONFIG.ms;

    return context;
  }

  /* -------------------------------------------- */
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.effect-edit').click(ev => {
      const li = $(ev.currentTarget).closest(".effect");
      const effect = this.actor.items.get(li.data("effect-id"));
      effect.sheet.render(true);
    });

    if (!this.isEditable) return;

    html.find(".add-change").click(ev => this.item.createNewChange(ev));

    html.find(".add-effect-part").click(ev => this.addEffectPart(ev, this.object.effects.contents[0], this.item));

    html.find(".change-effect-part").change(ev => this.changeEffectPart(ev, this.object.effects.contents[0]))

    html.find(".delete-effect-part").click(ev => this.deleteEffectPart(ev, this.object.effects.contents[0]))

    html.find(".weapon-tags-dropdown").change((ev) => this.addTag(ev, html[0]));

    html.find(".tag-delete").click(ev => {this.removeTag(ev, html[0])});

  }

  async removeTag(event) {
    let tagIndex = parseInt(event.currentTarget.dataset.tagIndex);
    let newTagArr = this.item.system.tags.filter((_curr, index)=> index !== tagIndex);

    await this.item.update({"system.tags": newTagArr})
  }


  async addTag(ev, html) {
    const shownVal = ev.currentTarget.value;
    const tagKey = html.querySelector("#weapon-tags-list option[value='" + shownVal + "']").dataset.key;
    let allTags = this.item.system.tags;
    if (typeof allTags === "string") {
      allTags = []
    }
    allTags.push(tagKey);
    await this.item.update({"system.tags": allTags});
  }



  addEffectPart(event, effect, item) {
    event.preventDefault();

    // create effect if none exits already
    if (!effect) {
      item.createEmbeddedDocuments("ActiveEffect", [{
        label: item.name,
        icon: "",
        origin: item.uuid,
        "duration.rounds": undefined,
        changes: [{ value: 0, mode: 2, key: "" }]
      }])
    }
    else {
      let changes = foundry.utils.duplicate(effect.changes);
      changes.push({ value: 0, mode: 2, key: "" });
      effect.update({ changes: changes });
    }
  }

  changeEffectPart(event, effect) {
    event.preventDefault();
    let change = event.currentTarget.dataset.type;
    let element = $(event.currentTarget).parents('.effect-part');
    let index = element[0].dataset.partIndex;
    let effectChanges = foundry.utils.duplicate(effect.changes);
    let value = event.currentTarget.value;

    effectChanges[index][change] = value;

    effect.update({ changes: effectChanges });

  }

  deleteEffectPart(event, effect) {
    event.preventDefault();
    let element = $(event.currentTarget).parents('.effect-part');
    let index = element[0].dataset.partIndex;
    let effectChanges = foundry.utils.duplicate(effect.changes);

    effectChanges.splice(index, 1)

    effect.update({ changes: effectChanges });
  }

}
