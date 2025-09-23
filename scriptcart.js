// Sélectionner tous les boutons "remove"
const removeButtons = document.querySelectorAll('.remove-btn');
// Sélectionner le conteneur du panier
const cartBox = document.querySelector('.cart-box');
// Sélectionner le span du total
const totalSpan = document.querySelector('.cart-footer span');

// Fonction pour recalculer le total
function updateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const priceText = item.querySelectorAll('span')[2].textContent; // 3ème span = prix
        const price = parseFloat(priceText.replace('€',''));
        total += price;
    });
    totalSpan.textContent = `Total : ${total}€`;
}

// Ajouter l'événement "click" à chaque bouton "remove"
removeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement; // récupérer le cart-item
        item.remove();
        updateTotal(); // recalculer le total après suppression
    });
});

// Ajouter un événement pour le bouton Purchase
const purchaseButton = document.querySelector('.purchase-btn');
purchaseButton.addEventListener('click', () => {
    alert('Merci pour votre achat !');
});
