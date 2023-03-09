export class MondsturzCombat extends Combat {

    async startCombat() {
        this.setFlag("mondsturz", "phase", 0);
        super.startCombat();

    }

    nextPhase() {
        if (!this.flags.mondsturz.phase) {
            this.setFlag("mondsturz", "phase", 1);
        }
        else {
            this.setFlag("mondsturz", "phase", 0);
            this.nextRound();
        }
    }

    async nextRound() {
        this.setFlag("mondsturz", "phase", 0);
        super.nextRound;

    }


}