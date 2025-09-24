function searchNotFound() {
  const resultsBlock = document.querySelector(".search-rep");
  resultsBlock.innerHTML = `
    <img id="img-search" src="/frontend/images/notfound.png" alt="train logo"/>
    <br>
    <p>No trip found.</p>
  `;
}

function tripFound() {
  const departureInput = document.getElementById("departure").value.trim();
  const arrivalInput = document.getElementById("arrival").value.trim();
  const dateInput = document.getElementById("date").value;

  if (!departureInput || !arrivalInput) {
    searchNotFound();
    return;
  }

  const resultsBlock = document.querySelector(".search-rep");

  let url = `http://localhost:3000/trips?departure=${departureInput}&arrival=${arrivalInput}`;
  if (dateInput) url += `&date=${dateInput}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        searchNotFound();
        return;
      }

      const resultsHTML = data
        .map((city) => {
          const time = new Date(city.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `
            <div class="trip-result">
              <p>${city.departure} > ${city.arrival} | ${time} | ${city.price}€</p>
              <button class="btn-book" data-id="${city._id}">Book</button>
            </div>
          `;
        })
        .join("");

      resultsBlock.innerHTML = resultsHTML;

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

document.getElementById("btn-search").addEventListener("click", tripFound);
