// Pokemon Card Classification System
const PCCS = {
    // Card Type Codes
    cardTypes: {
        "Special": {
            "V/VMAX/VSTAR": "110",
            "Mega": "120",
            "GX": "130",
            "EX": "140",
            "Level X": "150",
            "BREAK": "160",
            "Prime": "170"
        },
        "Regular": {
            "Basic": "210",
            "Stage 1": "220",
            "Stage 2": "230"
        },
        "Trainer": {
            "Item": "310",
            "Tool": "320",
            "Supporter": "330",
            "Stadium": "340"
        },
        "Energy": {
            "Basic": "410",
            "Special": "420"
        }
    },

    // Power Level Codes (for Pokemon cards)
    powerLevels: {
        "0-50": "001",
        "51-100": "100",
        "101-150": "200",
        "151-200": "300",
        "201-250": "400",
        "251-300": "500",
        "301+": "600"
    },

    // Type Codes
    types: {
        "Colorless": "000",
        "Fire": "200",
        "Water": "300",
        "Electric": "400",
        "Grass": "500",
        "Ice": "600",
        "Fighting": "700",
        "Poison": "800",
        "Ground": "900",
        "Flying": "010",
        "Psychic": "020",
        "Bug": "030",
        "Rock": "040",
        "Ghost": "050",
        "Dragon": "060",
        "Dark": "070",
        "Steel": "080",
        "Fairy": "090"
    },

    // Function to get Pokedex number from PokeAPI
    async getPokemonNumber(pokemonName) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (response.ok) {
                const data = await response.json();
                return String(data.id).padStart(4, '0');
            }
            return '0000';
        } catch (error) {
            console.error('Error fetching Pokedex number:', error);
            return '0000';
        }
    },

    // Generate classification code
    async generateCode(cardType, category, hp, pokemonType, pokemonName) {
        let typeCode = this.cardTypes[cardType]?.[category] || "000";
        let powerCode = "000";
        
        // Calculate power level code for Pokemon cards
        if (cardType === "Special" || cardType === "Regular") {
            if (hp <= 50) powerCode = "001";
            else if (hp <= 100) powerCode = "100";
            else if (hp <= 150) powerCode = "200";
            else if (hp <= 200) powerCode = "300";
            else if (hp <= 250) powerCode = "400";
            else if (hp <= 300) powerCode = "500";
            else powerCode = "600";
        }

        const typeValue = this.types[pokemonType] || "000";
        const dexNumber = await this.getPokemonNumber(pokemonName);
        
        return `${typeCode}.${powerCode}.${typeValue}.${dexNumber}`;
    }
};
