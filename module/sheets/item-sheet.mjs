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

  /* -------------------------------------------- */

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

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.effect-edit').click(ev => {
      const li = $(ev.currentTarget).closest(".effect");
      const effect = this.actor.items.get(li.data("effect-id"));
      effect.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;


    html.find(".add-effect-part").click(ev => this.addEffectPart(ev, this.object.effects.contents[0], this.item));

    html.find(".change-effect-part").change(ev => this.changeEffectPart(ev, this.object.effects.contents[0]))

    html.find(".delete-effect-part").click(ev => this.deleteEffectPart(ev, this.object.effects.contents[0]))
  }

  async _updateObject(_event, formData) {
    if (!this.object.id) return;
    await this.object.update(formData);
    this.render();
    return;
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
        changes: [{ value: 0, mode: 2 , key: "" }]
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
