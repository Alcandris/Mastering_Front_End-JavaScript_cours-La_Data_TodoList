//creer un form pour tapper les todo

//ajoiuter dans le DOM ce qui est tappé dans l'input a la validation (moninput.value)
//supprimer un todo au clic

//Stocker dans le local storage la liste
//Consulter le local storage au lancement de l'application pour rajouter les todos

// Pour stocker :
// window.localStorage.maboite = "Je stock ces données";

// Pour extraire les données stockées :
// let mesDonnees = window.localStorage.maboite

//const
const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector(".list");
let trashs = [];
let idNumber = 0;
let tasks = [];

// console.log(list.lastElementChild.children[0].id);

//Ecoutes
form.addEventListener("submit", addTodo);
list.addEventListener("click", checkDelete);
clear.addEventListener("click", () => {
  list.innerHTML = "";
  storeList();
});

//Fonctions

function storeList() {
  window.localStorage.todoList = list.innerHTML;
}

function getToDo() {
  list.innerHTML = window.localStorage.todoList;
  list.innerHTML += "";
}
getToDo();

if (list.children.length > 0) {
  idNumber = list.lastElementChild.children[0].id;
  idNumber++;
} else {
  idNumber = 0;
}

function addTodo(event) {
  event.preventDefault();
  if (input.value != "") {
    list.innerHTML += `
    <div class="tache">
    <input type="checkbox"  id="${idNumber}">
    <label for="${idNumber}"><i class="fa-regular fa-circle"></i></label>
    <span>${input.value}</span>
    <button class="trash"><i class="fa-solid fa-trash"></i></button>
  </div>
  `;
    idNumber++;
    input.value = "";
    storeList();
  }
}

function checkDelete(e) {
  const span = e.target.parentElement.children[2];
  const label = e.target.parentElement.children[1];

  if (e.target.parentElement.children[0].checked) {
    label.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    span.classList.add("crossed");
    storeList();
  } else if (e.target.parentElement.classList == "tache") {
    label.innerHTML = '<i class="fa-regular fa-circle"></i>';
    span.classList.remove("crossed");
    storeList();
  }

  if (e.target.classList == "trash") {
    e.target.parentElement.classList.add("fall");
    e.target.parentElement.addEventListener("transitionend", () => {
      e.target.parentElement.remove();
    });
  }
  storeList();
}
