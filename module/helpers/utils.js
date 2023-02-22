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


async function redditTest() {

    let text = await new Promise((resolve) => {
        new Dialog({
            title: "Create Post-It Note",
            content: `
            <form>
              <div class="form-group">
                <label>Text:</label>
                <input type="text" name="text" placeholder="Enter your text here"/>
              </div>
            </form>
          `,
            buttons: {
                ok: {
                    label: "Create",
                    callback: (html) => {
                        resolve(html.find('[name="text"]').val());
                    },
                },
                cancel: {
                    label: "Cancel",
                },
            },
            default: "ok",
        }).render(true);
    });
    console.log(text)

    if (text) {
        let data = {
            author: game.user._id,
            x: 0,
            y: 0,
            width: 183,
            height: 200,
            img: "tiles/note_yellow.webp",
            text: text,
            textAnchor: { x: 0.5, y: 0.5 },
            fontFamily: "Courier New",
            fontSize: 20,
            locked: false,
            visible: true,
            zIndex: 100,
            flags: { "core.controlledToken": true },
        };

        game.scenes.active.createEmbeddedDocuments("DrawingDocument", data)

    }




}