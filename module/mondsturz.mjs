// Import document classes.
import { MondsturzActor } from "./documents/actor.mjs";
import { MondsturzItem } from "./documents/item.mjs";
import { MondsturzCombat } from "./documents/combat.mjs"
// Import sheet classes.
import { MondsturzActorSheet } from "./sheets/actor-sheet.mjs";
import { MondsturzItemSheet } from "./sheets/item-sheet.mjs";
import { MondsturzCombatTracker } from "./sheets/combat-tracker.mjs";
// Import helper/utility classes and constants.
import { MS } from "./helpers/config.mjs";
import { preloadTemplates, createEffectKeys, registerSystemSettings } from "./helpers/utils.js";
import { registerItemPiles } from "./helpers/itemPilesAPI.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function () {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.mondsturz = {
    MondsturzActor,
    MondsturzItem,
    rollItemMacro
  };

  // CONFIG.ChatMessage.template = "systems/mondsturz/templates/chat/chat-message.hbs"

  // CONFIG.debug.hooks = true
  CONFIG.ms = MS;

  CONFIG.ms.propertyKeys = createEffectKeys();

  CONFIG.Combat.initiative = {
    formula: "@attribute.koerper.reflex.wert + @attribute.koerper.reflex.mod"
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = MondsturzActor;
  CONFIG.Item.documentClass = MondsturzItem;
  CONFIG.Combat.documentClass = MondsturzCombat;
  CONFIG.ui.combat = MondsturzCombatTracker;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mondsturz", MondsturzActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mondsturz", MondsturzItemSheet, { makeDefault: true });

  registerSystemSettings();

  return preloadTemplates();
});

Hooks.once("ready", function () {

  // migrate existing actor data

  if (game.user && game.settings.get("mondsturz", "systemMigrationVersion") != "0.1") {
    const allActors = game.actors.contents;
    allActors.forEach(async (element) => {
      element.update({ "system.attribute.koerper.ruestwert.label": "Rüstzustand" })
    });
    game.settings.set("mondsturz", "systemMigrationVersion", "0.1")
  }
});


registerItemPiles()
/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

Handlebars.registerHelper('concat', function () {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue,
    "%0": (function () { if (lvalue) { return lvalue % rvalue } else { return 0 } })()
  }[operator]
});

Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('isSame', function (valOne, valTwo) {
  if (valOne === valTwo) {
    return true;
  }
});

Handlebars.registerHelper('times', function (n, block) {
  var accum = '';
  for (var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});

Handlebars.registerHelper("repeat", function (times, opts) {
  var out = "";
  var i;
  var data = {};

  if (times) {
    for (i = 0; i < times; i += 1) {
      data.index = i;
      out += opts.fn(this, {
        data: data
      });
    }
  } else {

    out = opts.inverse(this);
  }

  return out;
});

Handlebars.registerHelper('isEmpty', function (object) {
  if (Object.keys(object).length === 0) {
    return true;
  }
  return false;
});

Handlebars.registerHelper('st', function (val1, val2) {
  if (val1 < val2) {
    return true;
  }
  return false;
});

Handlebars.registerHelper('lt', function (val1, val2) {
  if (val1 > val2) {
    return true;
  }
  return false;
});

Handlebars.registerHelper('dumb', function (pKey, cKey, obj) {
  if (Object.keys(obj).length !== 0) {
    return obj[pKey][cKey]
  }
});

Handlebars.registerHelper('tagHandling', function (tagKey) {
  const tag = CONFIG.ms.waffenTags[tagKey];
  const name = Handlebars.Utils.escapeExpression(tag.name);
  const description = Handlebars.Utils.escapeExpression(tag.description);
  let tagElement = `<div class="tag-box" title="${description}"><div >${name}</div>`;
  return new Handlebars.SafeString(tagElement)
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.on("hotbarDrop", test);

function test(bar, data, slot) {
  if (data.type === "Item") {
    createItemMacro(data, slot)
    return false;
  }
}

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== "Item") return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn("You can only create macro buttons for owned Items");
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.mondsturz.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "mondsturz.itemMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then(item => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(`Could not find item ${itemName}. You may need to delete and recreate this macro.`);
    }

    console.log(this)
    // Trigger the item roll
    item.roll(item.parent);
  });
}

/* -------------------------------------------- */
/* Hooks                                        */
/* -------------------------------------------- */

// add event listener 
Hooks.on("renderChatMessage", (message, html, info) => {

  if (info.author.id === game.user.id) {
    let dmgButton = html[0].querySelector(".item-roll-damage");
    if (dmgButton) {
      dmgButton.classList.remove("ms-hidden")
    }
  }


  html.on("click", ".item-roll-damage", async (event, html) => {
    const uuid = event.currentTarget.closest(".item-message").dataset.itemId;
    const key = event.currentTarget.closest(".item-message").dataset.key;
    const item = await fromUuid(uuid);
    item.rollDamage(key);
  })

  // unused
  html.on("click", ".damage-target", async (event) => {
    const uuid = event.currentTarget.closest(".item-message").dataset.itemId;
    const item = await fromUuid(uuid);
    item.applyDamage();
  })
})
