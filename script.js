function searchnotfound() {
    document.querySelector(".search-rep").remove();
    document.querySelector(".main-middle").innerHTML += `
    <div class="search-rep">
        <img id="img-search" src="/frontend/images/notfound.png" alt="train logo"/>
        <br>
        <p>No trip found.</p>
    </div>`;
};

document.querySelector("#btn-search").addEventListener("click", function() {
    searchnotfound();
});