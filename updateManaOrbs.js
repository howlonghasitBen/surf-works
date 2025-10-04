// updateManaOrbs.js
const fs = require("fs");
const path = require("path");

// Configuration
const CARD_DATA_PATH = "./cardData.json";

// HP values based on level
const HP_VALUES = {
  1: "3",
  2: "5",
  3: "10",
  "∞": "∞",
  "★": "★", // Default for special cards
};

// Mana Cost values based on level
const MANA_COST_VALUES = {
  1: "1",
  2: "3",
  3: "5",
  "∞": "6",
  "★": "1", // Default for special cards
};

// Orb color schemes
const ORB_COLORS = {
  hp: {
    color: "radial-gradient(circle, #dc143c, #8b0000)",
    textColor: "#ffffff",
  },
  mana: {
    color: "radial-gradient(circle, #4169e1, #0000cd)",
    textColor: "#ffffff",
  },
  terrain: {
    color: "radial-gradient(circle, #32cd32, #228b22)",
    textColor: "#ffffff",
  },
};

function updateCardManaOrbs(card) {
  const level = card.level;
  const hp = HP_VALUES[level] || "3";
  const manaCost = MANA_COST_VALUES[level] || "1";

  // Create new standardized mana cost array
  card.manaCost = [
    {
      type: "hp",
      value: hp,
      color: ORB_COLORS.hp.color,
      textColor: ORB_COLORS.hp.textColor,
    },
    {
      type: "mana",
      value: manaCost,
      color: ORB_COLORS.mana.color,
      textColor: ORB_COLORS.mana.textColor,
    },
    {
      type: "terrain",
      value: "?",
      color: ORB_COLORS.terrain.color,
      textColor: ORB_COLORS.terrain.textColor,
    },
  ];

  return card;
}

function main() {
  console.log("🔄 Updating mana orb system...\n");

  // Check if file exists
  if (!fs.existsSync(CARD_DATA_PATH)) {
    console.error(`❌ File not found: ${CARD_DATA_PATH}`);
    console.log("💡 Make sure cardData.json exists in the current directory");
    process.exit(1);
  }

  try {
    // Read the JSON file
    console.log(`📖 Reading: ${CARD_DATA_PATH}`);
    const rawData = fs.readFileSync(CARD_DATA_PATH, "utf8");
    const cardData = JSON.parse(rawData);

    if (!cardData.cards || !Array.isArray(cardData.cards)) {
      throw new Error("Invalid card data structure - cards array not found");
    }

    console.log(`✓ Found ${cardData.cards.length} cards\n`);

    // Update each card
    console.log("🔧 Updating mana orbs...");
    let updateCount = 0;

    cardData.cards = cardData.cards.map((card) => {
      const updatedCard = updateCardManaOrbs(card);
      updateCount++;

      // Log sample
      if (updateCount <= 3) {
        console.log(
          `  ✓ ${card.name} (Lvl ${card.level}): HP=${
            HP_VALUES[card.level]
          }, Mana=${MANA_COST_VALUES[card.level]}, Terrain=?`
        );
      }

      return updatedCard;
    });

    if (updateCount > 3) {
      console.log(`  ... and ${updateCount - 3} more cards`);
    }

    // Create backup
    const backupPath = CARD_DATA_PATH.replace(".json", ".backup.json");
    console.log(`\n💾 Creating backup: ${backupPath}`);
    fs.writeFileSync(backupPath, rawData);

    // Write updated data
    console.log(`💾 Writing updated data: ${CARD_DATA_PATH}`);
    fs.writeFileSync(CARD_DATA_PATH, JSON.stringify(cardData, null, 2));

    console.log(`\n✅ Successfully updated ${updateCount} cards!`);
    console.log("\n📊 New Mana Orb System:");
    console.log("  Orb 1 (Red): HP");
    console.log("    - Level 1: 3 HP");
    console.log("    - Level 2: 5 HP");
    console.log("    - Level 3: 10 HP");
    console.log("    - Level ∞: ∞ HP");
    console.log("    - Level ★: ★ HP");
    console.log("\n  Orb 2 (Blue): Mana Cost");
    console.log("    - Level 1: 1 mana");
    console.log("    - Level 2: 3 mana");
    console.log("    - Level 3: 5 mana");
    console.log("    - Level ∞: 6 mana");
    console.log("    - Level ★: 1 mana");
    console.log("\n  Orb 3 (Green): Terrain (? placeholder)");
  } catch (error) {
    console.error("\n❌ Update failed:", error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { updateCardManaOrbs, HP_VALUES, MANA_COST_VALUES };
