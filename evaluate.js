// Helper function to check for effects in card text
function checkForEffects(text) {
    const effects = {
        score: 0,
        details: []
    };

    if (!text) return effects;

    text = text.toLowerCase();

    // Check for deck search effects
    if (text.includes("search your deck") && 
        text.includes("pokémon") && 
        text.includes("bench") && 
        !text.includes("energy")) {
        effects.score += 8;
        effects.details.push("Call for Family (+8)");
    }
    else if (text.includes("search your deck")) {
        effects.score += 4;
        effects.details.push("Deck Search (+4)");
    }

    // Check for status conditions
    if (text.includes("burned")) {
        effects.score += 2;
        effects.details.push("Burned Status (+2)");
    }
    if (text.includes("paralyzed")) {
        effects.score += 2;
        effects.details.push("Paralyzed Status (+2)");
    }
    if (text.includes("poisoned")) {
        effects.score += 3;
        effects.details.push("Poisoned Status (+3)");
    }
    if (text.includes("asleep") || text.includes("confused")) {
        effects.score += 4;
        effects.details.push("Asleep/Confused Status (+4)");
    }

    // Check for drawbacks
    if (text.includes("damage to itself")) {
        effects.score -= 2;
        effects.details.push("Self Damage (-2)");
    }

    return effects;
}

// Main evaluation function
function evaluateCard(card) {
    if (!card || card.supertype !== "Pokémon") {
        return { score: 0, details: ["Not a Pokémon card"], tier: "N/A" };
    }

    let score = 0;
    let details = [];

    // Calculate HP score
    const hp = parseInt(card.hp) || 0;
    let hpScore = 0;
    if (hp >= 200) hpScore = 4;
    else if (hp >= 120) hpScore = 3;
    else if (hp >= 60) hpScore = 2;
    else hpScore = -3;

    score += hpScore;
    details.push(`HP (${hp}): ${hpScore >= 0 ? '+' : ''}${hpScore}`);

    // Calculate summon cost
    const retreatCost = card.retreatCost ? card.retreatCost.length : 0;
    const stage = card.subtypes && card.subtypes.includes("Stage 2") ? 2 :
                 card.subtypes && card.subtypes.includes("Stage 1") ? 1 : 0;
    const ruleBox = card.subtypes && card.subtypes.some(st => 
        ['V', 'VMAX', 'VSTAR', 'GX', 'EX', 'MEGA'].includes(st)) ? 1 : 0;

    const summonCost = Math.max(1, retreatCost + stage + ruleBox);
    const summonScore = summonCost === 1 ? 3 : 
                       summonCost === 2 ? 2 : 
                       summonCost === 3 ? 1 : 
                       summonCost === 4 ? 0 : -2;
    
    score += summonScore;
    details.push(`Summon Cost (${summonCost}): ${summonScore >= 0 ? '+' : ''}${summonScore}`);

    // Calculate attack scores
    if (card.attacks) {
        card.attacks.forEach(attack => {
            let attackScore = 0;
            let attackDetails = [];

            // Check for effects
            const effectResults = checkForEffects(attack.text);
            attackScore += effectResults.score;
            attackDetails = [...effectResults.details];

            // Check damage
            const damageStr = attack.damage || '';
            if (damageStr && !damageStr.includes('+') && !damageStr.includes('×')) {
                const damage = parseInt(damageStr);
                if (damage >= 100) {
                    attackScore += 3;
                    attackDetails.push("High Damage (+3)");
                } else if (damage >= 50) {
                    attackScore += 2;
                    attackDetails.push("Medium Damage (+2)");
                }
            }

            score += attackScore;
            if (attackDetails.length > 0) {
                details.push(`Attack "${attack.name}": ${attackDetails.join(", ")}`);
            }
        });
    }

    // Calculate abilities score
    if (card.abilities) {
        card.abilities.forEach(ability => {
            const effectResults = checkForEffects(ability.text);
            score += effectResults.score;
            if (effectResults.details.length > 0) {
                details.push(`Ability "${ability.name}": ${effectResults.details.join(", ")}`);
            }
        });
    }

    // Determine tier based on final score
    let tier = "D";
    if (score >= 10) tier = "S";
    else if (score >= 8) tier = "A";
    else if (score >= 5) tier = "B";
    else if (score >= 3) tier = "C";

    return {
        score,
        tier,
        details
    };
}

export { evaluateCard };
