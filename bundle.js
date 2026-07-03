const container = document.querySelector(".countries");
const searchInput = document.getElementById("search");
const regionSelect = document.getElementById("region");
const darkBtn = document.querySelector(".dark-btn");

let countriesData = [];

// --------------------
// Apply saved theme
// --------------------
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// --------------------
// Dark Mode
// --------------------
darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

// --------------------
// Load Countries
// --------------------
fetch("data.json")
    .then(response => response.json())
    .then(data => {

        countriesData = data;

        createCards(countriesData);

    })
    .catch(error => console.log(error));

// --------------------
// Create Cards
// --------------------
function createCards(data) {

    container.innerHTML = "";

    data.forEach(country => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name}">

            <div class="card-content">

                <h3>${country.name}</h3>

                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>

                <p><strong>Region:</strong> ${country.region}</p>

                <p><strong>Capital:</strong> ${country.capital}</p>

            </div>
        `;

        card.addEventListener("click", () => {

            localStorage.setItem("selectedCountry", country.name);

            window.location.href = "details.html";

        });

        container.appendChild(card);

    });

}

// --------------------
// Search + Filter
// --------------------
function filterCountries() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedRegion = regionSelect.value;

    const filteredCountries = countriesData.filter(country => {

        const matchesSearch =
            country.name.toLowerCase().includes(searchText);

        const matchesRegion =
            selectedRegion === "" ||
            country.region === selectedRegion;

        return matchesSearch && matchesRegion;

    });

    createCards(filteredCountries);

}

searchInput.addEventListener("input", filterCountries);

regionSelect.addEventListener("change", filterCountries);