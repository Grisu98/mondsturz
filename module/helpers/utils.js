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
    // let filteredKeys = allKeys.filter(str => {
    //     !str.includes("wert") &&  !str.includes("label")
    // });
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
        returnData.mode = mode;
        returnData.talent = (html.find('[id=talent]')[0].value);
        returnData.mod = (html.find('[id=mod]')[0].value);
        returnData.options = {};
        if (this.data.item) {
            data.options.used = html.find('[id=use]')[0]?.checked;
            let specialOptions = html.find('[id=other-options')[0].querySelectorAll('input');
            specialOptions.forEach(element => {
                data.options[element.id] = element.value;
            })
        }
        return returnData;

    }

}

export class msUtils {
    constructor(params) {

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