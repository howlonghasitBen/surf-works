// convertCardData.js - Convert React cardData.js to JSON format
const fs = require("fs");
const path = require("path");

/**
 * This script converts your React cardData.js file to cardData.json
 * Run this in your project root:
 *
 * node convertCardData.js
 */

// Path to your React cardData.js file
const INPUT_FILE = path.join(__dirname, "src", "data", "cardData.js");
const OUTPUT_FILE = path.join(__dirname, "public", "cardData.json");

function extractDataFromJS(jsContent) {
  // Remove export statements and isolate the data
  let cleanedContent = jsContent
    .replace(/export const CARD_THEMES/g, "const CARD_THEMES")
    .replace(/export const CARD_DATA/g, "const CARD_DATA");

  // Create a sandbox to execute the JS and extract data
  const extractedData = {
    themes: null,
    cards: null,
  };

  // Create function context
  const sandbox = {
    CARD_THEMES: null,
    CARD_DATA: null,
  };

  // Execute the cleaned content
  try {
    // Use Function constructor to execute in controlled context
    const func = new Function(
      "sandbox",
      cleanedContent +
        "; sandbox.CARD_THEMES = CARD_THEMES; sandbox.CARD_DATA = CARD_DATA;"
    );
    func(sandbox);

    extractedData.themes = sandbox.CARD_THEMES;
    extractedData.cards = sandbox.CARD_DATA;
  } catch (error) {
    console.error("Error executing JS:", error.message);
    throw error;
  }

  return extractedData;
}

function convertToJSON(data) {
  return {
    cards: data.cards,
    themes: data.themes,
  };
}

function main() {
  console.log("🔄 Converting cardData.js to cardData.json...\n");

  // Check if input file exists
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ File not found: ${INPUT_FILE}`);
    console.log("\n💡 Make sure you run this script from your project root");
    console.log("   and that src/data/cardData.js exists");
    process.exit(1);
  }

  try {
    // Read the JavaScript file
    console.log(`📖 Reading: ${INPUT_FILE}`);
    const jsContent = fs.readFileSync(INPUT_FILE, "utf8");

    // Extract data
    console.log("🔍 Extracting CARD_DATA and CARD_THEMES...");
    const extracted = extractDataFromJS(jsContent);

    if (!extracted.cards || !extracted.themes) {
      throw new Error("Failed to extract card data or themes");
    }

    console.log(`✓ Found ${extracted.cards.length} cards`);
    console.log(`✓ Found ${Object.keys(extracted.themes).length} themes`);

    // Convert to JSON structure
    console.log("\n📝 Converting to JSON format...");
    const jsonData = convertToJSON(extracted);

    // Write to file
    console.log(`💾 Writing: ${OUTPUT_FILE}`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(jsonData, null, 2));

    console.log("\n✅ Conversion complete!");
    console.log(`📍 Output: ${OUTPUT_FILE}`);
    console.log(
      `📊 Size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`
    );

    console.log("\n📝 Next steps:");
    console.log("1. Review cardData.json for accuracy");
    console.log("2. Run updateManaOrbs.js to update mana orb system");
    console.log("3. Run generateMetadata.js to create NFT metadata");
  } catch (error) {
    console.error("\n❌ Conversion failed:", error.message);
    console.error("\n💡 Troubleshooting:");
    console.error(
      "   - Make sure cardData.js exports CARD_DATA and CARD_THEMES"
    );
    console.error("   - Check for syntax errors in cardData.js");
    console.error("   - Verify you're running from project root");
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { extractDataFromJS, convertToJSON };
