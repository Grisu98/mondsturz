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
    },
    option5: {
      label: "Wolf",
      effekt: "Die nächsten drei Angriffe treffen garantiert",
      kosten: "10"
    },
    option6: {
      label: "Affe",
      effekt: "Drei Runden lang, führst du eine Doppelaktion aus",
      kosten: "10"
    }
  }
}

MS.attribute = [
  {
    label: "Spitz",
    description: "Die Waffe verursacht ihren Schaden durch Penetration"
  },
  {
    label: "Scharf",
    description: "Die Waffe verursacht ihren Schaden durch Schnitte"
  },
  {
    label: "Stumpf",
    description: "Die Waffe verursacht ihren Schaden durch Schläge"
  },
  {
    label: "Energie",
    description: "Die Waffe verursacht ihren Schaden durch Energie"
  },
  {
    label: "Explosion I",
    description: "Jeder Würfel kann einmal explodieren"
  },
  {
    label: "Explosion II",
    description: "Jeder Würfel der explodiert, fügt 50% seines Maximalwerts zusätzlich zu"
  },
  {
    label: "Explosion III",
    description: "Jeder Würfel kann einmal explodieren"
  },
  {
    label: "Explosion IV",
    description: "Jeder Würfel der explodiert, fügt 50% seines Maximalwerts zusätzlich zu"
  },
  {
    label: "Krit +1 (2-6)",
    description: "Krit. einen Pasch früher möglich"
  },
  {
    label: "Superkrit",
    description: "Startet ohne Krit, dafür Krit x3 statt x2 DMG"
  },
  {
    label: "Zuverlässig",
    description: "Kritische Fehlschläge sind unmöglich und werden als Wert = 2 behandelt."
  },
  {
    label: "Betäubt",
    description: "Halber Schaden als Betäubungswert angerechnet"
  },
  {
    label: "Multitreffer",
    description: "Trifft bis zu zwei Ziele neben dem ersten."
  },
  {
    label: "Rüst Igno 1",
    description: "Der/die höchste/n Würfel, trifft/treffen direkt, ohne vom Rüstwert gesenkt zu werden."
  },
  {
    label: "Rüst Igno II",
    description: ""
  },
  {
    label: "Rüst Igno III",
    description: ""
  },
  {
    label: "Rüst Igno IV",
    description: ""
  },
  {
    label: "Rüst Igno V",
    description: ""
  },
  {
    label: "Versteckt",
    description: "Waffe wird beim Durchsuchen nicht gefunden. Nichtmal durch einen Krit."
  },
  {
    label: "Multiwurf I",
    description: "Trifft bis zu zwei Ziele neben dem ersten."
  },
  {
    label: "Multiwurf II",
    description: "Trifft bis zu vier Ziele neben dem ersten."
  },
  {
    label: "Multiwurf III",
    description: "Alle Granaten (Kette) können gemeinsam geworfen werden."
  },
  {
    label: "Rüst Nicht I",
    description: "Waffe ignoriert Rüstwert, dafür halber DMG"
  },
  {
    label: "Rüst Nicht II", description: "Waffe behandelt Feind wie ohne Rüstung"
  },
  {
    label: 'Lang', description: 'Die Waffe überragt ein Feld.'
  },
  {
    label: '2Hand L', description: 'Waffe erlangt zweihändig den Tag Lang'
  },
  {
    label: '2Hand S', description: 'Waffe erlangt einhändig den Tag Schwer'
  },
  {
    label: 'Schwer', description: 'Einhändig Schaden = nur Würfel kein Bonus'
  },
  {
    label: 'Folge', description: 'Waffe erlangt zweifach ausgerüstet den Tag Kombo+'
  },
  {
    label: 'Off-Hand', description: 'Waffe für Akimbo/DualWield frei.'
  },
  {
    label: 'RW=X', description: 'Angriffe über/unter dem RW Wert -50%'
  },
  {
    label: 'Kombo+', description: 'Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert.'
  },
  {
    label: 'Kombo++', description: 'Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert.'
  },
  {
    label: 'Kombo+++', description: 'Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert.'
  },
  {
    label: 'Kombo++++', description: 'Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert.'
  },
  {
    label: 'Ungeschützt', description: 'Jeder Schadenswürfel, der eine 1 zeigt, verursacht 4 Schaden am Träger'
  },
  {
    label: 'Entwaffnen', description: 'Explodiert mindestens ein Würfel, kann statt Schaden, eine Entwaffnung durchgeführt werden.'
  },
  {
    label: 'Fessel', description: 'Explodiert mindestens ein Würfel, kann statt Schaden, eine Fesselung durchgeführt werden. Fesselung erfordert eine Probe auf Fesseln gegen eine Probe auf Akrobatik.'
  },
  {
    label: 'Rüstbruch I', description: 'Pro explodierende Würfel, sinkt der höchste Rüstwert um einen Punkt.'
  },
  {
    label: 'Rüstbruch II', description: 'Pro explodierende Würfel, sinkt der höchste Rüstwert um zwei Punkte.'
  },
  {
    label: 'Rüstbruch III', description: 'Pro explodierende Würfel, sinkt der höchste Rüstwert um drei Punkte.'
  },
  {
    label: 'Fragil I', description: '25 Chance, dass Waffenqualität nach einem Konter des Feindes sinkt.'
  },
  {
    label: 'Fragil II', description: '50% Chance, dass Waffenqualität nach einem Konter des Feindes sinkt.'
  },
  {
    label: 'Fragil III', description: 'Zeigt ein Schadenswürfel eine 1, sinkt die Waffenqualität'
  },
  {
    label: 'Panzerbrechend', description: 'Trägt der Feind eine Rüstung mit 30+ Punkten Rüstwert, verursacht die Waffe doppelten Schaden.'
  },
  {
    label: 'Gezahnt', description: 'Nach einem erfolgreichen Angriff, kann die Waffe aus dem Feind gezogen werden um nochmals den gleichen Schaden zu verursachen.'
  },
  {
    label: "Konterwaffe I",
    description: "Wird mit dieser Waffe gekontert, wird zum Kontern ein weiterer D6/2D6/3D6 hinzugefügt"
  },
  {
    label: "Konterwaffe II",
    description: ""
  },
  {
    label: "Konterwaffe III",
    description: ""
  },
  {
    label: "Schild",
    description: "Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x1"
  },
  {
    label: "Großschild",
    description: "Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x2"
  },
  {
    label: "Turmschild",
    description: "Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x3"
  },
  {
    label: "Weiches Schild",
    description: "Die Waffe kann genutzt werden um Angriffe, statt zu kontern, abzufangen. Dabei sinkt das Leben des Schildes um einen Punkt. Bei 0 sinkt die Qualität des Schildes um 1. Weich = 3, Hart = 5 Leben."
  },
  {
    label: "Hartes Schild",
    description: ""
  },
  {
    label: "Schweres Schild",
    description: "Senkt den Reflexwert um einen Punkt und das Kontern um sechs Punkte."
  },
  {
    label: "Konterschild",
    description: "Kontern wird um drei Punkte erleichtert."
  },
  {
    label: "Antischild",
    description: "Verteidiger kann seine Schildboni nicht nutzen."
  },
  {
    label: "Silber",
    description: "Wesen die Anfällig auf Silber sind, erleiden  dreifachen Schaden."
  }
]

