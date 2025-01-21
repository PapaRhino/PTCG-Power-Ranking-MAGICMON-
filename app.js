// Search Cards by Name
async function searchCardsByName(name) {
    if (!name.trim()) {
      alert("Please enter a card name to search.");
      return;
    }
  
    try {
      const response = await fetch(`${POKEMONTCG_API_BASE}/cards?q=name:${name}`, {
        headers: { "X-Api-Key": POKEMONTCG_API_KEY },
      });
      const data = await response.json();
      renderSearchResults(data.data);
    } catch (error) {
      console.error("Error searching cards:", error);
    }
  }
  
  // Search Cards by Filters
  async function searchCardsByFilters(filters) {
    const { type, rarity, set, minHP, maxHP } = filters;
  
    let query = "";
    if (type) query += `types:${type}`;
    if (rarity) query += ` rarity:${rarity}`;
    if (set) query += ` set:${set}`;
    if (minHP) query += ` hp>=${minHP}`;
    if (maxHP) query += ` hp<=${maxHP}`;
  
    try {
      const response = await fetch(`${POKEMONTCG_API_BASE}/cards?q=${query}`, {
        headers: { "X-Api-Key": POKEMONTCG_API_KEY },
      });
      const data = await response.json();
      renderSearchResults(data.data);
    } catch (error) {
      console.error("Error searching cards by filters:", error);
    }
  }
  
  // Reverse Search: Find Cards by Classification Code
  async function reverseSearch(classificationCode) {
    const [powerLevel, cardType, pokedexNum, elementType] = classificationCode.split(".");
  
    try {
      const response = await fetch(`${POKEMONTCG_API_BASE}/cards?q=name:${pokedexNum}`, {
        headers: { "X-Api-Key": POKEMONTCG_API_KEY },
      });
      const data = await response.json();
      const matchingCards = data.data.filter(card => {
        const cardClassification = generateClassificationCode(card); // Assuming generateClassificationCode function exists
        return cardClassification === classificationCode;
      });
      renderSearchResults(matchingCards);
    } catch (error) {
      console.error("Error reverse searching cards:", error);
    }
  }
  
  // Render Search Results
  function renderSearchResults(cards) {
    const carouselContainer = document.getElementById("carousel-container");
    carouselContainer.innerHTML = "";
       
    if (cards.length === 0) {
      carouselContainer.innerHTML = "<p>No cards found. Try another search!</p>";
      return;
    }
  
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${card.images.small}" alt="${card.name}" />
        <p>${card.name}</p>
      `;
      cardElement.addEventListener("click", () => displayCardDetails(card));
      carouselContainer.appendChild(cardElement);
    });
  }
  
  import { calculatePowerLevel, getClassificationCode } from './cardUtils.js';

        document.getElementById('evaluate-button').addEventListener('click', async () => {
            const cardData = await fetchCardData(); // Replace with actual card-fetching logic
            const powerLevel = calculatePowerLevel(cardData);
            const classificationCode = getClassificationCode(cardData);

            displayCardDetails(cardData, powerLevel, classificationCode);
        });

        function displayCardDetails(card, powerLevel, classificationCode) {
            document.getElementById('power-level').innerText = powerLevel || 'N/A';
            document.getElementById('classification-code').innerText = classificationCode || 'N/A';
        }

        import { getPokemonData } from './apiUtils.js';

async function enrichCardData(card) {
    if (card.nationalPokedexNumbers) {
        const pokedexNum = card.nationalPokedexNumbers[0];
        const pokemonData = await getPokemonData(pokedexNum);
        card.pokemonDetails = pokemonData; // Add additional details as needed
    }
    return card;
}
