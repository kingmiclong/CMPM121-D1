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
let counter: number = 0;
let growthRate: number = 0;
counterDiv.innerHTML = `${counter.toFixed(2)} rockets`;
app.append(counterDiv);

// Step 5 Upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Upgrade ⚔";
upgradeButton.disabled = true; // disable first
app.append(upgradeButton);

// Step 4
let lastTime: number = 0; // Time from last frame

// counter for auto click
const updateCounter = (time: number) => {
  const deltaTime = time - lastTime;
  const increment = deltaTime * 0.001 * growthRate;
  counter += increment; // counter
  counterDiv.innerHTML = `${counter.toFixed(2)} rockets`; // initial
  lastTime = time; // check the last frame

  // disable for 10 seconds
  upgradeButton.disabled = counter < 10;

  requestAnimationFrame(updateCounter); // Request the next animation frame
};

// Initialize the animation loop
requestAnimationFrame(updateCounter);

// Visual respond
button.addEventListener("click", () => {
  button.style.opacity = "0.5";
  // plus 1 each time it click
  counter++;
  counterDiv.innerHTML = `${counter} rockets`;

  requestAnimationFrame(() => {
    button.style.opacity = "1";
  });
});

upgradeButton.addEventListener("click", () => {
  counter -= 10; // Deduct 10 units from the counter
  growthRate++; // Increment the growth rate by 1
  counterDiv.innerHTML = `${counter.toFixed(2)} rockets`; // Update display
});
