const ramenAPI = "http://localhost:3000/ramens"
const headers = {
    Accept: "application/json",
    "Content-type": "application/json"
}

const ramenMenu = document.getElementById("ramen-menu")
const ramenDetails = document.getElementById("ramen-detail")

let ramenList = []


fetch(ramenAPI)
    .then(res => res.json())
    .then(json => {
        ramenList = json
        renderRamen()
    })



function renderRamen() {
    ramenMenu.innerHTML = ""
    ramenList.forEach(displayRamen)
}

function displayRamen(ramen) {
    const ramenCard = document.createElement("img")
    ramenCard.src = ramen.image
    ramenMenu.appendChild(ramenCard)
    ramenCard.addEventListener("click", () => { loadRamenInfo(ramen) })
}

function loadRamenInfo(ramen) {
    const ramenImg = document.getElementsByClassName("detail-image")[0]
    const ramenName = document.getElementsByClassName("name")[0]
    const ramenRestaurant = document.getElementsByClassName("restaurant")[0]
    const ramenRating = document.getElementById("rating-display")
    const ramenComment = document.getElementById("comment-display")

    ramenImg.src = ramen.image
    ramenName.textContent = ramen.name
    ramenRestaurant.textContent = ramen.restaurant
    ramenRating.textContent = ramen.rating
    ramenComment.textContent = ramen.comment
}

document.getElementById("new-ramen").addEventListener("submit", addNewRamen)

function addNewRamen(event) {
    event.preventDefault()
    const form = event.target
    const formComment = document.getElementById("new-comment")

    const newRamen = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: formComment.value,
    }

    fetch(ramenAPI, {
        headers,
        method: "POST",
        body: JSON.stringify(newRamen),
    })
        .then(res => res.json())
        .then(json => {
            ramenList.push(json)
            renderRamen()
        })

}
