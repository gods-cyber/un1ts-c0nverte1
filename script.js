document.addEventListener("DOMContentLoaded", () => {
  const unitTypeSelect = document.getElementById("unit-type");
  const inputValue = document.getElementById("input-value");
  const fromUnitSelect = document.getElementById("from-unit");
  const toUnitSelect = document.getElementById("to-unit");
  const resultDisplay = document.getElementById("result");
  const themeToggle = document.getElementById("theme-toggle");
  const historyList = document.getElementById("history"); // 👈 NEW

  const units = {
    length: ['millimeter', 'centimeter', 'meter', 'kilometer', 'foot', 'mile'],
    weight: ['gram', 'kilogram', 'pound', 'ounce'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  };

  function populateUnits(type) {
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";
    units[type].forEach(unit => {
      fromUnitSelect.add(new Option(unit, unit));
      toUnitSelect.add(new Option(unit, unit));
    });
  }

  function addToHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li); // 👈 Adds newest entry on top
  }

  function convert() {
    const type = unitTypeSelect.value;
    const value = parseFloat(inputValue.value);
    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;

    if (isNaN(value)) {
      resultDisplay.textContent = "";
      return;
    }

    let result = value;

    if (type === "length") {
      const toMeters = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        foot: 0.3048,
        mile: 1609.34
      };
      result = value * toMeters[from] / toMeters[to];
    }

    else if (type === "weight") {
      const toGrams = {
        gram: 1,
        kilogram: 1000,
        pound: 453.592,
        ounce: 28.3495
      };
      result = value * toGrams[from] / toGrams[to];
    }

    else if (type === "temperature") {
      if (from === to) {
        result = value;
      } else {
        let celsius;
        if (from === "celsius") celsius = value;
        else if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
        else if (from === "kelvin") celsius = value - 273.15;

        if (to === "celsius") result = celsius;
        else if (to === "fahrenheit") result = (celsius * 9 / 5) + 32;
        else if (to === "kelvin") result = celsius + 273.15;
      }
    }

    const formattedResult = result.toFixed(2);
    const resultText = `Result: ${formattedResult} ${to}`;
    resultDisplay.textContent = resultText;

    // ✅ Add to history
    const historyEntry = `${value} ${from} → ${formattedResult} ${to}`;
    addToHistory(historyEntry);
  }
  
  // Initialize
  populateUnits(unitTypeSelect.value);
  convert();

  // Live conversion
  unitTypeSelect.addEventListener("change", () => {
    populateUnits(unitTypeSelect.value);
    convert();
  });
  inputValue.addEventListener("input", convert);
  fromUnitSelect.addEventListener("change", convert);
  toUnitSelect.addEventListener("change", convert);

  // Dark mode toggle
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
});
function clearFields() {
  document.getElementById("input-value").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("clear-history").addEventListener("click", () => {
  historyList.innerHTML = ""; // Clears all history items
});
}


