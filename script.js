// będziemy obsługiwać grida klocków umiejętności
const skillsGrid = document.querySelector(".skills-grid");

// przypisujemy do zmiennej description element o id "skill-description"
const description = document.getElementById("skill-description");

// pobiera wszystkie klocki
const skillItems = document.querySelectorAll(".skills-item");

// przechowuje aktualnie kliknięty klocek
let selectedItem = null;
let lastHoveredItem = null;

// przechodzi po wszystkich klockach
skillItems.forEach((item) => {
  // reakcja na najechanie myszką
  item.addEventListener("mouseenter", () => {
    // jeśli jakiś klocek jest już wybrany
    if (selectedItem) {
      return; // zakończ funkcję
    }
    // pobiera opis z data-description
    const text = item.dataset.description;

    // wstawia opis do elementu na górze
    description.textContent = text;
    lastHoveredItem = item;
  });

  // reakcja na zjechanie myszką
  item.addEventListener("mouseleave", () => {
    if (selectedItem) {
      description.textContent = selectedItem.dataset.description;
    } else if (lastHoveredItem) {
      description.textContent = lastHoveredItem.dataset.description;
    } else {
      description.textContent = "Najedź na umiejętność lub kliknij ją.";
    }
  });

  skillsGrid.addEventListener("mouseleave", () => {
    if (selectedItem) {
      description.textContent = selectedItem.dataset.description;
    } else {
      description.textContent = "Najedź na umiejętność lub kliknij ją.";
    }
  });

  // reakcja na kliknięcie
  item.addEventListener("click", () => {
    if (selectedItem === item) {
      // jeśli kliknięty klocek jest już aktywny, to go odznaczamy
      item.classList.remove("selected");
      selectedItem = null;
      return; // zakończ funkcję
    }

    // usuwa selected ze wszystkich klocków
    skillItems.forEach((el) => {
      el.classList.remove("selected");
    });

    // dodaje selected klikniętemu klockowi
    item.classList.add("selected");

    // zapisuje kliknięty klocek
    selectedItem = item;

    // ustawia jego opis
    description.textContent = item.dataset.description;
  });
});
