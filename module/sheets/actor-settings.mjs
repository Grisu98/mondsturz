export class ActorSettings extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['actor-tweaks'],
            id: 'sheet-actor-tweaks',
            template: 'systems/mondsturz/templates/actor/parts/tweak-dialog.hbs',
            width: 380,
            height: 400
        });
    }
    /* -------------------------------------------- */
    /**
     * Add the Entity name into the window title
     * @type {String}
     */
    get title() {
        return `${this.object.actor.name}: Charakter Settings`;
    }
    /**
     * @override
     */
    get template() {
        return 'systems/mondsturz/templates/actor/parts/tweak-dialog.hbs';
    }

    /* -------------------------------------------- */
    /**
     * Construct and return the data object used to render the HTML template for this form application.
     * @return {Object}
     */
    getData() {
        // return this.object
        const context = super.getData();
        console.log(this);
        const actorData = this.object.actor.toObject(false);

        context.system = actorData.system;
        context.actor = actorData.flags;

        return context;
    }


    async _updateObject(_event, formData) {
        if (!this.object.id) return;
        return this.object.actor.update(formData);
    }
}