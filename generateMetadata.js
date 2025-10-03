// generateMetadata.js - Generate NFT metadata files for all cards
const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  baseUrl: "https://howlonghasitben.github.io/surf-works",
  externalUrl: "https://howlonghasitben.github.io/surf-works",
  cardDataPath: "./cardData.json",
  outputDir: "./metadata",
  imageBasePath: "/public/images/card-images",
};

// Load card data
function loadCardData() {
  const data = fs.readFileSync(CONFIG.cardDataPath, "utf8");
  return JSON.parse(data);
}

// Convert theme name to display format
function formatThemeName(themeName) {
  // cosmicPurple -> Cosmic Purple
  return themeName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Generate metadata for a card
function generateMetadata(card, is1of1 = true) {
  const rarity = is1of1 ? "1/1" : "Common";
  const showRarity = is1of1;

  const metadata = {
    name: `${card.name} ${card.subtitle}`.trim(),
    description: `${
      is1of1 ? "1/1 Legendary" : "Common"
    } Card from the SURF Waves Collection. ${card.flavorText}`,
    image: `${CONFIG.baseUrl}${card.image}`,
    animation_url: `${CONFIG.baseUrl}/card.html?id=${card.id}&showRarity=${showRarity}`,
    external_url: CONFIG.externalUrl,
    attributes: [
      {
        trait_type: "Rarity",
        value: rarity,
      },
      {
        trait_type: "Level",
        value: card.level,
      },
    ],
  };

  // Add stats if they exist
  if (card.stats) {
    metadata.attributes.push(
      {
        trait_type: "Attack",
        value: card.stats.attack,
      },
      {
        trait_type: "Defense",
        value: card.stats.defense,
      }
    );
  }

  // Add additional traits
  metadata.attributes.push(
    {
      trait_type: "Theme",
      value: formatThemeName(card.theme),
    },
    {
      trait_type: "Type",
      value: card.type,
    },
    {
      trait_type: "Artist",
      value: card.artist,
    },
    {
      trait_type: "Collection",
      value: "Waves Collection",
    }
  );

  // Add mana cost traits
  card.manaCost.forEach((mana, index) => {
    metadata.attributes.push({
      trait_type: `Mana ${index + 1}`,
      value: `${mana.type}: ${mana.value}`,
    });
  });

  return metadata;
}

// Save metadata to file
function saveMetadata(metadata, filename) {
  const outputPath = path.join(CONFIG.outputDir, filename);
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`✓ Generated: ${filename}`);
}

// Generate token URI mapping for smart contract
function generateTokenURIMapping(cards) {
  const mapping = {
    comment: "Token ID to Metadata URL mapping for smart contract",
    baseURI: `${CONFIG.baseUrl}/metadata/`,
    tokens: {},
  };

  let tokenId = 1;

  cards.forEach((card) => {
    // 1/1 version
    mapping.tokens[tokenId] = {
      id: tokenId,
      cardId: card.id,
      name: card.name,
      rarity: "1/1",
      metadataFile: `${card.id}-1of1.json`,
      uri: `${CONFIG.baseUrl}/metadata/${card.id}-1of1.json`,
    };
    tokenId++;

    // Regular version (for pack pulls)
    mapping.tokens[tokenId] = {
      id: tokenId,
      cardId: card.id,
      name: card.name,
      rarity: "Common",
      metadataFile: `${card.id}-common.json`,
      uri: `${CONFIG.baseUrl}/metadata/${card.id}-common.json`,
    };
    tokenId++;
  });

  return mapping;
}

// Main execution
function main() {
  console.log("🎴 Generating NFT Metadata Files...\n");

  // Create output directory
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Load card data
  const { cards } = loadCardData();
  console.log(`Found ${cards.length} cards\n`);

  // Generate metadata for each card
  cards.forEach((card) => {
    // 1/1 version
    const metadata1of1 = generateMetadata(card, true);
    saveMetadata(metadata1of1, `${card.id}-1of1.json`);

    // Common version (for packs)
    const metadataCommon = generateMetadata(card, false);
    saveMetadata(metadataCommon, `${card.id}-common.json`);
  });

  // Generate token URI mapping
  const mapping = generateTokenURIMapping(cards);
  saveMetadata(mapping, "tokenMapping.json");

  console.log(`\n✅ Generated ${cards.length * 2} metadata files!`);
  console.log(`📍 Output directory: ${CONFIG.outputDir}`);
  console.log("\n📝 Next steps:");
  console.log("1. Upload metadata/ folder to your GitHub repo");
  console.log("2. Update smart contract with baseURI");
  console.log("3. Use tokenMapping.json for dynamic tokenURI generation");
}

// Run if executed directly
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

module.exports = { generateMetadata, generateTokenURIMapping };
