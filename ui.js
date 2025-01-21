// 1. Render Card Carousel
function renderCardCarousel(cards) {
    const carouselContainer = document.getElementById("carousel-container");
    carouselContainer.innerHTML = ""; // Clear previous content
  
    if (cards.length === 0) {
      carouselContainer.innerHTML = "<p>No cards to display.</p>";
      return;
    }
  
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${card.images.small}" alt="${card.name}" />
        <p>${card.name}</p>
      `;
      cardElement.addEventListener("click", () => renderCardDetails(card));
      carouselContainer.appendChild(cardElement);
    });
  }
  
  // 2. Render Card Details
  function renderCardDetails(card) {
    const cardDetailsContainer = document.getElementById("card-details-container");
    cardDetailsContainer.innerHTML = `
      <h2>${card.name}</h2>
      <img src="${card.images.large}" alt="${card.name}" />
      <p><strong>HP:</strong> ${card.hp}</p>
      <p><strong>Types:</strong> ${card.types.join(", ")}</p>
      <p><strong>Abilities:</strong> ${
        card.abilities ? card.abilities.map((ability) => ability.name).join(", ") : "None"
      }</p>
      <p><strong>Attacks:</strong> ${
        card.attacks ? card.attacks.map((attack) => attack.name).join(", ") : "None"
      }</p>
      <p><strong>Weaknesses:</strong> ${
        card.weaknesses ? card.weaknesses.map((weakness) => weakness.type).join(", ") : "None"
      }</p>
    `;
  }
  
  // 3. Render Search Filters
  function renderSearchFilters() {
    const app = document.getElementById("app");
  
    const filtersContainer = document.createElement("div");
    filtersContainer.id = "filters-container";
  
    filtersContainer.innerHTML = `
      <h3>Reverse Search Filters</h3>
      <label for="filter-name">Name:</label>
      <input type="text" id="filter-name" placeholder="Enter Pokémon name" />
  
      <label for="filter-type">Type:</label>
      <select id="filter-type">
        <option value="">Any</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Grass">Grass</option>
        <option value="Electric">Electric</option>
        <option value="Psychic">Psychic</option>
        <option value="Darkness">Darkness</option>
        <option value="Fighting">Fighting</option>
        <option value="Metal">Metal</option>
        <option value="Fairy">Fairy</option>
        <option value="Dragon">Dragon</option>
        <option value="Colorless">Colorless</option>
      </select>
  
      <label for="filter-hp">HP Threshold:</label>
      <input type="number" id="filter-hp" placeholder="Min HP" />
  
      <button id="apply-filters-button">Apply Filters</button>
    `;
  
    app.appendChild(filtersContainer);
  
    // Event Listener for Applying Filters
    document
      .getElementById("apply-filters-button")
      .addEventListener("click", handleApplyFilters);
  }
  
  // 4. Update Reverse Search Results
  function updateReverseSearchResults(results) {
    const carouselContainer = document.getElementById("carousel-container");
    carouselContainer.innerHTML = ""; // Clear existing content
  
    if (results.length === 0) {
      carouselContainer.innerHTML = "<p>No cards match the selected filters.</p>";
      return;
    }
  
    results.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${card.images.small}" alt="${card.name}" />
        <p>${card.name}</p>
      `;
      cardElement.addEventListener("click", () => renderCardDetails(card));
      carouselContainer.appendChild(cardElement);
    });
  }
  
  // 5. Handle Apply Filters
  function handleApplyFilters() {
    const name = document.getElementById("filter-name").value.trim();
    const type = document.getElementById("filter-type").value;
    const hp = parseInt(document.getElementById("filter-hp").value, 10);
  
    // Example filter logic
    const filteredResults = recentlyViewedCards.filter((card) => {
      const matchesName = name ? card.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesType = type ? card.types.includes(type) : true;
      const matchesHp = hp ? parseInt(card.hp, 10) >= hp : true;
  
      return matchesName && matchesType && matchesHp;
    });
  
    updateReverseSearchResults(filteredResults);
  }
  
