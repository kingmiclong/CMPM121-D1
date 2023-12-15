import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Your Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1
const button = document.createElement("button");
button.innerHTML = "Launch 🚀";
app.append(button);

// Step 2
const counterDiv = document.createElement("div");
let counter: number = 0;
let growthRate: number = 0;
counterDiv.innerHTML = `${counter.toFixed(2)} space credits`;
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
  counter++;
  counterDiv.innerHTML = `${counter} space credits`;

  requestAnimationFrame(() => {
    button.style.opacity = "1";
  });
});

upgradeButton.addEventListener("click", () => {
  counter -= 10; // Deduct 10 units from the counter
  growthRate++; // Increment the growth rate by 1
  counterDiv.innerHTML = `${counter.toFixed(2)} rockets`; // Update display
});

// Upgrades
const upgradeDiv = document.createElement("div");
upgradeDiv.className = "upgrades";
app.append(upgradeDiv);

// Item A
let itemACount: number = 0;
let itemACost: number = 10;
const itemAGrowthRate: number = 0.1;
const itemAButton = document.createElement("button");
itemAButton.innerHTML = `Buy Satellite (${itemACost})`;
upgradeDiv.append(itemAButton);

// Item B
let itemBCount: number = 0;
let itemBCost: number = 100;
const itemBGrowthRate: number = 2.0;
const itemBButton = document.createElement("button");
itemBButton.innerHTML = `Buy Space Station (${itemBCost})`;
upgradeDiv.append(itemBButton);

// Item C
let itemCCount: number = 0;
let itemCCost: number = 1000;
const itemCGrowthRate: number = 50.0;
const itemCButton = document.createElement("button");
itemCButton.innerHTML = `Buy Moon Base (${itemCCost})`;
upgradeDiv.append(itemCButton);

// Status displays
const statusDiv = document.createElement("div");
statusDiv.className = "status";
app.append(statusDiv);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} units/sec`;
statusDiv.append(growthRateDisplay);

const itemACountDisplay = document.createElement("div");
itemACountDisplay.innerHTML = `Item A: ${itemACount}`;
statusDiv.append(itemACountDisplay);

const itemBCountDisplay = document.createElement("div");
itemBCountDisplay.innerHTML = `Item B: ${itemBCount}`;
statusDiv.append(itemBCountDisplay);

const itemCCountDisplay = document.createElement("div");
itemCCountDisplay.innerHTML = `Item C: ${itemCCount}`;
statusDiv.append(itemCCountDisplay);

// Update function to handle growth and display
const update = () => {
  counter += growthRate;
  counterDiv.innerHTML = `${counter.toFixed(2)} units`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(
    2,
  )} units/sec`;
  itemACountDisplay.innerHTML = `Item A: ${itemACount}`;
  itemBCountDisplay.innerHTML = `Item B: ${itemBCount}`;
  itemCCountDisplay.innerHTML = `Item C: ${itemCCount}`;
};

// Main update loop
setInterval(update, 1000);

// Button click handlers
itemAButton.addEventListener("click", () => {
  if (counter >= itemACost) {
    counter -= itemACost;
    itemACount++;
    growthRate += itemAGrowthRate;
  }
});

itemBButton.addEventListener("click", () => {
  if (counter >= itemBCost) {
    counter -= itemBCost;
    itemBCount++;
    growthRate += itemBGrowthRate;
  }
});

itemCButton.addEventListener("click", () => {
  if (counter >= itemCCost) {
    counter -= itemCCost;
    itemCCount++;
    growthRate += itemCGrowthRate;
  }
});

// Update function for automatic price increase
const updatePrice = (currentPrice: number): number => {
  return currentPrice * 1.15;
};

// Update button labels
const updateButtonLabels = () => {
  itemAButton.innerHTML = `Buy A (${itemACost.toFixed(2)})`;
  itemBButton.innerHTML = `Buy B (${itemBCost.toFixed(2)})`;
  itemCButton.innerHTML = `Buy C (${itemCCost.toFixed(2)})`;
};

// Update button labels initially
updateButtonLabels();

// Modify button click handlers to include price increase
itemAButton.addEventListener("click", () => {
  if (counter >= itemACost) {
    counter -= itemACost;
    itemACount++;
    growthRate += itemAGrowthRate;
    itemACost = updatePrice(itemACost);
    updateButtonLabels();
  }
});

itemBButton.addEventListener("click", () => {
  if (counter >= itemBCost) {
    counter -= itemBCost;
    itemBCount++;
    growthRate += itemBGrowthRate;
    itemBCost = updatePrice(itemBCost);
    updateButtonLabels();
  }
});

itemCButton.addEventListener("click", () => {
  if (counter >= itemCCost) {
    counter -= itemCCost;
    itemCCount++;
    growthRate += itemCGrowthRate;
    itemCCost = updatePrice(itemCCost);
    updateButtonLabels();
  }
});
