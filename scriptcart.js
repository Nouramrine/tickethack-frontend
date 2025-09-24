// Sélectionner tous les boutons "remove"
const removeButtons = document.querySelectorAll('.remove-btn');
// Sélectionner le conteneur du panier
const cartBox = document.querySelector('.cart-box');
// Sélectionner le span du total
const totalSpan = document.querySelector('.cart-footer span');
// Sélectionner le footer
const cartFooter = document.querySelector('.cart-footer');
// Sélectionner le bloc empty
const emptyCart = document.getElementById('cart-empty');

   if (cartItems.length === 0) {
        cartFooter.style.display = "none";
        emptyCart.style.display = "block";
    } else {
        cartFooter.style.display = "flex";
        emptyCart.style.display = "none";
	let total = 0;
  let itemsHTML = "";

  cartItems.forEach((item, index) => {
    total += item.price;
    itemsHTML += `
      <div class="cart-item" data-index="${index}">
        <span>${item.from} &gt; ${item.to}</span>
        <span>${item.time}</span>
        <span>${item.price}€</span>
        <button class="remove-btn">X</button>
      </div>
    `;
  });

  cartBox.innerHTML = `
    <h3>My cart</h3>
    ${itemsHTML}
    <div class="cart-footer">
      <span>Total : <span id="total">${total}€</span></span>
      <button class="purchase-btn">Purchase</button>
    </div>
  `;


// Gestion suppression
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      item.remove();
      updateTotal();
    });
  });

  // Gestion achat
  const purchaseButton = document.querySelector(".purchase-btn");
  purchaseButton.addEventListener("click", () => {
    alert("Merci pour votre achat !");
  });
}

// Fonction recalcul du total
function updateTotal() {
  const items = document.querySelectorAll(".cart-item");
  let total = 0;
  items.forEach(item => {
    const priceText = item.children[2].textContent.replace("€", "");
    total += parseFloat(priceText);
  });
  document.getElementById("total").textContent = total + "€";

  // Si plus d'articles → afficher message vide
  if (items.length === 0) {
    cartBox.innerHTML = `
      <div id="cart-empty">
        <p>No tickets in your cart.</p>
        <p>Why not plan a trip?</p>
      </div>
    `;
  }
}