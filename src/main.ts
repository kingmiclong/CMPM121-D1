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
let counter: number = 0; // Initialize counter
counterDiv.innerHTML = `${counter} rockets`; // Display initial counter value
app.append(counterDiv);

// Step 4
let lastTime: number = 0; // Time from last frame

// counter for auto click
const updateCounter = (time: number) => {
  const deltaTime = time - lastTime; // Time elapsed since last frame in milliseconds
  const increment = deltaTime * 0.001; // Calculate fractional increment based on time elapsed
  counter += increment; // Increment counter
  counterDiv.innerHTML = `${counter.toFixed(2)} rockets`; // Update display with two decimal places
  lastTime = time; // Update lastTime for the next frame
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
