//This is the screen of your calculator where results and inputs are shown.
const display = document.getElementById("display");
//This is the button to toggle (show/hide) the calculator’s history.
const historyBtn = document.getElementById("history-btn");
//This is the area where the past calculations are displayed as a list.
const historyList = document.getElementById("history-list");
//This is the section containing the history list. It can be hidden or shown.
const historySection = document.getElementById("history");

//This holds the current number being typed (e.g., "123").
let currentInput = "";

//This stores the number that was entered before (e.g., when an operation is chosen, like "5 +").
let previousInput = "";

//This keeps track of the current operation (e.g., "+", "-", "*").

//This keeps track of the current operation (e.g., "+", "-", "*").
let operation = null;

//An array to store past calculations (e.g., ["5 + 3 = 8", "10 * 2 = 20"]).
let history = []; // Array to store history

// Handle number buttons
document.querySelectorAll(".number").forEach((button) => {
  //Each number button has a "click" event attached.
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
        //When an operator is clicked, the current number (currentInput) becomes the first number (previousInput).
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
      display.textContent = `${currentInput} ${operation}`; // Show current expression
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
