export class MondsturzCombatTracker extends CombatTracker {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/mondsturz/templates/combat-tracker.hbs",
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find(".combatant").off("click");
        html.find(".combat-click").click(this._onCombatantMouseDown.bind(this));
        html.find(".submit-combat-input").click(ev => this._onSubmit(ev, html));
        html.find(".combatant-submit").click(ev => this.onCombatantSubmit(ev, html))
        html.find(".next-phase").click(_ev => this.viewed.nextPhase())
        html.find(".toggle-token").click(ev =>this.toggleToken(ev))
        
    }

    async toggleToken(event) {
        event.preventDefault();
        event.stopPropagation();
        const combatantId = event.currentTarget.closest(".combatant").dataset.combatantId;
        const currentCombatant = this.viewed.getEmbeddedDocument("Combatant", combatantId);
        let newValue = !currentCombatant.token.hidden;
        await currentCombatant.token.update({"hidden": newValue});
        await currentCombatant.update({"flags.mondsturz.tokenHidden": !newValue})
    }

    async getData(options = {}) {
        let context = await super.getData(options);

        // Get the combat encounters possible for the viewed Scene
        const combat = this.viewed;
        const hasCombat = combat !== null;
        const combats = this.combats;
        const currentIdx = combats.findIndex(c => c === combat);
        const previousId = currentIdx > 0 ? combats[currentIdx - 1].id : null;
        const nextId = currentIdx < combats.length - 1 ? combats[currentIdx + 1].id : null;
        const settings = game.settings.get("core", Combat.CONFIG_SETTING);

        // Prepare rendering data
        context = foundry.utils.mergeObject(context, {
            combats: combats,
            currentIndex: currentIdx + 1,
            combatCount: combats.length,
            hasCombat: hasCombat,
            combat,
            turns: [],
            previousId,
            nextId,
            started: combat?.started,
            control: false,
            settings,
            linked: combat?.scene !== null,
            labels: {}

        });
        context.labels.scope = game.i18n.localize(`COMBAT.${context.linked ? "Linked" : "Unlinked"}`);
        if (!hasCombat) return context;

        // Format information about each combatant in the encounter
        let hasDecimals = false;
        const turns = [];
        for (let [i, combatant] of combat.turns.entries()) {
            if (!combatant.visible) continue;

            // Prepare turn data
            const resource = combatant.permission >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER ? combatant.resource : null;
            const turn = {
                id: combatant.id,
                name: combatant.name,
                combatant: combatant,
                flags: combatant.flags.mondsturz,
                img: await this._getCombatantThumbnail(combatant),
                active: i === combat.turn,
                owner: combatant.isOwner,
                defeated: combatant.isDefeated,
                hidden: combatant.hidden,
                tokenHidden: combatant.token.hidden,
                initiative: combatant.initiative,
                hasRolled: combatant.initiative !== null,
                hasResource: resource !== null,
                resource: resource,
                canPing: (combatant.sceneId === canvas.scene?.id) && game.user.hasPermission("PING_CANVAS")
            };
            if ((turn.initiative !== null) && !Number.isInteger(turn.initiative)) hasDecimals = true;
            turn.css = [
                turn.active ? "active" : "",
                turn.hidden ? "hidden" : "",
                turn.defeated ? "defeated" : ""
            ].join(" ").trim();

            // Actor and Token status effects
            turn.effects = new Set();
            if (combatant.token) {
                combatant.token.effects.forEach(e => turn.effects.add(e));
                if (combatant.token.overlayEffect) turn.effects.add(combatant.token.overlayEffect);
            }
            if (combatant.actor) {
                for (const e of combatant.actor.temporaryEffects) {
                    if (e.getFlag("core", "statusId") === CONFIG.specialStatusEffects.DEFEATED) turn.defeated = true;
                    else if (e.icon) turn.effects.add(e.icon);
                }
            }
            turns.push(turn);
        }

        // Format initiative numeric precision
        const precision = CONFIG.Combat.initiative.decimals;
        turns.forEach(t => {
            if (t.initiative !== null) t.initiative = t.initiative.toFixed(hasDecimals ? precision : 0);
        });

        // Merge update data for rendering
        return foundry.utils.mergeObject(context, {
            round: combat.round,
            turn: combat.turn,
            turns: turns,
            control: combat.combatant?.players?.includes(game.user)
        });


    }

    async onCombatantSubmit(event, html) {

        const combatantId = event.currentTarget.closest(".combatant-input").dataset.combatantId;
        const currentCombatant = this.viewed.getEmbeddedDocument("Combatant", combatantId);
        const inputs = $(event.currentTarget).closest(".combatant-input")[0]
        let answers = inputs.querySelectorAll(".combat-textarea")
        const inputArray = [];

        let inputString = answers[0].value



        //cant use setFlag as options not working
        // await currentCombatant.setFlag("mondsturz", "inputs", inputObj, false)
        await currentCombatant.update({"flags.mondsturz.inputs": inputString}, {render:false})
    }

    async _onCombatantMouseDown(event) {
        event.preventDefault();

        const li = event.currentTarget.closest("li");
        const combatant = this.viewed.combatants.get(li.dataset.combatantId);
        const token = combatant.token;
        if (!combatant.actor?.testUserPermission(game.user, "OBSERVER")) return;
        const now = Date.now();

        // Handle double-left click to open sheet
        const dt = now - this._clickTime;
        this._clickTime = now;
        if (dt <= 250) return combatant.actor?.sheet.render(true);

        // Control and pan to Token object
        if (token?.object) {
            token.object?.control({ releaseOthers: true });
            return canvas.animatePan(token.object.center);
        }
    }

}