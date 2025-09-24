function searchNotFound() {
  const mainMiddle = document.querySelector(".main-middle");
  const oldBlock = document.querySelector(".search-rep");
  if (oldBlock) oldBlock.remove();

  mainMiddle.innerHTML += `
    <div class="search-rep">
        <img id="img-search" src="/frontend/images/notfound.png" alt="train logo"/>
        <br>
        <p>No trip found.</p>
    </div>`;
}

function tripFound() {
  const departureInput = document.getElementById("departure").value.trim();
  const arrivalInput = document.getElementById("arrival").value.trim();
  const dateInput = document.getElementById("date").value;

  const mainMiddle = document.querySelector(".main-middle");
  const oldBlock = document.querySelector(".search-rep");
  if (oldBlock) oldBlock.remove();

  let url = `http://localhost:3000/trips?departure=${departureInput}&arrival=${arrivalInput}`;
  if (dateInput) url += `&date=${dateInput}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const trips = data.filter(
        (city) =>
          city.departure.toLowerCase() === departureInput.toLowerCase() &&
          city.arrival.toLowerCase() === arrivalInput.toLowerCase() &&
          (!dateInput || city.date.slice(0, 10) === dateInput)
      );
      const resultsHTML = trips
        .map((city) => {
          const time = new Date(city.date).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `<div class="trip-result">
            <p>${city.departure} > ${city.arrival} | ${time} | ${city.price}€</p>
            <button class="btn-book" data-id="${city._id}">Book</button>
        </div>`;
        })
        .join("");

      mainMiddle.innerHTML = `<div class="search-rep">${resultsHTML}</div>`;

      document.querySelectorAll(".btn-book").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tripId = btn.dataset.id;
          fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tripId }),
          })
            .then((res) => {
              if (res.ok) window.location.href = "cart.html";
            })
            .catch((err) => console.error(err));
        });
      });
    })
    .catch((err) => {
      console.error(err);
      searchNotFound();
    });
}
