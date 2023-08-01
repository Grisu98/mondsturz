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
    "einhandwaffen": "Einhandwaffen",
    "schildkunst": "Schildkunst",
    "stangenwaffen": "Stangenwaffen",
    "zweihandwaffen": "Zweihandwaffen"
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
  spreng: {
    name: "spreng",
    description: "Die Waffe verursacht ihren Schaden durch Sprengstoff. Schaden wird errechnet ohne Rüstwert."
  },
  element: {
    name: "Element",
    description: "Der Energieschaden der Waffe beruht auf dem Element 'X', fügt eventuell Debuff zu."
  },
  explosionI: {
    name: "Explosion I",
    description: "Die Waffe verursacht besonders widerliche Wunden. Jeder Würfel kann einmal neu geworfen werden, sofern er sein Maximum zeigte."
  },
  explosionII: {
    name: "Explosion II",
    description: "Die Waffe verursacht besonders widerliche Wunden. Jeder Würfel kann einmal neu geworfen werden, sofern er sein Maximum zeigte."
  },
  krit2_6: {
    name: "Krit +X",
    description: "Die Waffe trifft besonders gefährlich. Ein Krit ist bereits X Pasche früher möglich. (Pasche, Päsche???)"
  },
  superkrit: {
    name: "Superkrit",
    description: "Wird ein Krit mit einem zweiten Pasch bestätigt, so wird der Feind sofort ausgelöscht. Hat der Feind mehr als 10 Physis oder ist ein Mini/Boss, verliert er nur die Hälfte der Physis. Hat er Hyperarmor, so verliert er sofort alles an Hyperarmor. In beiden Fällen wird das Ziel immun gegen Ultrakrits."
  },
  extrakrit: {
    name: "Extrakrit",
    description: "Die Waffe verliert einen Punkt Krit, dafür wird der Schaden mit 3 statt 2 multipliziert."
  },
  betaubt: {
    name: "Betäubt",
    description: "Die Waffe kann Feinde betäuben. Halber Schaden, mindestens 1, wird zu Betäubungsschaden."
  },
  ziel: {
    name: "Ziel",
    description: "Die Waffe verursacht +10 Schaden gegen das gewählte Ziel."
  },
  ruestIgn1: {
    name: "Rüst Igno 1",
    description: "Waffe ignoriert Rüstwert, dafür halber DMG"
  },
  ruestIgn2: {
    name: "Rüst Igno 2",
    description: "Waffe ignoriert Rüstwert und verursacht vollen Schaden. "
  },
  versteckt: {
    name: "Versteckt",
    description: "Die Waffe ist klein und gut zu verstecken. Selbst ein Krit findet sie nicht beim Durchsuchen. "
  },
  zuverlaessig: {
    name: "Zuverlässig",
    description: "Die Waffe wird niemals durch Ungeschick zerstört. Kritische Fehlschläge sind unmöglich, gelten als 2."
  },
  fehlbalance: {
    name: "Fehlbalance",
    description: "Die Waffe verliert einen D6 bei Angriff und Konter, vom Gesamtwert"
  },
  durchschlagend: {
    name: "Durchschlagend",
    description: "Die Waffe eignet sich besonders gut, um Rüstung zu durchschlagen. Trägt der Feind eine Rüstung mit 30+ Punkten Rüstwert, verursacht die Waffe doppelten Schaden."
  },
  gewalttätig: {
    name: "Gewalttätig",
    description: "Die Waffe verursacht an unverletzten Feinden einen Punkt Schaden an der Physis, 2D6."
  },
  kraftvoll: {
    name: "Kraftvoll",
    description: "Das Ziel kann bei einem explodierenden Angriff ein Feld zurückgeschlagen werden."
  },
  brutal: {
    name: "Brutal",
    description: "Ziel mit einem Punkt Physis, dann sofortiger Kill, sofern 1 Leben abgezogen."
  },
  multitreffer: {
    name: "Multitreffer",
    description: "Die Waffe verschießt mehrere Geschosse, es werden bis zu zwei Ziele neben dem ersten Ziel getroffen."
  },
  multiwurf1: {
    name: "Multiwurf I",
    description: "Ganzes Stack kann gefächert geworfen werden, trifft bis zu zwei Ziele neben dem ersten."
  },
  multiwurf1I: {
    name: "Multiwurf II",
    description: "Ganzes Stack kann gefächert geworfen werden, trifft bis zu vier Ziele neben dem ersten."
  },
  multiwurf1II: {
    name: "Multiwurf III",
    description: "Granatenkette kann gesammelt geworfen werden, Schaden addiert sich, Reichweite + 1 Feld Radius, je 2 weitere Granaten, max. +3"
  },
  lautlos: {
    name: "Lautlos",
    description: "Die Waffe verursacht keinen Lärm, bei Nahkampfwaffen für gewöhnlich immer aktiv."
  },
  lang: {
    name: "Lang",
    description: "Die Waffe hat doppelte Reichweite"
  },
  sehrLang: {
    name: "Sehr Lang",
    description: "Die Waffe hat dreifache Reichweite"
  },
  zweihandwaffe: {
    name: "Zweihandwaffe",
    description: "Wird ein Feind erledigt, durchschlägt die Waffe das Ziel und verursacht nochmals Schaden an einem Ziel welches danebensteht und angegriffen werden könnte. Der Schaden beläuft sich auf 50% des max. Schadens, der Angriff muss jedoch gewürfelt werden. Einhändig verliert sie den Tag"
  },
  zweiHandSchwer: {
    name: "2Hand S",
    description: "Waffe erlangt einhändig den Tag Schwer"
  },
  schwer: {
    name: "Schwer",
    description: "Die Waffe ist schwer und erfordert zu Beginn einer Runde einen Kraftwurf von 8 oder höher."
  },
  folge: {
    name: "Folge",
    description: "Waffe erlangt zweifach ausgerüstet den Tag Kombo+"
  },
  offHand: {
    name: "Off-Hand",
    description: "Waffe eignet sich als Zweitwaffe/Seitenschild, Waffe für Akimbo/DualWield frei. Fraglich"
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
    description: "Die Waffe ist schwer zu kontrollieren und Verletzungen am eigenen Körper sind möglich. Jeder Schadenswürfel, der eine 1 zeigt, verursacht 4 Schaden am Träger"
  },
  entwaffnen: {
    name: "Entwaffnen",
    description: "Die Waffe ist geeignet, einen Feind zu entwaffnen. Dabei wird die Waffe des Feindes, ein Feld in eine beliebige Richtung geworfen. Explodiert mindestens ein Würfel, kann statt Schaden, eine Entwaffnung durchgeführt werden."
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
    description: "Die Waffe kann leicht brechen. Zeigt ein Schadenswürfel eine 1 so sinkt die Waffen­qualität."
  },
  fragil2: {
    name: "Fragil II",
    description: "Die Waffe kann leicht brechen. 25 Chance, dass Waffenqualität nach einem Konter des Feindes sinkt. "
  },
  fragil3: {
    name: "Fragil III",
    description: "Die Waffe kann leicht brechen. 50% Chance, dass Waffenqualität nach einem Konter des Feindes sinkt. "
  },
  unhandlich: {
    name: "Unhandlich",
    description: "Die Waffe ist sehr unhandlich, Angriff/Konterwurf erlangen nur 50% des Talentes."
  },
  panzerbrechendI: {
    name: "Panzerbrechend",
    description: "Waffe eignet sich besonders gut, um Rüstung permanent zu schwächen. Pro explodierende Würfel, sinkt der höchste Rüstwert um einen Punkt."
  },
  panzerbrechendII: {
    name: "Panzerbrechend",
    description: "Waffe eignet sich besonders gut, um Rüstung permanent zu schwächen. Pro explodierende Würfel, sinkt der höchste Rüstwert um zwei Punkte."
  },
  panzerbrechendIII: {
    name: "Panzerbrechend",
    description: "Waffe eignet sich besonders gut, um Rüstung permanent zu schwächen. Pro explodierende Würfel, sinkt der höchste Rüstwert um drei Punkte."
  },
  gezahnt: {
    name: "Gezahnt",
    description: "Die Waffe ist gezahnt oder mit Wiederhacken besetzt. Nach einem erfolgreichen Angriff, nicht Konter, kann die Waffe aus dem Feind gezogen werden, um nochmals den gleichen Schaden zu verursachen. Dieser Folgeangriff kostet eine Aktion, alternativ kann jedoch auch ein Kombo+ Modifikator genutzt werden. Diesen Angriff kann man nicht Kontern/Blocken."
  },
  konterwaffe1: {
    name: "Konterwaffe I",
    description: "Bei jedem Konter können 1D6 zusätzlich zum Konterwurf addiert werden."
  },
  konterwaffe2: {
    name: "Konterwaffe II",
    description: "Bei jedem Konter können 2D6 zusätzlich zum Konterwurf addiert werden."
  },
  konterwaffe3: {
    name: "Konterwaffe III",
    description: "Bei jedem Konter können 3D6 zusätzlich zum Konterwurf addiert werden."
  },
  schild: {
    name: "Schild",
    description: "Die Waffe ist ein Schild und von daher gut für die Verteidigung geeignet. Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x1"
  },
  grossschild: {
    name: "Großschild",
    description: "Die Waffe ist ein Schild und von daher gut für die Verteidigung geeignet. Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x2"
  },
  turmschild: {
    name: "Turmschild",
    description: "Die Waffe ist ein Schild und von daher gut für die Verteidigung geeignet. Die Waffe erhöht alle Rüstwerte um seinen eigenen Tierstufenwert x3"
  },
  weichesSchild: {
    name: "Weiches Schild",
    description: "Die Waffe kann genutzt werden um Angriffe, statt zu kontern, abzufangen. Dabei sinkt das Leben des Schildes um einen Punkt. Bei 0 sinkt die Qualität des Schildes um 1. Weiche Schilde haben je Qualitätsstufe 3 Leben., Harte Schilde haben 5 Leben."
  },
  hartesSchild: {
    name: "Hartes Schild",
    description: "Die Waffe kann genutzt werden um Angriffe, statt zu kontern, abzufangen. Dabei sinkt das Leben des Schildes um einen Punkt. Bei 0 sinkt die Qualität des Schildes um 1. Weiche Schilde haben je Qualitätsstufe 3 Leben., Harte Schilde haben 5 Leben."
  },
  schweresSchild: {
    name: "Schweres Schild",
    description: "Das Schild ist besonders schwer. Es erfordert mehr Anstrengung es zu tragen. Senkt den Reflexwert um einen Punkt und das Kontern um sechs Punkte."
  },
  konterschild: {
    name: "Konterschild",
    description: "Das Schild ist besonders leicht. Er eignet sich daher sehr gut zum Kontern. Kontern wird um drei Punkte erleichtert."
  },
  antischild: {
    name: "Antischild",
    description: "Die Waffe ist geeignet, um Schilde zu umgehen. Verteidiger kann seine Schildboni nicht nutzen. Bezieht sich auf alle Vorteile, die durch Schildtags entstehen."
  },
  silber: {
    name: "Silber",
    description: "Wesen, die anfällig auf Silber sind, erleiden dreifachen Schaden."
  },
  gold: {
    name: "Gold",
    description: "Waffe erlangt den Tag Ultrakrit."
  }
  ,
  rueckschlag: {
    name: "Rückschlag",
    description: "Nach einem Angriff trifft dich der Rückschlag mit einem DX = Würfel ist DMG-Würfel."
  },
  langsam: {
    name: "Langsam",
    description: "Die Waffe eignet sich nur für eine Angriffsfolge, zweite Aktion kann nicht für Waffe genutzt werden."
  },
  magazin: {
    name: "Magazin",
    description: "Die Waffe hat eine Ladung, Batterie, Magazin, ist es leer, kann sie nicht genutzt werden."
  },
  setUp: {
    name: "Set Up",
    description: "Die Waffe benötigt eine Warmlaufzeit von X Runden oder muss aktiviert werden."
  },
  gleve: {
    name: "Gleve",
    description: "Bei tot des Ziels, kann ein weiterer Feind angegriffen werden ohne Aktion."
  },
  teamFightTactic: {
    name: "TeamFightTactic",
    description: "Ist die Waffe zweifach ausgerüstet, kann ein weitere Angriff durchgeführt werden, 50% schaden."
  },
  nichtToetlich: {
    name: "Nicht tödlich",
    description: "Die Waffe schlägt ein Ziel maximal auf drei Physis runter, woraufhin es sofort als betäubt gilt"
  },
  ladehemmung: {
    name: "Ladehemmung",
    description: "Die Fernkampfwaffe klemmt manchmal, eine Aktion zum Reparieren, tritt mit 1D4, bei 1 auf. Sowohl beim Start eines Kampfes als auch als fünf Angriffe."
  },
  einhandwaffe: {
    name: "Einhandwaffe",
    description: "Einhandwaffen eignen sich hervorragend zum Kontern, bei Konter darf ein weiterer D6 addiert werden."
  },
  stangenwaffe: {
    name: "Stangenwaffe",
    description: "Die Waffe ist länger und kann daher, wenn zweihändig getragen, ein Feld weiter angreifen. Einhändig verliert sie den Tag Lang."
  },
  faustwaffe: {
    name: "Faustwaffe",
    description: "Die Waffe hat ein Geschwisterchen, werden beide ausgerüstet, ist mit derselben Aktion, ein weiterer Angriff möglich, dieser verursacht 50% Schaden. Allein verliert die Waffe den Tag TeamFightTactic"
  },
  exotWaffe: {
    name: "Exotische Waffe",
    description: "Waffen dieser Kategorie sind für gewöhnlich so exotisch, dass sie mit eigenen Konditionen kommen. "
  },
  kurzwaffe: {
    name: "Kurzwaffe",
    description: "Kurzwaffen haben für gewöhnlich eine niedrigere Reichweite."
  },
  langwaffe: {
    name: "Langwaffe",
    description: "Langwaffen haben für gewöhnlich eine höhere Reichweite."
  },
  bogenwaffe: {
    name: "Bogenwaffe",
    description: "Bogenwaffen sind leise und verwenden oft Munition, die wiederverwendet werden kann."
  },
  schwereWaffe: {
    name: "Schwere Waffe",
    description: "Schwere Waffen tragen besondere Konditionen."
  },
  wurfwaffe: {
    name: "Wurfwaffe",
    description: "Wurfwaffen sind leise und wiederverwendbar oder Granaten, die dafür extremen Schaden verursachen."
  },
  exot: {
    name: "Exot",
    description: "Waffen dieser Kategorie sind für gewöhnlich so exotisch, dass sie mit eigenen Konditionen kommen."
  },
  rwPistole: {
    name: "RW Revolver",
    description : "2-6"
  },
  rwPistole: {
    name: "RW Pistole/MP",
    description : "4-8"
  },
  rwFlinte: {
    name: "RW Flinte/Sturmgewehr",
    description : "7-12"
  },
  rwBuechsen: {
    name: "RW Büchsen",
    description : "10-20"
  },
  rwPamrbrust: {
    name: "RW Pistolenarmbrust",
    description : "1-6"
  },
  rwBogen: {
    name: "RW Bogen/Bolaschleuder",
    description : "7-12"
  },
  rwGrBogen: {
    name: "RW Großbogen",
    description : "10-15"
  },
  rwFlussigkeitswerfer: {
    name: "RW Flüssigkeitswerfer",
    description : "3-7"
  },
  rwObjschleuder: {
    name: "RW Objektschleuder",
    description : "6-10"
  },
  rwMoerser: {
    name: "RW Mörser",
    description : "6-10"
  },
  rwSchwer: {
    name: "RW Schwere Waffen",
    description : "1-20 jedoch immer nur auf 50%"
  },
  rwWurfwaffen: {
    name: "RW Wurfwaffen",
    description : "1-5 +  Talentprobe/4"
  },
  rwZwille: {
    name: "RW Zwille",
    description : "1-5"
  },
  rwSchleudern: {
    name: "RW Schleudern",
    description : "1-5 + Talentprobe/2"
  },
  rwBlasrohr: {
    name: "RW Blasrohr",
    description : "Talentprobe/4"
  },
}
