const id = new URL(window.location).searchParams.get("id");
const host = "http://localhost:3000/api/products";
const objectURL = host + "/" + id;
console.log(objectURL);

fetch(objectURL)
.then((response) => response.json())

// ================ display features on products pages ================ //
.then((article) => {
  console.log(article);

  // img
  let imgElement = document.querySelector(".item__img");
  imgElement.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;

  // title
  let titleElement = document.getElementById("title");
  titleElement.innerHTML = article.name;

  // price
  let priceElement = document.getElementById("price");
  priceElement.innerHTML = `${article.price}`; 

  // description
  let descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = article.description;

  // colors
  let colorElement = document.getElementById("colors");
  article.colors.forEach(color=>{
    colorElement.innerHTML += `<option value="${color}">${color}</option>`;
  })
});

// ================ transfer features on products pages to cart pages ================ //

// Quantity //
function quantityValue() {
  let quantity = document.getElementById("quantity");
  if (quantity.value <1 || quantity.value >100){
    alert("quantité invalide")
    quantity.value = 0
  }
  return quantity.value;
}

// Color //
function colorValue() {
  let color = document.getElementById("colors");
  if (document.querySelector("#colors").value == "") {
    alert("Veuillez sélectionnez une couleur");}
  return color.value;
}

// Button cart //
const addToCartButton = document.getElementById("addToCart");
function addToTheCart(id, color, quantity){
  let panier = JSON.parse(localStorage.getItem("panier")) 
  if (panier ==null){
    panier = []
  }
  articleTrouver = panier.find(articlePanier => articlePanier.id == id && articlePanier.color == color )

  if (articleTrouver == undefined){
    panier.push({id:id,color:color,quantity:quantity})  
  }else{
    articleTrouver.quantity = parseInt(quantity)+parseInt(articleTrouver.quantity)
    index = panier.indexOf(articleTrouver)
    panier[index]= articleTrouver
  }
  localStorage.setItem("panier", JSON.stringify(panier))
}

// Transfer to cart //
addToCartButton.addEventListener("click", () => {
  let quantity = parseInt(quantityValue());
  if (quantity > 0){
    let color = colorValue();
    addToTheCart(id, color, quantity);
    window.location.href = "cart.html";
  }
});




