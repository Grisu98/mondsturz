export class MondsturzCombat extends Combat {

  get combatant() {
    return null;
  }

  async startCombat() {
    await super.startCombat();
    this.setFlag("mondsturz", "allSubmited", false);
  }

    async nextRound() {
        await super.nextRound();
        this.setFlag("mondsturz", "allSubmited", false);  
    }

    async submitAll() {
      this.setFlag("mondsturz", "allSubmited", true); 
    }
}