MS.waffenTags = {
  spitz: {
    name: "Spitz",
    description: "Macht spitzen Schaden"
  },
  scharf: {
    name: "Scharf",
    description: "Macht scharfen Schaden"
  },
  stumpf: {
    name: "Stumpf",
    description: "Macht stumpfen Schaden"
  },
  energie: {
    name: "Energie",
    description: "Macht energie Schaden"
  },
  explosionI: {
    name: "Explosion I",
    description: "Jeder Würfel kann einmal explodieren"
  },
  explosionII: {
    name: "Explosion II",
    description: "Jeder Würfel der explodiert, fügt 50% seines Maximalwerts zusätzlich zu"
  },
  explosionIII: {
    name: "Explosion III",
    description: "Jeder Würfel kann einmal explodieren"
  },
  explosionIV: {
    name: "Explosion IV",
    description: "Jeder Würfel der explodiert, fügt 50% seines Maximalwerts zusätzlich zu"
  },
  krit2_6: {
    name: "Krit +1 (2-6)",
    description: "Krit. einen Pasch früher möglich"
  },
  superkrit: {
    name: "Superkrit",
    description: "Startet ohne Krit, dafür Krit x3 statt x2 DMG"
  },
  zuverlaessig: {
    name: "Zuverlässig",
    description: "Kritische Fehlschläge sind unmöglich und werden als Wert = 2 behandelt."
  },
  betaubt: {
    name: "Betäubt",
    description: "Halber Schaden als Betäubungswert angerechnet"
  },
  multitreffer: {
    name: "Multitreffer",
    description: "Trifft bis zu zwei Ziele neben dem ersten."
  },
  ruestIgn1: {
    name: "Rüst Igno 1",
    description: "Der/die höchste/n Würfel, trifft/treffen direkt, ohne vom Rüstwert gesenkt zu werden."
  },
  ruestIgn2: {
    name: "Rüst Igno 2",
    description: "Der/die höchste/n Würfel, trifft/treffen direkt, ohne vom Rüstwert gesenkt zu werden."
  },
  ruestIgn3: {
    name: "Rüst Igno 3",
    description: "Der/die höchste/n Würfel, trifft/treffen direkt, ohne vom Rüstwert gesenkt zu werden."
  },
  ruestIgn4: {
    name: "Rüst Igno 4",
    description: "Der/die höchste/n Würfel, trifft/treffen direkt, ohne vom Rüstwert gesenkt zu werden."
  },
  ruestIgn5: {
    name: "Rüst Igno 5",
    description: "Der/die höchste/n Würfel, trifft/treffen direkt, ohne vom Rüstwert gesenkt zu werden."
  }, versteckt: {
    name: "Versteckt",
    description: "Waffe wird beim Durchsuchen nicht gefunden. Nichtmal durch einen Krit."
  },
  multiwurf1: {
    name: "Multiwurf 1",
    description: "Trifft bis zu zwei Ziele neben dem ersten."
  },
  multiwurf1I: {
    name: "Multiwurf 1I",
    description: "Trifft bis zu vier Ziele neben dem ersten."
  },
  multiwurf1II: {
    name: "Multiwurf 1II",
    description: "Alle Granaten (Kette) können gemeinsam geworfen werden."
  },
  ruestNicht1: {
    name: "Rüst Nicht 1",
    description: "Waffe ignoriert Rüstwert, dafür halber DMG"
  },
  ruestNicht2: {
    name: "Rüst Nicht 2",
    description: "Waffe behandelt Feind wie ohne Rüstung"
  },
  ruestNicht3: {
    name: "Rüst Nicht 3",
    description: "Waffe verursacht direkten Schaden an Physis"
  },
  lang: {
    name: "Lang",
    description: "Die Waffe überragt ein Feld."
  },
  zweiHandLang: {
    name: "2Hand L",
    description: "Waffe erlangt zweihändig den Tag Lang"
  },
  zweiHandSchwer: {
    name: "2Hand S",
    description: "Waffe erlangt einhändig den Tag Schwer"
  },
  schwer: {
    name: "Schwer",
    description: "Einhändig Schaden = nur Würfel kein Bonus"
  },
  folge: {
    name: "Folge",
    description: "Waffe erlangt zweifach ausgerüstet den Tag Kombo+"
  },
  offHand: {
    name: "Off-Hand",
    description: "Waffe für Akimbo/DualWield frei."
  },
  rwX: {
    name: "RW=X",
    description: "Angriffe über/unter dem RW Wert -50%"
  },
  kombo1: {
    name: "Kombo I",
    description: "Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert."
  },
  kombo2: {
    name: "Kombo II",
    description: "Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert."
  },
  kombo3: {
    name: "Kombo III",
    description: "Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert."
  },
  kombo4: {
    name: "Kombo IV",
    description: "Nach einem erfolgreichen Angriff, kann ein weiterer Angriff erfolgen. Dieser kann wieder gekontert werden, gilt jedoch als weiterer Angriff und senkt den Konterwert."
  },
  ungeschuetzt: {
    name: "Ungeschützt",
    description: "Jeder Schadenswürfel, der eine 1 zeigt, verursacht 4 Schaden am Träger."
  },
  entwaffnen: {
    name: "Entwaffnen",
    description: "Explodiert mindestens ein Würfel, kann statt Schaden, eine Entwaffnung durchgeführt werden."
  },
  fessel: {
    name: "Fessel",
    description: "Explodiert mindestens ein Würfel, kann statt Schaden, eine Fesselung durchgeführt werden. Fesselung erfordert eine Probe auf Fesseln gegen eine Probe auf Akrobatik."
  },
  ruestbruch1: {
    name: "Rüstbruch I",
    description: "Pro explodierende Würfel, sinkt der höchste Rüstwert um einen Punkt."
  },
  ruestbruch2: {
    name: "Rüstbruch II",
    description: "Pro explodierende Würfel, sinkt der höchste Rüstwert um zwei Punkte."
  },
  ruestbruch3: {
    name: "Rüstbruch III",
    description: "Pro explodierende Würfel, sinkt der höchste Rüstwert um drei Punkte."
  },
  fragil1: {
    name: "Fragil I",
    description: "25 Chance, dass Waffenqualität nach einem Konter des Feindes sinkt."
  },
  fragil2: {
    name: "Fragil II",
    description: "50% Chance, dass Waffenqualität nach einem Konter des Feindes sinkt."
  },
  fragil3: {
    name: "Fragil III",
    description: "Zeigt ein Schadenswürfel eine 1, sinkt die Waffenqualität."
  },
  panzerbrechend: {
    name: "Panzerbrechend",
    description: "Trägt der Feind eine Rüstung mit 30+ Punkten Rüstwert, verursacht die Waffe doppelten Schaden."
  },
  gezahnt: {
    name: "Gezahnt",
    description: "Nach einem erfolgreichen Angriff, kann die Waffe aus dem Feind gezogen werden um nochmals den gleichen Schaden zu verursachen."
  },
  konterwaffe1: {
    name: "Konterwaffe I",
    description: "Wird mit dieser Waffe gekontert, wird zum Kontern ein weiterer D6 hinzugefügt."
  },
  konterwaffe2: {
    name: "Konterwaffe II",
    description: "Wird mit dieser Waffe gekontert, wird zum Kontern ein weiterer 2D6 hinzugefügt."
  },
  konterwaffe3: {
    name: "Konterwaffe III",
    description: "Wird mit dieser Waffe gekontert, wird zum Kontern ein weiterer 3D6 hinzugefügt."
  },
  schild: {
    name: "Schild",
    description: "Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x1."
  },
  grossschild: {
    name: "Großschild",
    description: "Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x2."
  },
  turmschild: {
    name: "Turmschild",
    description: "Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x3."
  },
  weichesSchild: {
    name: "Weiches Schild",
    description: "Die Waffe kann genutzt werden, um Angriffe statt zu kontern, abzufangen. Dabei sinkt das Leben des Schildes um einen Punkt. Bei 0 sinkt die Qualität des Schildes um 1. Weich = 3."
  },
  hartesSchild: {
    name: "Hartes Schild",
    description: "Die Waffe kann genutzt werden, um Angriffe statt zu kontern, abzufangen. Dabei sinkt das Leben des Schildes um einen Punkt. Bei 0 sinkt die Qualität des Schildes um 1. Hart = 5 Leben."
  },
  schweresSchild: {
    name: "Schweres Schild",
    description: "Senkt den Reflexwert um einen Punkt und das Kontern um sechs Punkte."
  },
  konterschild: {
    name: "Konterschild",
    description: "Kontern wird um drei Punkte erleichtert."
  },
  antischild: {
    name: "Antischild",
    description: "Verteidiger kann seine Schildboni nicht nutzen."
  },
  silber: {
    name: "Silber",
    description: "Wesen, die anfällig auf Silber sind, erleiden dreifachen Schaden."
  }
}
