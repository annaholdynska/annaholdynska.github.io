// ---------------------------------- zmienne ----------------------------------

// szuka w html elementu z klasą .skills-grid i przypisuje do zmiennej, po to żeby móc reagować na ten element
const skillsGrid = document.querySelector(".skills-grid");

// przypisujemy do zmiennej description element o id "skill-description", bo w tym miejscu będą wyświetlane opisy umiejętności
const description = document.getElementById("skill-description");

// szuka wszystkich elementów z klasą .skills-item i przypisuje do zmiennej, po to żeby każdemu z nich dodać click itp.
const skillItems = document.querySelectorAll(".skills-item");

// pobiera main tekst (główny opis z umiejętności)
const mainText = document.getElementById("skill-description").textContent;

// let = zmienna, której można zmieniać wartość (let selectedItem = null - to jest początkowa wartość zmiennej), const = zmienna, której nie można zmieniać

// przechowuje aktualnie kliknięty klocek - jest po to, żeby pamiętać, co użytkownik wybrał
let selectedItem = null;
// tu trzeba pamiętać, który klocek był ostatnio najechany myszką, żeby po zjechaniu myszką z klocka, który nie jest wybrany, pokazać opis ostatniego najechanego klocka
let lastHoveredItem = null;

// ---------------------------------- reakcja na najechanie myszką ----------------------------------

// robimy pętle, która przechodzi po każdym klocku, item to jest jak "i" w pythonie
skillItems.forEach((item) => {
  // kiedy mysz najedzie na klocek
  item.addEventListener("mouseenter", () => {
    // jeśli jakiś klocek jest wciśnięty to funkcja "mouseenter" ma się cała NIE wykonać
    if (selectedItem) {
      return; // zakończ funkcję "mouseenter", nie idź dalej do linijek
    }
    // tworzymy zmienną "text" tylko dla czytelności kodu, item.dataset.description pobiera opis wybranej umiejętności z htmla, żeby wiedzieć którą pokazać na ekranie
    const text = item.dataset.description;

    // text.Content to właściwość DOM, która pobiera i wstawia czysty tekst w elemencie HTML, wstawia na ekran zmienną "text" - umiejętność, która została wybrana krok wcześniej
    description.textContent = text;

    // do zmiennej "lastHoveredItem" przypisuje ostatni klocek, na którym była najechana mysz
    lastHoveredItem = item;
  });

  // ---------------------------------- reakcja na zjechanie myszką ----------------------------------

  // mouseleave dla klocka
  item.addEventListener("mouseleave", () => {
    // if (selectedItem) = gdy element istnieje to... gdy klocek jest wciśnięty
    if (selectedItem) {
      // to opis mi zostać taki jak wciśniętego klocka
      description.textContent = selectedItem.dataset.description;
    } else if (lastHoveredItem) {
      description.textContent = lastHoveredItem.dataset.description;
    } else {
      description.textContent = mainText;
    }
  });

  //mouseleave dla grida
  skillsGrid.addEventListener("mouseleave", () => {
    if (selectedItem) {
      description.textContent = selectedItem.dataset.description;
    } else {
      description.textContent = mainText;
    }
  });

  // ---------------------------------- reakcja na kliknięcie myszką ----------------------------------

  item.addEventListener("click", () => {
    // === to jest ścisłe przyrównanie - czy te dwie rzeczy są dokładnie takie same, = to jest zapisanie do zmiennej
    if (selectedItem === item) {
      // jeśli kliknięty klocek jest kliknięty, to go odznaczamy
      item.classList.remove("selected");
      selectedItem = null;
      return; // zakończ funkcję
    }

    // usuwa wygląd wciśniętego klocka (selected) ze wszystkich innych klocków
    skillItems.forEach((el) => {
      el.classList.remove("selected");
    });

    // dodaje wygląd selected klikniętemu klockowi
    item.classList.add("selected");

    // tu zapisuje, że ten klocek (item), który wybraliśmy to jest ten klocek selectedItem
    selectedItem = item;

    // ustawia opis dla wciśniętego klocka
    description.textContent = item.dataset.description;
  });
});
