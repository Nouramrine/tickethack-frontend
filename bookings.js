async function leadBooking() {
  try {
    const res = await fetch("/bookings");
    const data = await res.json();

    const container = document.getElementById("bookings-container");
    container.innerHTML = "";

    if (!data.result || data.bookings.length === 0) {
      container.innerHTML = `<div class ="no-booking">
        <p>No booking yet.</p>
        <p>Why not plan a trip?</p>
        </div>`;
      return;
    }
    const bookingsHTML = data.bookings
      .map(
        (b) =>
          `<div class="booking-card">
        <div class="booking-left">${b.departure} > ${b.arrival}</div>
        <div class="booking-time">${b.date}</div>
        <div class="booking-price">${b.price} €</div>
        <div class="booking-right">Departure in ${b.waitingTime}</div>
      </div>`
      )
      .join("");

    const message = `<p class="travel-message">Enjoy your travels with Tickethack!</p>`;
    container.innerHTML = bookingsHTML + message;
  } catch (err) {
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", leadBooking);
