"use strict";
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
    // var li = document.createElement("li");
    // li.appendChild(document.createTextNode(data.name));
    // document.querySelector('.list').appendChild(li);
  }
  //   console.log(output);
  document.querySelector(".showcase__list").innerHTML += output;
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('aa');
    loadApi();
})



document.querySelector('.showcase__button').addEventListener('click', () => {
    loadApi();
})