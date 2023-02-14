export class MondsturzActiveEffectConfig extends ActiveEffectConfig {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["sheet", "active-effect-sheet"],
            template: "systems/mondsturz/templates/effect-config.hbs",
            width: 560,
            height: "auto",
            tabs: [{ navSelector: ".tabs", contentSelector: "form", initial: "effects" }]
        });
    }

    /** @override */
    getData(options = {}) {
        const effect = this.object.toObject();
        return {
            effect: effect, // Backwards compatibility
            data: this.object.toObject(),
            isActorEffect: this.object.parent.documentName === "Actor",
            isItemEffect: this.object.parent.documentName === "Item",
            submitText: "EFFECT.Submit",
            modes: Object.entries(CONST.ACTIVE_EFFECT_MODES).reduce((obj, e) => {
                obj[e[1]] = game.i18n.localize("EFFECT.MODE_" + e[0]);
                return obj;

            }, {}),
            propertyKeys: CONFIG.ms.propertyKeys,
        };
    }

    /** @inheritdoc */
    activateListeners(html) {
        super.activateListeners(html);

        html.find("img[data-edit]").click(ev => this._onEditImage(ev));

        html.find(".effect-edit-insheet").submit(ev => onEditActiveEffectInsheet(ev, this.document));
    }

    _onEditImage(event) {
        const attr = event.currentTarget.dataset.edit;
        const current = foundry.utils.getProperty(this.document, attr);
        const fp = new FilePicker({
            type: "image",
            current: current,
            callback: path => {
                event.currentTarget.src = path;
                this._onSubmit(event);
            },
            top: this.position.top + 40,
            left: this.position.left + 10
        });
        return fp.browse();
    }

    onEditActiveEffectInsheet(event, effect) {

        let index;
        let changes = foundry.utils.clone(effect.changes);
        changes[index] = {
            key,
            mode,
            priority: undefined,
            value
        }
        this.update({ changes: update });
    }
}