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
        html.find(".submit-combat-input").click(ev => this._onSubmit(ev, html))
    }

    async _onSubmit(event, html) {
        
        event.preventDefault();
        const combat = this.viewed;
        let form = event.currentTarget.parentElement;
        let actorId = form.closest("li").dataset.combatantId;
        let move = {};
        let inputs = form.querySelectorAll('input');
        inputs.forEach(element => {
            move[element.id] = element.value;
        });
        combat.updateEmbeddedDocuments("Combatant", [{_id: actorId, flags: {mondsturz: move}}])
    }

    async _onCombatantMouseDown(event) {
        event.preventDefault();
    
        const li = event.currentTarget.closest("li");
        const combatant = this.viewed.combatants.get(li.dataset.combatantId);
        const token = combatant.token;
        if ( !combatant.actor?.testUserPermission(game.user, "OBSERVER") ) return;
        const now = Date.now();
    
        // Handle double-left click to open sheet
        const dt = now - this._clickTime;
        this._clickTime = now;
        if ( dt <= 250 ) return combatant.actor?.sheet.render(true);
    
        // Control and pan to Token object
        if ( token?.object ) {
          token.object?.control({releaseOthers: true});
          return canvas.animatePan(token.object.center);
        }
      }

}