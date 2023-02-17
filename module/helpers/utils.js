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


function parseEig() {

    const text = ``;

    const lines = text.split("\n");
    let obj = {
        levels: []
    };
    for (let i = 0; i < lines.length; i++) {
        if (i === 0) {
            obj.name = lines[i];
        }
        if (i === 1) {
            obj.desc = lines[i];
        }
        if (i.length > 2) {
            obj.levels.push(lines[i]);
        }
    }
}


async function parseTable() {

    const lines = text.split("\n");
    let rollT = await RollTable.create({name:"roll tab", formula: `1d${lines.length}`});
    
        lines.forEach(async (element,index) => {
            await rollT.createEmbeddedDocuments("TableResult",[{text: element, range: [index++, index++]}])
        })

}