"use strict";

import cpfValidator from './cpf-validator.js';
import emailValidator from './email-validator.js';


var apiLink =
"https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

const loadApi = () => {
  var xhttp = new XMLHttpRequest();
  var response;
  xhttp.onreadystatechange = () => {
    console.log(xhttp.readyState);
    if (xhttp.readyState == 4) {
      // console.log(xhttp.response);
      response = JSON.parse(xhttp.response);
      var apiResults = response.products;
      var newLink = response.nextPage;
      console.log(apiResults);
      console.log(newLink);
      apiLink = "https://" + newLink;
      showData(apiResults);
    }
  };
  xhttp.open("GET", apiLink, true);
  xhttp.send();
};

const showData = (apiData) => {
  let output = "";
  
  for (let data of apiData) {
    console.log(data.name);
    output += `<li class="showcase__item">
    <div class="showcase__item--image">
    <img src="${data.image}" alt="">
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
  var bordColor = "#707070";
  var bgColor = "white";
  if(!isValid) {
    bordColor = "red";
    bgColor = "#ffe0e0";
  }
  target.style.borderColor = bordColor;
  target.style.backgroundColor = bgColor;
}

const validateCpf = (target) => {
  chageInputColor(target, cpfValidator(target.value));
}

const validateEmail = (target) => {
  chageInputColor(target, emailValidator(target.value));
}

const validateName = (target) => {
  chageInputColor(target, target.value.length >= 3);
}

document.addEventListener('DOMContentLoaded', () => {
  loadApi();
})

document.querySelector('.showcase__button').addEventListener('click', () => {
  loadApi();
})

document.querySelector("#your-name").addEventListener('blur', (event) => {
  validateName(event.target);
});

document.querySelector("#your-cpf").addEventListener('blur', (event) => {
  validateCpf(event.target);
});

document.querySelector("#your-email").addEventListener('blur', (event) => {
  validateEmail(event.target);
});

document.querySelector("#friend-name").addEventListener("blur", (event) => {
  validateName(event.target);
});

document.querySelector("#friend-email").addEventListener('blur', (event) => {
  validateEmail(event.target);
});

document.querySelector(".main-infos__form button").addEventListener("click", () => {
  var nameInput = document.querySelector("#your-name");
  var cpfInput = document.querySelector("#your-cpf");
  var emailInput = document.querySelector("#your-email");
  validateName(nameInput);
  validateCpf(cpfInput);
  validateEmail(emailInput);
});

document.querySelector(".share__form button").addEventListener("click", () => {
  var nameInput = document.querySelector("#friend-name");
  var emailInput = document.querySelector("#friend-email");
  validateName(nameInput);
  validateEmail(emailInput);
});