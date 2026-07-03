const countryName = localStorage.getItem("selectedCountry");

// ----------------------
// Dark Mode
// ----------------------
const darkBtn = document.querySelector(".dark-btn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

// ----------------------
// Back Button
// ----------------------
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

// ----------------------
// Load Country Details
// ----------------------
fetch("data.json")
    .then(response => response.json())
    .then(data => {

        const country = data.find(item => item.name === countryName);

        if (!country) {
            alert("Country not found");
            return;
        }

        // Flag
        document.getElementById("flag").src = country.flags.png;
        document.getElementById("flag").alt = country.name;

        // Basic Details
        document.getElementById("name").textContent = country.name;
        document.getElementById("nativeName").textContent = country.nativeName;
        document.getElementById("population").textContent = country.population.toLocaleString();
        document.getElementById("region").textContent = country.region;
        document.getElementById("subRegion").textContent = country.subregion;
        document.getElementById("capital").textContent = country.capital;

        // Domain
        document.getElementById("domain").textContent =
            country.topLevelDomain.join(", ");

        // Currency
        document.getElementById("currency").textContent =
            country.currencies
                ? country.currencies.map(c => c.name).join(", ")
                : "N/A";

        // Languages
        document.getElementById("language").textContent =
            country.languages
                ? country.languages.map(l => l.name).join(", ")
                : "N/A";

        // Border Countries
        const borders = document.getElementById("borders");
        borders.innerHTML = "";

        if (country.borders && country.borders.length > 0) {

            country.borders.forEach(code => {

                const borderCountry = data.find(c => c.alpha3Code === code);

                if (borderCountry) {

                    const btn = document.createElement("button");

                    btn.className = "btn btn-light shadow-sm me-2 mb-2";

                    btn.textContent = borderCountry.name;

                    btn.addEventListener("click", () => {

                        localStorage.setItem(
                            "selectedCountry",
                            borderCountry.name
                        );

                        location.reload();

                    });

                    borders.appendChild(btn);

                }

            });

        } else {

            borders.textContent = "No Border Countries";

        }

    })
    .catch(error => console.log(error));