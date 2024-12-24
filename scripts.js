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
    if (currentInput === "" && operation) {
      // Start a new input after an operation is chosen
      display.textContent = `${previousInput} ${operation} `;
    } 

    currentInput += button.dataset.value;
    display.textContent = currentInput;
  });
});

// Handle operation buttons
document.querySelectorAll(".operation").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput) {
      if (!previousInput) {
        // Store the current input as the first operand
        previousInput = currentInput;
      } else if (operation) {
        // If there's already an operation, perform it immediately
        const result = eval(`${previousInput} ${operation} ${currentInput}`);
        previousInput = result; // Update the first operand to the result
        display.textContent = result;
        history.push(
          `${previousInput} ${operation} ${currentInput} = ${result}`
        );
        updateHistoryUI();
      }

      // Update the operation and clear currentInput for the next number
      operation = button.dataset.value; // Set the new operation
      display.textContent = `${previousInput} ${operation} `; // Show current expression
      currentInput = "";
    } else if (previousInput) {
      // If there's no current input but previous input exists, update the operation
      operation = button.dataset.value;
      display.textContent = `${previousInput} ${operation} `;
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

    currentInput = result.toString();
    previousInput = "";
    operation = null;
  }
});

// Handle clear button
document.getElementById("clear").addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operation = null;
  display.textContent = "0";
});

// Handle history button
historyBtn.addEventListener("click", () => {
  historySection.style.display =
    historySection.style.display === "none" ? "block" : "none";
});

// Update history UI
function updateHistoryUI() {
  historyList.innerHTML = ""; // Clear the current history
  history.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    historyList.appendChild(listItem);
  });
}
