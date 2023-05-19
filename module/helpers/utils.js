export const preloadTemplates = async function () {
    return loadTemplates([

        // Actor partials.
        "systems/mondsturz/templates/actor/actor-character-sheet.hbs",
        "systems/mondsturz/templates/dialog/skill-dialog.hbs",
        "systems/mondsturz/templates/item/item-waffe-sheet.hbs",
        "systems/mondsturz/templates/item/item-zauber-sheet.hbs",
    ]);
};

export function createEffectKeys() {

    const allKeys = Object.keys(foundry.utils.flattenObject(game.system.model.Actor.character));
    return allKeys
}

export function createTagKeys() {

    const allKeys = Object.keys(foundry.utils.flattenObject(game.system.model.Actor.character));
    return allKeys
}

export class msRollDialog {
    constructor(options = {}) {
        this.data = {
            tValue: 0,
            tName: "Talent",
            mod: 0,
            create: true,
            item: null
        };
        Object.assign(this.data, options)
    }

    async createDialog() {

        const content = await renderTemplate("systems/mondsturz/templates/dialog/skill-dialog.hbs", this.data)

        return new Promise(resolve => {
            new Dialog({
                title: `${this.data.tName}` + ' Wurf',
                content: content,
                default: "normal",
                buttons: {
                    disadvantage: {
                        icon: '<i class="fas fa-arrow-down"></i>',
                        label: "Nachteil",
                        callback: html => resolve(this._returnData(html, "kl"))
                    },
                    normal: {
                        icon: '<i class="fas fa-dice"></i>',
                        label: "Normal",
                        callback: html => resolve(this._returnData(html, ""))
                    },
                    advantage: {
                        icon: '<i class="fas fa-arrow-up"></i>',
                        label: "Vorteil",
                        callback: html => resolve(this._returnData(html, "kh"))
                    },
                },
                close: () => resolve(null)
            }).render(true);
        });
    }

    async _returnData(html, mode) {
        let returnData = {};
        let otherOptions = html.find('[id=use]')[0]?.checked
        returnData.mode = mode;
        returnData.talent = (html.find('[id=talent]')[0].value);
        returnData.mod = (html.find('[id=mod]')[0].value);
        returnData.options = {};

        if (otherOptions) {

            let specialOptions = html.find('[id=other-options')[0].querySelectorAll('input');
            specialOptions.forEach(element => {
                returnData.options[element.id] = element.value;
            })

        }

        return returnData;

    }

}

export function registerSystemSettings() {
    // Internal System Migration Version
    game.settings.register("mondsturz", "systemMigrationVersion", {
        name: "System Migration Version",
        scope: "world",
        config: false,
        type: String,
        default: ""
    });
}

export class msRollDialogHelperOldold {
    constructor(diceTerm, modifiers = {}, options = {}) {
        this.diceTerm = diceTerm;
        this.modifiers = {};
        this.options = {};
        Object.assign(this.modifiers, modifiers)
        Object.assign(this.options, options)
        this.htmlData = this._createHtmlData();
        this.finalData = {};
        this.htmlTemplate
    }

