const display = document.getElementById("display");
const historyBtn = document.getElementById("history-btn");
const historyList = document.getElementById("history-list");
const historySection = document.getElementById("history");

let currentInput = "";
let previousInput = "";
let operation = null;
let history = []; // Array to store history

// Handle number buttons
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    currentInput += button.dataset.value;
    display.textContent = currentInput;
  });
});

// Handle operation buttons
document.querySelectorAll(".operation").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput) {
      previousInput = currentInput;
      operation = button.dataset.value;
      currentInput = "";
    }
  });
});

// Handle equals button
document.getElementById("equals").addEventListener("click", () => {
  if (previousInput && currentInput && operation) {
    const result = eval(`${previousInput} ${operation} ${currentInput}`);
    display.textContent = result;

    // Add operation to history
    history.push(`${previousInput} ${operation} ${currentInput} = ${result}`);
    updateHistoryUI();

    currentInput = result;
    previousInput = "";
    operation = null;
  }
});

// Handle clear button
document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operation = null;
    display.textContent = '0';
});

// Handle history button
historyBtn.addEventListener('click', () => {
    historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
});

// Update history UI
function updateHistoryUI() {
    historyList.innerHTML = ''; // Clear the current history
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}
