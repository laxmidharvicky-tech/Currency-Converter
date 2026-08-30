

const Amount = document.querySelector("#amount");
const Fromcurrency = document.querySelector("#fromcurrency");
const Tocurrency = document.querySelector("#tocurrency");
const Swapbtn = document.querySelector("#swapBtn");
const Convertbtn = document.querySelector("#convertBtn");

const Resultbox = document.querySelector("#resultBox");
const Result = document.querySelector("#result");
const Rate = document.querySelector("#rate");

const API_KEY = "b24aa21b1d777c7e08154b0e";


// ===============================
// CONVERT CURRENCY
// ===============================

Convertbtn.addEventListener("click", async () => {

    const amount = Number(Amount.value);
    const from = Fromcurrency.value;
    const to = Tocurrency.value;

    // Check amount
    if (!amount || amount <= 0) {
        alert("Enter an amount");
        return;
    }

    try {

        const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;

        const response = await fetch(URL);

        const data = await response.json();

        // Check API response
        if (data.result !== "success") {
            throw new Error(data["error-type"]);
        }

        // Get exchange rate
        const exchangerate = data.conversion_rates[to];

        // Calculate converted amount
        const convertedamount = amount * exchangerate;

        // Display exchange rate
        Rate.textContent =
            `1 ${from} = ${exchangerate.toFixed(4)} ${to}`;

        // Display converted amount
        Result.textContent =
            `${convertedamount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })} ${to}`;

        // Show result box
        Resultbox.classList.remove("hidden");

    } catch (error) {

        console.error("Conversion error:", error);

        alert("Unable to convert. Please check your API key or internet connection.");

    }

});


// ===============================
// ENTER KEY
// ===============================

Amount.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        Convertbtn.click();
    }

});


// ===============================
// SWAP CURRENCIES
// ===============================

Swapbtn.addEventListener("click", () => {

    const temporary = Fromcurrency.value;

    Fromcurrency.value = Tocurrency.value;

    Tocurrency.value = temporary;

});
// ====================================
// DARK MODE
// ===================================
const Themetoogle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    Themetoogle.textContent = "☀️ light mode";
}
Themetoogle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    if (isDark) {
        localStorage.setItem("theme", "dark");
        Themetoogle.textContent = "☀️ light mode";
    } else {
        localStorage.setItem("theme", "light");
        Themetoogle.textContent = "🌑 dark mode";
    }
});