    createDialog() {

        return new Promise(resolve => {
            new Dialog({
                title: `${this.data.tName}` + ' Wurf',
                content: this.htmlTemplate,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-dice"></i>',
                        label: "Normal",
                        callback: html => resolve(this._resolveRoll(html))
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

    }

    _createHtmlData() {

    }

    _resolveRoll(html) {

    }
}

export class msRollDialogHelper {

    constructor(type, context = {}, item) {
        this.context = context;
        this.type = type;
        this.item = item;
        this.htmlData = this.prepareHtmlData();
        this.prepareTypes();
    }

    prepareTypes() {
        switch (this.type) {
            case "prop":
                Object.assign(this.context, {
                    rollTerm: "2d6",
                    options: {
                        adv: true,
                    }
                })
                break;

            case "waffe":
                Object.assign(this.context, {
                    rollTerm: this.item.system.stats.damage,
                    options: {
                        useAmmo: true
                    }
                })
                break;
            case "zauber":

                break;

            default:
                break;
        }
    }

    createDialog() {

        return new Promise(resolve => {
            new MsDialog({
                context: this.context,
                close: () => resolve(null),
                callback: (input) => resolve(input)
            }).render(true);
        });

    }


    prepareHtmlData() {

    }



}

export class MsDialog extends Application {

    constructor(data, options) {
        super(options);
        this.data = data;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/mondsturz/templates/dialog/roll.hbs",
            focus: true,
            classes: ["ms-dialog"],
            width: 400,
            height: 400,
            jQuery: true
        });
    }

    get title() {
        return this.data.context.title || "Ms Dialog";
    }

    getData(options = {}) {
        return this.data.context;
    };

    activateListeners(html) {

        html.find(".add-modifier-button").click(this.addModifier.bind(this));

        html.find(".delete-modifier-button").click(this.deleteModifier.bind(this));

        html.find(".submit-roll-button").click(this._submit.bind(this));

        html.find(".delte-modifier").click(this.deleteModifier.bind(this));

        html.find("form").each((i, el) => el.onsubmit = evt => evt.preventDefault());
    }

    upadteUserInput(event) {
        event.preventDefault();
        let submittedData = { modifiers: [], options: [] }
        let form = event.currentTarget.closest(".ms-dialog");
        console.log("tester")
        let modArr = form.querySelectorAll(".modifier-input");
        modArr.forEach((curr, index, array) => {
            curr.children
            submittedData.modifiers.push({ label: curr.children[0].value, value: curr.children[1].value })
        })
        let optionsArray = form.querySelectorAll(".option-input")
        this.data.context.modifiers = submittedData.modifiers;
        this.data.context.options = submittedData.options;
        this.render(true)
    }

    _submit(event) {
        event.preventDefault()
        this.upadteUserInput(event)
        this.data.callback(this.data.context)
        this.close({ force: true })
    }

    addModifier(event) {
        event.preventDefault()
        this.upadteUserInput(event)
        this.data.context.modifiers.push({ label: "", value: 0 })
    }

    deleteModifier(event) {
        event.preventDefault()
        let arrIndex = event.currentTarget.closest(".modifier-input").dataset.arrayIndex
        this.data.context.modifiers.splice(arrIndex, 1)
        this.render(true)
    }


}


export class msUtils {
    constructor(params) {

    }

    async takeDamage(actor) {

        let actorCopy = foundry.utils.deepClone(actor)

        const htmlData = {};
        Object.keys(actorCopy.system.attribute.ruestwert).forEach(key => {
            htmlData[key] = actorCopy.system.attribute.ruestwert[key].label;
        });
        let damageData = {
            hyper: actorCopy.system.attribute.koerper.hyperarmor.wert,
            zustand: actorCopy.system.attribute.koerper.ruestwert.wert,
            leben: actorCopy.system.attribute.koerper.leben.wert,
            physis: actorCopy.system.attribute.koerper.physis.wert
        }

        const content = await renderTemplate("systems/mondsturz/templates/dialog/take-damage-dialog.hbs", htmlData)

        let userInput = await new Promise(resolve => {
            new Dialog({
                title: "Schaden angeben",
                content: content,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-dice"></i>',
                        label: "Normal",
                        callback: html => {
                            resolve([
                                html.find('[id=input-damage]')[0].valueAsNumber,
                                html.find('[name=rustwert]:checked')[0]?.value,
                                html.find('[id=apply-automatic')[0].checked
                            ])
                        }
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

        let [dmg, rust, apply] = userInput;
        damageData.rust = actorCopy.system.attribute.ruestwert[rust].wert + actorCopy.system.attribute.ruestwert[rust].mod;
        let derivedDmg = {
        };
        // jetzt wird gerechnet
        if (!rust) {
            return ui.notifications.warn("Keine Schadensart angegeben.");
        }

        if (isNaN(dmg)) {
            return ui.notifications.warn("Angegebener Schaden ist keine Zahl.");
        }
        // Rüstwerte abziehen nur falls Rüstzustand noch exisitert
        if (damageData.zustand) {
            dmg -= damageData.rust;
            if (dmg <= 0) {
                return [derivedDmg, apply]
            }
        }

        // Hyperarmor verliert eins und nimmt den ganzen schaden weg
        if (damageData.hyper) {
            derivedDmg.hyper = damageData.hyper - 1;
            return [derivedDmg, apply]
        }

        // Rüstzustand 

        if (damageData.zustand) {
            derivedDmg.zustand = damageData.zustand - dmg;
            dmg -= damageData.zustand;
        }

        // Leben
        if (damageData.leben && dmg > 0) {
            derivedDmg.leben = damageData.leben - dmg;
            dmg -= damageData.leben;
            if (derivedDmg.leben < 0) {
                return [derivedDmg, apply]
            }
        }

        // Physis
        if (damageData.physis && dmg > 0) {
            let physisDmg = Math.ceil(dmg / 10);
            derivedDmg.physis = damageData.physis - physisDmg;
        }


        return [derivedDmg, apply]


    }

    async importTable() {


        new Promise(resolve => {
            new Dialog({
                title: "Input zu RollTable",
                content: `<label for="name">Name:</label><input id="name"/><textarea id="idat"></textarea>`,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-pen"></i>',
                        label: "erstellen",
                        callback: html => resolve(createTable(html))
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

        async function createTable(html) {
            const text = html.find('[id=idat]')[0].value;
            const lines = text.split("\n");
            let rollT = await RollTable.create({ name: "roll tab", formula: `1d${lines.length}` });

            lines.forEach(async (element, index) => {
                await rollT.createEmbeddedDocuments("TableResult", [{ text: element, range: [index + 1, index + 1] }])
            })
        }
    }

    async tester() {
        let ac = game.user.character || game.user.selected[0];

        const content = `
        Talentname:<input id="talentname" type="text" />
        Wert: <input  id="talentwert " type="number" value="0" />
    
        ${ac.name}
        `

        new Promise(resolve => {
            new Dialog({
                title: "Diverses Talent hinzufügen",
                content: content,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-pen"></i>',
                        label: "erstellen",
                        callback: html => resolve(addTalent(html))
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

        async function addTalent(html) {
            let talentName = html.find('[id="talentname"]')[0].value;
            let talentWert = html.find('[id="talentwert "]')[0].value;
            console.log(talentName, talentWert)
        }
    }

    async klassenImporter() {


        new Promise(resolve => {
            new Dialog({
                title: "Input zu Eigenschaft",
                content: `<textarea id="idat"></textarea>`,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-pen"></i>',
                        label: "erstellen",
                        callback: html => resolve(createEig(html))
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

        async function createEig(html) {


            let klassenFolder = await Folder.create({ name: "tab zu klassen", type: "Item" });
            const entriesString = html.find('[id=idat]')[0].value;
            const entriesArray = [];

            let rawLines = entriesString.trim().split("\n");
            rawLines.forEach((ele, _index) => {
                ele.trim();
            })
            let rawArray = rawLines.reduce((acc, curr, index) => {
                if (curr && curr.length > 2) {
                    acc.push(curr);
                }
                return acc
            }, [])

            for (let i = 0; i < rawArray.length; i += 7) {
                let subArr = rawArray.slice(i, i + 7);
                entriesArray.push(subArr)
            }

            entriesArray.forEach(async (ele, index) => {
                let itemData = {
                    "type": "merkmal",
                    "system.type": "charakterklasse",
                    "name": ele[0],
                    "system.description": ele[1],
                    "system.ranks.0": ele[2],
                    "system.ranks.1": ele[3],
                    "system.ranks.2": ele[4],
                    "system.ranks.3": ele[5],
                    "system.ranks.4": ele[6],
                    "folder": klassenFolder.id
                };
                await Item.create(itemData)
            })
        }


    }

    async eigschaftenImporter() {

        new Promise(resolve => {
            new Dialog({
                title: "Input zu negative Eigenschaft",
                content: `<label for="extradesc">Wird hinzugefügt bei jeder Beschreibung:</label><input id="extradescr"/><textarea id="idat"></textarea>`,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-pen"></i>',
                        label: "erstellen",
                        callback: html => resolve(createEig(html))
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

        async function createEig(html) {


            let eigFolder = await Folder.create({ name: "Tab zu Eig", type: "Item" })
            const entriesString = html.find('[id=idat]')[0].value;
            const extraDescr = html.find('[id=extradescr]')[0].value;

            const entriesArray = [];

            let rawLines = entriesString.trim().split("\n");
            rawLines.forEach((ele, _index) => {
                ele.trim();
            })
            let rawArray = rawLines.reduce((acc, curr, index) => {
                if (curr && curr.length > 2) {
                    acc.push(curr);
                }
                return acc
            }, [])

            for (let i = 0; i < rawArray.length; i += 2) {
                let subArr = rawArray.slice(i, i + 2);
                entriesArray.push(subArr)
            }

            entriesArray.forEach(async (ele, index) => {
                let itemData = {
                    "type": "merkmal",
                    "system.type": "eigenschaft",
                    "name": ele[0],
                    "system.description": ele[1] + "\n\n" + extraDescr,
                    "folder": eigFolder.id
                };
                let newItem = await Item.create(itemData);
            })
        }

    }

    async regelwerkImporter() {

        new Promise(resolve => {
            new Dialog({
                title: "Input zu negative Eigenschaft",
                content: `<textarea id="idat"></textarea>`,
                default: "normal",
                buttons: {
                    normal: {
                        icon: '<i class="fas fa-pen"></i>',
                        label: "erstellen",
                        callback: html => resolve(createHtml(html))
                    }
                },
                close: () => resolve(null)
            }).render(true);
        });

        async function createHtml(html) {

            const firstString = html.find('[id=idat]')[0].value;

            let entriesString = firstString.replace(/:\s?\t/g, "</h2>\n");

            let rawLines = entriesString.trim().split("\n");
            rawLines.forEach((ele, _index) => {
                ele.trim();
            })
            let rawArray = rawLines.reduce((acc, curr, index) => {
                if (curr && curr.length > 2) {
                    acc.push(curr);
                }
                return acc
            }, [])

            console.log(entriesString);
            console.log(rawLines);
            console.log(rawArray);

            let indexes = {
                starts: [],
                ends: []
            };

            rawArray.forEach((ele, index) => {
                if (ele.indexOf("°") !== -1) {
                    indexes.starts.push(index);
                }
                if (ele.indexOf("^") !== -1) {
                    indexes.ends.push(index)
                }
            })

            console.log(indexes)

            indexes.starts.forEach((ele, index) => {

            })
        }
    }

    async rollTester() {

        let r = new Roll("1d8+4+5");

        r.alter(1, -1)
        r.evaluate()
        r.toMessage()
        console.log(r)
    }

}

globalThis.MondsturzUtils = new msUtils;