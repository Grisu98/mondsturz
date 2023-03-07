export class MsRoll {
    constructor(options = {}) {
        this.data = {
            tValue: 0,
            sValue: 0,
            tName: "Talent",
            sName: "Skill",
            mod: 0,
            create: true,
            item: false
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
                        callback: html => resolve(this.createRoll(html, "kl"))
                    },
                    normal: {
                        icon: '<i class="fas fa-dice"></i>',
                        label: "Normal",
                        callback: html => resolve(this.createRoll(html, "normal"))
                    },
                    advantage: {
                        icon: '<i class="fas fa-arrow-up"></i>',
                        label: "Vorteil",
                        callback: html => resolve(this.createRoll(html, "kh"))
                    },
                },
                close: () => resolve(null)
            }).render(true);
        });
    }

    async createRoll(html, mode) {

        let talent = (html.find('[id=talent]')[0].value);
        let skill = (html.find('[id=skill]')[0].value);
        let mod = (html.find('[id=mod]')[0].value);
        let options = {};
        if (this.data.item) {
            options.used = html.find('[id=use]')[0]?.checked;
            let specialOptions = html.find('[id=other-options')[0].querySelectorAll('input');
            specialOptions.forEach(element => {
                options[element.id] = element.value;
            })
        }
        let r;
        if (mode === "normal") {
            r = await new Roll(`2d6 + ${talent} + ${skill} + ${mod}`).evaluate({ async: false });
            r = await r.toMessage({ flavor: this.data.tName }, { create: this.data.create });
            if (!this.data.create) { return [r, options] }
        }
        else {
            r = await new Roll(`3d6${mode}2 + ${talent} + ${skill} + ${mod}`).evaluate({ async: false });
            // r = await r.toMessage({ flavor: `<h2> ${item.name} Wurf</h2> [[/roll ${item.system.stats.damage}]]` });
            r = await r.toMessage({ flavor: `${this.data.tName} Wurf` }, { create: this.data.create });
            if (!this.data.create) { return [r, options] }
        }
    }

}
// adding MsRoll to global scope so it can be used in macros
globalThis.MsRoll = MsRoll;

export function MsCombatHelper(combatant, round, diff, id) {

    // only gm can update combat
    if (game.user.isGM) {
        const combat = combatant.combat;
        const collection = combatant.collection.contents;
        let counter = 0;
        collection.forEach((element) => {
            if (element.flags.mondsturz) {
                counter++
            }
        });

        // all actors in the combat have send something
        if (counter === collection.length) {
            combat.setFlag("mondsturz", "allSubmited", true);
        }
    }
}

export const preloadHtmls = async function () {
    return loadTemplates([
        "systems/mondsturz/templates/actor/parts/actor-character.sheet.hbs",
    ]);
};

export function createEffectKeys() {

    const allKeys = Object.keys(foundry.utils.flattenObject(game.system.model.Actor.character));
    let filteredKeys = allKeys.filter(str => str.includes("mod")
    );
    // let filteredKeys = allKeys.filter(str => {
    //     !str.includes("wert") &&  !str.includes("label")
    // });
    return filteredKeys
}


async function parseEig() {


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
        const t = html.find('[id=idat]')[0].value;

        const lines = t.split("\n");
        let obj = {
            ranks: {}
        };
        for (let i = 0; i < lines.length; i++) {
            if (i === 0) {
                obj.name = lines[i];
            }
            if (i === 1) {
                obj.desc = lines[i];
            }
            if (lines[i].length > 2 && i > 2) {
                let key = `rank${Object.keys(obj.ranks).length + 1}`;

                let a = obj.ranks[key] = {};
                a.text = lines[i];
            }
        }
        console.log(obj)
        let i = await Item.create({ name: obj.name, type: "eigenschaft", system: { ranks: obj.ranks, description: obj.desc } })
    }
}

export class msRollDialog {
    constructor(options = {}) {
        this.data = {
            tValue: 0,
            sValue: 0,
            tName: "Talent",
            sName: "Skill",
            mod: 0,
            create: true,
            item: false
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
        let data = {};
        data.mode = mode;
        data.talent = (html.find('[id=talent]')[0].value);
        data.skill = (html.find('[id=skill]')[0].value);
        data.mod = (html.find('[id=mod]')[0].value);
        data.options = {};
        if (this.data.item) {
            data.options.used = html.find('[id=use]')[0]?.checked;
            let specialOptions = html.find('[id=other-options')[0].querySelectorAll('input');
            specialOptions.forEach(element => {
                data.options[element.id] = element.value;
            })
        }
        return data;
    }

}

async function parseTable() {


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

async function _tester() {
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

async function _charKlassimporter() {


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
                "type": "eigenschaft",
                "system.type": "charakterklasse",
                "name": ele[0],
                "system.description": ele[1],
                "system.ranks.0": ele[2],
                "system.ranks.1": ele[3],
                "system.ranks.2": ele[4],
                "system.ranks.3": ele[5],
                "system.ranks.4": ele[6]
            };
            await Item.create(itemData)
        })
    }


}

async function _eigschaftImporter() {

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
                "system.description": ele[1] + "\n\n" + extraDescr
            };
            await Item.create(itemData)
        })
    }

}