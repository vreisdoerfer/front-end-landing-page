"use strict";

import cpfValidator from './cpf-validator.js';
import emailValidator from './email-validator.js';


var apiLink =
"https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

const options = {
  method: "GET",
};

const loadApi = async () => {
  try {
    const response = await fetch(apiLink, options);
    const data = await response.json();
    var apiResults = data.products;
    var newLink = data.nextPage;
    showData(apiResults);
  } catch (error) {
    console.error(error);
  }
};

const showData = (apiData) => {
  let output = "";
  
  for (let data of apiData) {
    console.log(data.name);
    output += `<li class="showcase__item">
    <div class="showcase__item--image">
    <img src="${data.image}" alt="Product">
    </div>
    <div class="showcase__item--infos">
    <span class="showcase__item--product-name">${data.name}</span>
    <p class="showcase__item--description">${data.description}</p>
    <span class="showcase__item--old-price">De: R$${data.oldPrice}</span>
    <span class="showcase__item--new-price">Por: R$${data.price}</span>
    <span class="showcase__item--installment-price">ou ${data.installments.count}x de R$${data.installments.value}</span>
    <button>Comprar</button>
    </div>
    </li>`;
  }
  document.querySelector(".showcase__list").innerHTML += output;
};

const chageInputColor = (target, isValid) => {
  var result = true;
  var bordColor = "#707070";
  var bgColor = "white";
  if(!isValid) {
    bordColor = "red";
    bgColor = "#ffe0e0";
    result = false;
  }
  target.style.borderColor = bordColor;
  target.style.backgroundColor = bgColor;
  return result;
}

const addInputEvents = () => {
  var inputFields = document.querySelectorAll('.form-inputs');
  inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", (event) => {
      validateInputField(event.target);
    });
  });
}

const validateInputField = (target) => {
  if(target.type === "email") {
    return chageInputColor(target, emailValidator(target.value));
  } else if(target.id === "friend-name" || target.id === "your-name") {
    return chageInputColor(target, target.value.length >= 3);
  } else if(target.id === "your-cpf") {
    return chageInputColor(target, cpfValidator(target.value));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  addInputEvents();
  loadApi();
})

document.querySelector('.showcase__button').addEventListener('click', () => {
  loadApi();
})

document.querySelector(".main-infos__form button").addEventListener("click", (event) => {
  var nameInputIsValid = validateInputField(document.querySelector("#your-name"));
  var cpfInputIsValid = validateInputField(document.querySelector("#your-cpf"));
  var emailInputIsValid = validateInputField(document.querySelector("#your-email"));
  if (!nameInputIsValid || !cpfInputIsValid || !emailInputIsValid) {
    event.preventDefault();
  }
});

document.querySelector(".share__form button").addEventListener("click", (event) => {
  var nameInputIsValid = validateInputField(document.querySelector("#friend-name"));
  var emailInputIsValid = validateInputField(document.querySelector("#friend-email"));
  if (!nameInputIsValid || !emailInputIsValid) {
    event.preventDefault();
  }
});