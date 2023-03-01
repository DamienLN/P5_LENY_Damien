// ================================= Obtain id ================================= //
const id = new URL(window.location).searchParams.get("id");

// ================================= Obtain the id for the order ================================= //
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

// ================================= Clear the cart ================================= //
localStorage.clear();



