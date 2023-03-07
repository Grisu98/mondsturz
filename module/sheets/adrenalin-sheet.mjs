export class AdrenalinSheet extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['adrenalin-sheet'],
            id: 'sheet-adrenalin-sheet',
            template: 'systems/mondsturz/templates/actor/adrenalin-sheet.hbs',
            width: 500,
            height: 800,
            submitOnClose: true,
            submitOnChange: false
        });
    
    }

    
    /* -------------------------------------------- */
    /**
     * Add the Entity name into the window title
     * @type {String}
     */
    get title() {
        return `${this.object.name}: Adrenalin`;
    }
    /**
     * @override
     */
    get template() {
        return 'systems/mondsturz/templates/actor/adrenalin-sheet.hbs';
    }

    /* -------------------------------------------- */
    /**
     * Construct and return the data object used to render the HTML template for this form application.
     * @return {Object}
     */
    getData() {
        const context = super.getData();
        console.log(this);
        const actorData = this.object.toObject(false);

        context.system = actorData.system;
        context.actor = actorData.flags;
        context.adrenalin = CONFIG.ms.adrenalin;

        return context;
    }


    async _updateObject(_event, formData) {
        if (!this.object.id) return;
        return this.object.update(formData);
    }
}