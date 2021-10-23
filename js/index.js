"use strict";

import cpfValidator from './cpf-validator.js';
import emailValidator from './email-validator.js';

var apiLink = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
var apiResults = [];
var amountToShow;

/*
Fetch data from API and split in two vars, one for the new link and the other for the product's data.
*/
const loadApi = async () => {
  try {
    if(apiResults.length === 0) {
      const response = await fetch(apiLink, {method: "GET"});
      const data = await response.json();
      apiResults = data.products;
      var newLink = data.nextPage;
      apiLink = "https://" + newLink;
      amountToShow = apiResults.length;
      if(isMobile) {
        amountToShow = amountToShow/2;
      }
    }
    showData();
  } catch (error) {
    console.error(error);
  }
};

/*
Iterates through the products array and for each object inside, creates a list item. 
Then show all items inside an unordered list.
*/
const showData = () => {
  let output = "";
  var i = 1;
  while (i <= amountToShow) {
    output += `<li class="showcase__item">
    <div class="showcase__item--image">
    <img src="${apiResults[0].image}" alt="Product">
    </div>
    <div class="showcase__item--infos">
    <span class="showcase__item--product-name">${apiResults[0].name}</span>
    <p class="showcase__item--description">${apiResults[0].description}</p>
    <span class="showcase__item--old-price">De: R$${apiResults[0].oldPrice}</span>
    <span class="showcase__item--new-price">Por: R$${apiResults[0].price}</span>
    <span class="showcase__item--installment-price">ou ${apiResults[0].installments.count}x de R$${apiResults[0].installments.value}</span>
    <button>Comprar</button>
    </div>
    </li>`;
    apiResults.shift();
    i++;
  };
  document.querySelector(".showcase__list").innerHTML += output;
};


/*
Recieves the input target and the result of the correct validation function.
Then, if !isValid, changes the bg and border of the input to red and return false.
Case isValid, return the colors to default and return true;
*/
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

/*
Add a blur listener to all form inputs on document load.
*/

const addInputEvents = () => {
  var inputFields = document.querySelectorAll('.form-inputs');
  inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", (event) => {
      validateInputField(event.target);
    });
  });
}

/*
Receives the input target, and for each input type, do the correct validation.
*/
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

/*
FOR SUBSCRIPTION INPUT
Prevents form submition if one or more inputs are invalid.
Uses the validation function to check the inputs validity.
*/
document.querySelector(".main-infos__form button").addEventListener("click", (event) => {
  var nameInputIsValid = validateInputField(document.querySelector("#your-name"));
  var cpfInputIsValid = validateInputField(document.querySelector("#your-cpf"));
  var emailInputIsValid = validateInputField(document.querySelector("#your-email"));
  if (!nameInputIsValid || !cpfInputIsValid || !emailInputIsValid) {
    event.preventDefault();
  }
});

/*
FOR SHARE INPUT
Prevents form submition if one or more inputs are invalid.
Uses the validation function to check the inputs validity.
*/
document.querySelector(".share__form button").addEventListener("click", (event) => {
  var nameInputIsValid = validateInputField(document.querySelector("#friend-name"));
  var emailInputIsValid = validateInputField(document.querySelector("#friend-email"));
  if (!nameInputIsValid || !emailInputIsValid) {
    event.preventDefault();
  }
});