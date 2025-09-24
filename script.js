function searchnotfound() {
    document.querySelector(".search-rep").remove();
    document.querySelector(".main-middle").innerHTML += `
    <div class="search-rep">
        <img id="img-search" src="/frontend/images/notfound.png" alt="train logo"/>
        <br>
        <p>No trip found.</p>
    </div>`;
};

function tripfound() {
    const departure = document.querySelector("#departure");
    const arrival = document.querySelector("#arrival");

    document.querySelector(".search-rep").remove();
    fetch("http://localhost:3000/trips/:departure")
    .then(res => res.json)
    .then(data => {

        for (let city of data) {
            if (departure === city.departure && arrival === city.arrival) {
                document.querySelector(".main-middle").innerHTML += `
                <div class="search-rep">
                    <div id="trips">
                        <p>${city.departure} > ${city.arrival}  ${city.date}    ${city.price}</p>
                        <button id="btn-book" type="button">Book</button>
                    </div>
                </div>`
            } else {
                document.querySelector(".main-middle").innerHTML += `
                <div class="search-rep">
                    <img id="img-search" src="/frontend/images/notfound.png" alt="train logo"/>
                    <br>
                    <p>No trip found.</p>
                </div>`;
            };
        };
    });
};

document.querySelector("#btn-search").addEventListener("click", function() {
    tripfound();
});