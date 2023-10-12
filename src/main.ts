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

// Visual respond
button.addEventListener("click", () => {
  button.style.opacity = "0.5";  
  
  
  setTimeout(() => {
    button.style.opacity = "1";
  }, 100);
});
