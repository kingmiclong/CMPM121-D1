import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string; // Added description field
}

const availableItems: Item[] = [
  {
    name: "Satellite",
    cost: 10,
    rate: 0.1,
    description: "Orbiting tech for minor space credits.",
  },
  {
    name: "Space Station",
    cost: 100,
    rate: 2,
    description: "A hub for galactic trade and growth.",
  },
  {
    name: "Moon Base",
    cost: 1000,
    rate: 50,
    description: "A lunar outpost generating massive credits.",
  },
  // Adding two new items
  {
    name: "Asteroid Mining Rig",
    cost: 5000,
    rate: 200,
    description: "Harvesting rare minerals for high profits.",
  },
  {
    name: "Interstellar Colony",
    cost: 20000,
    rate: 1000,
    description: "Colonizing distant worlds for exponential growth.",
  },
];

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

const itemCounts: { [key: string]: number } = {};
const itemCosts: { [key: string]: number } = {};

// Refactor to item sets
availableItems.forEach((item) => {
  const itemButton = document.createElement("button");
  itemButton.innerHTML = `Buy ${item.name} (${item.cost})`;
  upgradeDiv.append(itemButton);

  itemCounts[item.name] = 0;
  itemCosts[item.name] = item.cost;

  itemButton.addEventListener("click", () => {
    if (counter >= itemCosts[item.name]) {
      counter -= itemCosts[item.name];
      itemCounts[item.name]++;
      growthRate += item.rate;
      itemCosts[item.name] = updatePrice(itemCosts[item.name]);
      updateButtonLabels();
    }
  });
});

// Additional code to display descriptions (optional)
// This can be adjusted based on how you want to present the information in your game
availableItems.forEach((item) => {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "item-description";
  descriptionDiv.innerHTML = `${item.name}: ${item.description}`;
  app.append(descriptionDiv);
});

// Status displays
const statusDiv = document.createElement("div");
statusDiv.className = "status";
app.append(statusDiv);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} units/sec`;
statusDiv.append(growthRateDisplay);

// Status displays for each item
Object.keys(itemCounts).forEach((key) => {
  const countDisplay = document.createElement("div");
  countDisplay.innerHTML = `${key}: ${itemCounts[key]}`;
  statusDiv.append(countDisplay);
});

// Update function to handle growth and display
const update = () => {
  counter += growthRate;
  counterDiv.innerHTML = `${counter.toFixed(2)} space credits`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(
    2,
  )} units/sec`;
  Object.keys(itemCounts).forEach((key) => {
    const countDisplay = statusDiv.querySelector(`div:contains('${key}')`);
    if (countDisplay) {
      countDisplay.innerHTML = `${key}: ${itemCounts[key]}`;
    }
  });
};

// Main update loop
setInterval(update, 1000);

// Refactor growth
const updatePrice = (currentPrice: number): number => {
  return currentPrice * 1.15;
};

// Refactor Button
const updateButtonLabels = () => {
  upgradeDiv.childNodes.forEach((node, index) => {
    if (node instanceof HTMLButtonElement) {
      const item = availableItems[index];
      node.innerHTML = `Buy ${item.name} (${itemCosts[item.name].toFixed(2)})`;
    }
  });
};

updateButtonLabels();
