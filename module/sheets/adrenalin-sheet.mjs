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
            submitOnChange: true,
            sheetConfig: true,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "settings" }],
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

    activateListeners(html) {
        html.find(".talent-create").click(async (ev) => {
            await this.object.createDivTalent(ev)
            await this.render(true)
        })

        html.find(".talent-controls").click( async (ev) => {
            let tKey = ev.currentTarget.dataset.divKey;
            let update = {};
            let updatePath = `system.talente.-=${tKey}`;
            update[updatePath] = "";
            await this.object.update(update)
            await this.render(true)
        })

       let tester = html.find(".talent-input");
       tester.change( ev => {
        console.log("WE CHANGED SOMETHGING", ev);
        this.submit({preventClose: true})
       })
    }

    async _updateObject(_event, formData) {
        if (!this.object.id) return;
        return this.object.update(formData);
    }
}