const body = document.querySelector("body")
const cart = document.querySelector(".cart")
const buyCart = document.querySelector("#buy-cart")
const cardInfo = document.querySelector("#card-info")
const itemCart = document.querySelector("#item-cart")
const closeInfo = document.querySelector(".close-info")
const closeCart = document.querySelector(".close-cart")
const allInfoCard = document.querySelector("#all-info-card")
const finishBuy = document.querySelector(".finish-buy-button")

cart.addEventListener("mouseover", event => {
    if(event.target.classList.contains("cart")) cart.src = "./img/shopping-cartHover.svg"
})

cart.addEventListener("mouseout", event => {
    if(event.target.classList.contains("cart")) cart.src = "./img/shopping-cart.svg"
})

cart.addEventListener("click", event => {
    if (buyCart.classList !== "buy-cart-hidden"){
        buyCart.classList = "buy-cart-visible"
        itemCart.classList = "item-cart-visible"
        body.classList = "body-hidden"
    }
})

buyCart.addEventListener("click", event => {
    if(event.target.classList.contains("buy-cart-visible")) {
        itemCart.classList = "item-cart-hidden"
        buyCart.classList = "buy-cart-hidden"
        body.classList = "body-visible"
    }
})

closeCart.addEventListener("click", event => {
    if (event.target.classList.contains("close-cart")){
        itemCart.classList = "item-cart-hidden"
        buyCart.classList = "buy-cart-hidden"
        body.classList = "body-visible"
    }
})

closeInfo.addEventListener("click", event => {
    if(event.target.classList.contains("close-info")) {
        allInfoCard.classList = "all-info-card-hidden"
        cardInfo.classList = "card-info-hidden"
        body.classList = "body-visible"
    }
})

cardInfo.addEventListener("click", event => {
    if(event.target.classList.contains("card-info-visible")) {
        allInfoCard.classList = "all-info-card-hidden"
        cardInfo.classList = "card-info-hidden"
        body.classList = "body-visible"
    }
})

finishBuy.addEventListener("click", event => {
    let buyCartItems = JSON.parse(localStorage.getItem("buyCartItems"))
    if (!buyCartItems.length == 0) window.location.href = "finishBuy.html"
})

finishBuy.addEventListener("click", event => {
    let buyCartItems = JSON.parse(localStorage.getItem("buyCartItems"))
    if (buyCartItems.length == 0) alert("No hay productos en el carro de compra")
})