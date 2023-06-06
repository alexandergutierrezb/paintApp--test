const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const colorsContainer = document.querySelector(".colors");
const undoBtn = document.querySelector("#canvas__undo");
const clearBtn = document.querySelector("#canvas__clear");

const loginBtn = document.querySelector("#login__btn--login");
const loginLink = document.querySelector("#login__link");
const loginImg = document.querySelector("#login__img");
const loginPage = document.querySelector("#loginPage");
const loginMsg = document.querySelector("#login__msg");
const logoutMsg = document.querySelector("#login__logoutMsg");

const signUpLink = document.querySelector("#signUp__link");
const signUpBtn = document.querySelector("#login__btn--signUp");

const paintingPage = document.querySelector("#paintingPage");
const welcomeMsg = document.querySelector("#welcomeMsg");
const userType = document.querySelector("#userType");
const signOutBtn = document.querySelector("#canvas__signOut");

// inputs
usernameInput = document.querySelector("#username");
passwordInput = document.querySelector("#password");

// stored canvas paths
const activePaths = [];
let pathIndex = -1;

const users = [
  {
    username: "AlexanderGutierrez",
    password: "a1",
    type: "admin",
  },
  {
    username: "johan",
    password: "johan1",
    type: "user",
  },
  {
    username: "matias",
    password: "matias1",
    type: "user",
  },
];

/////// outsourced functions

const resetLoginInput = function () {
  usernameInput.value = "";
  passwordInput.value = "";
};

const endPath = function () {
  is_drawing = false;
  context.closePath();
  activePaths.push(context.getImageData(0, 0, canvas.width, canvas.height));
  pathIndex++;
};

const clearCanvas = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const undoPath = function () {
  if (!activePaths.length >= 0) clearCanvas();
  console.log(activePaths);
  activePaths.pop();
  pathIndex--;
  context.putImageData(activePaths[pathIndex], 0, 0);
};

const loginForm = function () {
  usernameInput.placeholder = "username";
  passwordInput.placeholder = "password";
  loginImg.classList.remove("hidden");

  loginBtn.classList.remove("hidden");
  signUpBtn.classList.add("hidden");

  loginMsg.textContent = "dont have an account?";

  loginLink.classList.add("hidden");
  signUpLink.classList.remove("hidden");

  resetLoginInput();
};

const signUpForm = function () {
  usernameInput.placeholder = "new username";
  passwordInput.placeholder = "new password";
  loginImg.classList.add("hidden");

  //   loginBtn.textContent = "sign up";
  loginBtn.classList.add("hidden");
  signUpBtn.classList.remove("hidden");

  loginMsg.textContent = "already have an account?";

  loginLink.classList.remove("hidden");
  signUpLink.classList.add("hidden");

  resetLoginInput();
};

const signOut = function () {
  paintingPage.classList.add("hidden");
  loginPage.classList.remove("hidden");

  // logout msg
  logoutMsg.classList.remove("hidden");
  usernameInput.addEventListener("input", (e) =>
    logoutMsg.classList.add("hidden")
  );
  passwordInput.addEventListener("input", (e) =>
    logoutMsg.classList.add("hidden")
  );
};

const createUser = function () {
  users.push({ username: usernameInput.value, password: passwordInput.value });
  loginForm();
  console.log(users);
};

// login
loginLink.addEventListener("click", loginForm);
signUpLink.addEventListener("click", signUpForm);
// signup
signUpBtn.addEventListener("click", createUser);

// auth
let currentAccount;
loginBtn.addEventListener("click", function () {
  currentAccount = users.find((acc) => acc.username === usernameInput.value);
  if (currentAccount?.password === passwordInput.value) {
    // display painting page
    loginPage.classList.add("hidden");
    paintingPage.classList.remove("hidden");
    // welcome message
    welcomeMsg.textContent = currentAccount.username;
    userType.textContent = currentAccount.type;
  }
  resetLoginInput();
});

// sign out
signOutBtn.addEventListener("click", signOut);

////////// define and display canvas
canvas.width = window.innerWidth;
canvas.height = 800;
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

// start listening to events
let is_drawing = false;
let colorPencil = "black";

///// change colors
colorsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("colors__color")) {
    colorPencil = e.target.dataset.color;
    console.log(e);
  }
});

canvas.addEventListener("mousedown", function (e) {
  is_drawing = true;
  context.beginPath();
  console.log(e);
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});
canvas.addEventListener("mousemove", function (e) {
  if (!is_drawing) return;
  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.lineWidth = "2";
  context.strokeStyle = colorPencil;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();
});

canvas.addEventListener("mouseup", endPath);
canvas.addEventListener("mouseout", endPath);

// clear canvas
clearBtn.addEventListener("click", function () {
  clearCanvas();
  activePaths = [];
  pathIndex = -1;
});
undoBtn.addEventListener("click", undoPath); // undo path
