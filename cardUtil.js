import { evaluateCard } from './evaluate.js';

// Function to calculate Power Level
function calculatePowerLevel(card) {
    const evaluation = evaluateCard(card);
    return evaluation.tier;
}



//function to determine card type
function determineCardType(card) {
    if (!card) return null;

    if (card.supertype === "Pokémon") {
        if (card.subtypes && card.subtypes.some(st => 
            ['V', 'VMAX', 'VSTAR'].some(v => st.includes(v)))) return "110";
        if (card.subtypes && card.subtypes.includes("MEGA")) return "120";
        if (card.subtypes && card.subtypes.includes("GX")) return "130";
        if (card.subtypes && card.subtypes.includes("EX")) return "140";
        if (card.subtypes && card.subtypes.includes("LV.X")) return "150";
        if (card.subtypes && card.subtypes.includes("BREAK")) return "160";
        if (card.subtypes && card.subtypes.includes("Prime")) return "170";
        if (card.subtypes && card.subtypes.includes("Stage 2")) return "230";
        if (card.subtypes && card.subtypes.includes("Stage 1")) return "220";
        return "210"; // Basic Pokémon
    }

    if (card.supertype === "Trainer") {
        if (card.subtypes && card.subtypes.includes("Item")) return "310";
        if (card.subtypes && card.subtypes.includes("Tool")) return "320";
        if (card.subtypes && card.subtypes.includes("Supporter")) return "330";
        if (card.subtypes && card.subtypes.includes("Stadium")) return "340";
    }

    if (card.supertype === "Energy") {
        return card.subtypes && card.subtypes.includes("Basic") ? "410" : "420";
    }

    return null;
}

// Generate Classification Code
function getClassificationCode(card) {
    if (!card) return null;
    const powerLevel = calculatePowerLevel(card);
    const cardType = determineCardType(card);
    const pokedexNum = card.nationalPokedexNumbers
        ? card.nationalPokedexNumbers[0]
        : null;
    const elementType = card.types ? card.types[0] : null; // Assume first type is primary

    return `${powerLevel}.${cardType}.${pokedexNum}.${elementType}`;
}

// Export functions for use in app.js
export { calculatePowerLevel, determineCardType, getClassificationCode };
