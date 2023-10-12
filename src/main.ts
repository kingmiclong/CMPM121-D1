import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Your Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1 
const button = document.createElement("button");
button.innerHTML = "🚀";  
app.append(button);

// Step 2 
const counterDiv = document.createElement("div");
let counter: number = 0;  // Initialize counter
counterDiv.innerHTML = `${counter} rockets`;  // Display initial counter value
app.append(counterDiv);

// Visual respond
button.addEventListener("click", () => {
  button.style.opacity = "0.5";  
  
  // plus 1 each time it click
  counter++;
  counterDiv.innerHTML = `${counter} rockets`;
  
  setTimeout(() => {
    button.style.opacity = "1";
  }, 100);
});
