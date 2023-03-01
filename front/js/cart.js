const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");
const totalQuantityElement = document.getElementById('totalQuantity')
const totalPriceElement = document.getElementById('totalPrice')

const host = "http://localhost:3000/api";

let panier = JSON.parse(localStorage.getItem("panier")) 
  panier.forEach(articlePanier => {
    
    let objectURL = host + "/products/" + articlePanier.id;
    console.log(objectURL);
      
    fetch(objectURL)
    
    .then((response) => response.json())
    .then((article) => {
      console.log(article);
    cartSection.innerHTML += 
    ` 
      <article class="cart__item" data-id="${article._id}" data-color="${articlePanier.color}">
      <div class="cart__item__img">
        <img src="${article.imageUrl}" alt="${article.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${article.name}</h2>
          <p>${articlePanier.color}</p>
          <p>${article.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity"  min="1" max="100" value="${articlePanier.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article>
    `       
    })
    .then(function(){  
    document.querySelectorAll('.itemQuantity').forEach(quantityElement => {
    const articleElement = quantityElement.parentElement.closest('article')
    quantityElement.addEventListener('change',function(event){
      changeQuantity(articleElement.dataset.id,articleElement.dataset.color,event.currentTarget.value)
    })
  })
    document.querySelectorAll('.deleteItem').forEach(deleteElement => {
      const articleElement = deleteElement.parentElement.closest('article')
      deleteElement.addEventListener('click',function(){    
        deleteItem(articleElement.dataset.id,articleElement.dataset.color)
      })
  })
    });
  })

calculTotal()

// ================================= supression de produit ================================= //
const deleteButtons = document.getElementsByClassName("deleteItem");
function deleteItem(id,color){
  let panier = JSON.parse(localStorage.getItem("panier")) 
  articleTrouver = panier.find(articlePanier => articlePanier.id == id && articlePanier.color == color )
  console.log(articleTrouver)
  index = panier.indexOf(articleTrouver)
  panier.splice(index,1)
  console.log(panier)
  localStorage.setItem('panier',JSON.stringify(panier))
  alert("Ce produit à bien été supprimé du panier");
  location.reload();
}

// ================================= Quantity ================================= //
function changeQuantity(id,color,quantity){
  let panier = JSON.parse(localStorage.getItem("panier")) 
  articleTrouver = panier.find(articlePanier => articlePanier.id == id && articlePanier.color == color )
  console.log(articleTrouver)
  articleTrouver.quantity = quantity
  index = panier.indexOf(articleTrouver)
  panier[index]= articleTrouver
  console.log(panier)
  localStorage.setItem('panier',JSON.stringify(panier))
  location.reload()
}

// ================================= Total Price  ================================= //
function calculTotal(){
  let totalQuantity = 0
  let totalPrice = 0
  let panier = JSON.parse(localStorage.getItem("panier")) 

  panier.forEach(articlePanier => {
    totalQuantity += parseInt(articlePanier.quantity)
    let objectURL = host + "/products/" + articlePanier.id;
    console.log(objectURL);
      
    fetch(objectURL)
    
    .then((response) => response.json())
    .then((article) => {
      totalPrice += parseInt(article.price)
      totalPriceElement.innerText = totalPrice*parseInt(articlePanier.quantity)
    })
  })

  totalQuantityElement.innerText = totalQuantity

}

// ================================= Form information ================================= //

const prenomElement = document.getElementById("firstName");
const nomElement = document.getElementById("lastName");
const adresseElement = document.getElementById("address");
const villeElement = document.getElementById("city");
const mailElement = document.getElementById("email");

// Regular Expressions //
const regexName = /^[a-z][a-z '-.,]{1,31}$/i;
const regexAdress =/^[A-Za-z0-9'\.\-\s\,]{5,}$/i;
const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// first name //
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    firstNameErrorMsg.innerText = "Veuillez saisir un prénom valide"
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

// last name //
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    lastNameErrorMsg.innerText = 'Veuillez saisir un nom valide';
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

// adress //
const addressErrorMsg = document.getElementById("addressErrorMsg")
function validateAddress(adresse) {
  if (regexAdress.test(adresse) == false) {
    addressErrorMsg.innerHTML = 'Veuillez saisir une adresse valide  Exemple: <i>10 rue de Paris</i>';
      return false;
  } else {
    addressErrorMsg.innerHTML = null;
      return true;
  }
}

// city //
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    cityErrorMsg.innerHTML = 'Veuillez saisir une ville valide';
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}

// mail //
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  if (regexMail.test(mail) == false) {
    emailErrorMsg.innerHTML = 'Veuillez saisir un E-mail valide';
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}

// ================================= Form ================================= // 
function makeJsonData() {
  let contact = {
    firstName: prenomElement.value,
    lastName: nomElement.value,
    address: adresseElement.value,
    city: villeElement.value,
    email: mailElement.value,
  };

  let items = JSON.parse(localStorage.getItem('panier'));
  let products = [];

  for (i = 0; i < items.length; i++) {
    if (products.find((e) => e == items[i]['id'])) {
      console.log("not found");
    } else {
      products.push(items[i]['id']);
    }
  }

  let jsonData = JSON.stringify({ contact:contact, products:products });
  return jsonData;
}


// ================================= Valiton of the order ================================= //
const orderElement = document.getElementById("order")
orderElement.addEventListener("click", (e) => {
  e.preventDefault()

  firstNameOk = validateFirstName(prenomElement.value)
  lastNameOk  = validateLastName(nomElement.value)
  addressOk   = validateAddress(adresseElement.value)
  // addressOk = true
  cityOk      = validateCity(villeElement.value)
  mailOk      = validateEmail(mailElement.value)

  if (firstNameOk && lastNameOk && addressOk && cityOk && mailOk){
    fetch(host +"/products/order",{method:'POST',headers:{'Content-Type':'application/json'},body:makeJsonData()} )
      .then((response) => response.json())
      //clear
      .then((order) => {
        let confirmationUrl = "./confirmation.html?id=" + order.orderId;
        console.log(order)
        window.location.href = confirmationUrl;
      })
      // error
      .catch(() => {
        alert("Une erreur est survenue, merci de revenir plus tard.");
      }); 
  }  
})

