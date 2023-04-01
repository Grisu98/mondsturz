export const MS = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
MS.merkmalTypes = {
  "volk": "Volk",
  "eigenschaft": "Eigenschaft",
  "charakterklasse": "Charakterklasse"
}

MS.eigRanks = {
  "rank1": 0,
  "rank2": 1,
  "rank3": 2,
  "rank4": 3,
  "rank5": 4
}

MS.talents = {
  "handwerk": "Handwerk",
  "wissen": "Wissen",
  "wildnisleben": "Wildnisleben",
  "besondere": "Besondere Künste",
  "soziale": "soziale Künste",
  "zwielichtiges": "zwielichtiges Vorgehen",
  "koerper": "Körper",
  "fortbewegung": "Fortbewegung",
  "nahkampf": "Nahkampf",
  "fernkampf": "Fernkampf"
};

MS.weaponSkills = {
  "Nahkampf": {
    "nahexoten": "Exoten Nahkampf",
    "faustkampf": "Faustkampf",
    "klingenwaffen": "Klingenwaffen",
    "schildkunst": "Schildkunst",
    "stangenwaffen": "Stangenwaffen",
    "wuchtwaffen": "Wuchtwaffen"
  },
  "Fernkampf": {
    "fernexoten": "Exoten Fernkampf",
    "bogenwaffen": "Bogenwaffen",
    "kurzwaffen": "Kurzwaffen",
    "langwaffen": "Langwaffen",
    "schweres": "Schweres Gerät",
    "wurfwaffen": "Wurfwaffen"
  }
};

MS.schulen = {
  "mengatis": "Mengatis",
  "teldora": "Teldora",
  "evoctes": "Evoctes",
  "eigna": "Eigna",
  "arcadus": "Arcadus",
  "aurores": "Aurores",
  "persopec": "Persopec",
  "avalon": "Avalon"
};

MS.kuenste = {
  "ausruf": "Ausruf",
  "runenschrift": "Runenschrift",
  "ritual": "Ritual",
  "fingerzeichen": "Fingerzeichen",
  "katalysator": "Katalysator"
};

MS.spells = {
  "levelOne": "1",
  "levelTwo": "2",
  "levelThree": "3",
  "levelFour": "4",
  "levelFive": "5",
}

MS.adrenalin = {
  stufe1: {
    option1: {
      label: "DMG UP",
      effekt: "Füge deinem nächsten DMG +2 hinzu",
      kosten: "1 (+1)"
    },
    option2: {
      label: "Bewegung",
      effekt: "Füge deiner Bewegung ein Feild hinzu",
      kosten: "1 (+1)"
    },
    option3: {
      label: "Regeneration",
      effekt: "Im Kampf die Regeneration nutzen",
      kosten: "1 (+1)"
    }
  },
  stufe2: {
    option1: {
      label: "Neuwurf 1",
      effekt: "Wiederhole eine nicht kritische Probe",
      kosten: "2"
    }
  },
  stufe3: {
    option1: {
      label: "3D6",
      effekt: "Füge der Probe einen D6 hinzu (Nicht Kampf)",
      kosten: "3"
    },
    option2: {
      label: "2D6+3",
      effekt: "Füge der Probe +3 hinzu (Nicht Kampf)",
      kosten: "3"
    },
    option3: {
      label: "2D8",
      effekt: "Alle Würfel deiner nächsten Probe +1",
      kosten: "3"
    }
  },
  stufe4: {
    option1: {
      label: "Neuwurf 2",
      effekt: "Der Feind wiederholt eine Probe",
      kosten: "4"
    },
    option2: {
      label: "Krit +",
      effekt: "Die nächste Probe trifft 1 früher kritisch",
      kosten: "4 (+4)"
    }
  },
  stufe5: {
    option1: {
      label: "Feel the Heat ",
      effekt: "Hyperarmor + 1, geht nur, wenn keine vorhanden.",
      kosten: "5"
    }
  },
  stufe6: {
    option1: {
      label: "Charakter",
      effekt: "Der nächste Sieg gewährt zu 50% 1 Waffen EP",
      kosten: "6 (+4)"
    },
    option2: {
      label: "Waffen",
      effekt: "Der nächste Sieg gewährt zu 50% 1 Charakter EP",
      kosten: "6 (+4)"
    }
  },
  stufe7: {
    option1: {
      label: "Neuwurf 3",
      effekt: "Wiederhole eine kritische Probe",
      kosten: "7"
    },
    option2: {
      label: "Neuwurf 4",
      effekt: "Der Feind wiederholt eine kritische Probe",
      kosten: "7"
    }
  },
  stufe8: {
    option1: {
      label: "Vorteil",
      effekt: "Nächste Probe auf Vorteil werfen",
      kosten: "8"
    },
    option2: {
      label: "Nachteil",
      effekt: "Der Feind wirft die nächste Probe auf Nachteil",
      kosten: "8"
    }
  },
  stufe9: {
    option1: {
      label: "Debuff weg",
      effekt: "Verdoppelt die Ressistenzwerte der nächsten Probe",
      kosten: "9"
    },
    option2: {
      label: "Debuff hin",
      effekt: "Verdoppelt die Chancenwerte der nächsten Probe",
      kosten: "9"
    }
  },
  stufe10: {
    option1: {
      label: "Büffel",
      effekt: "Für drei Runden sinken die HP nicht unter 1",
      kosten: "10"
    },
    option2: {
      label: "Schildkröte",
      effekt: "Für drei Runden sinkt aller Schaden um 50%",
      kosten: "10"
    },
    option3: {
      label: "Hase",
      effekt: "Für drei Runden wird die Bewegung verdoppelt",
      kosten: "10"
    },
    option4: {
      label: "Kolibri",
      effekt: "Für drei Runden weichst du jedem Nahkampf aus",
      kosten: "10"
    },
    option5: {
      label: "Koi",
      effekt: "Für drei Runden weichst du jedem Fernkampf aus",
      kosten: "10"
    },
    option6: {
      label: "Hirsch",
      effekt: "Für drei Runden weichst du jedem Zauber aus",
      kosten: "10"
    }
  },
  stufe11: {
    option11: {
      label: "Schlange",
      effekt: "Trifft der nächste Angriff = garantierter Krit",
      kosten: "10"
    },
    option2: {
      label: "Tiger",
      effekt: "Trifft der nächste Angriff = Schadenswürfel +1",
      kosten: "10"
    },
    option3: {
      label: "Ratte",
      effekt: "Schaden der nächsten drei Treffer =50% Heal",
      kosten: "10"
    },
    option4: {
      label: "Bär",
      effekt: "Nächster Angriff = 1D100",
      kosten: "10"
    }
  }
}