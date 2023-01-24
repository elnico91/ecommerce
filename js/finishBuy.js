const item = document.querySelector(".items")
const price = document.querySelector(".final-price")
const finishButton = document.querySelector(".button-finish-buy")

let products = JSON.parse(localStorage.getItem("allProducts"))
let items = JSON.parse(localStorage.getItem("buyCartItems"))
let total = parseFloat(localStorage.getItem("total"))


document.addEventListener("DOMContentLoaded", getItems())

function getItems(){
    items.forEach(id => addItems(getProductByid(id)));
}

function getProductByid (id){
    return products.filter(product => product.id === parseInt(id))
}

function addItems (product){
    product.forEach(product => {
        item.innerHTML += `<div class="item">
                            <div>
                                <img class="item-img" src="${ product.image }">
                            </div>
                            <div>
                                <span class="item-title">${ product.title }</span>
                                <span class="item-price">$ ${ product.price }</span>
                            </div>
                        </div>`
    })
    price.textContent = "$ " + total.toFixed(2)
}

finishButton.addEventListener("click", event => {
    if (!confirm("¿Desea finalizar la compra?")){
    } else{
        localStorage.setItem("buyCartItems", JSON.stringify([]))
        localStorage.setItem("total", 0)
        localStorage.setItem("count", 0)
        alert("La compra ha finalizado con exito")
        window.location.href = "./index.html"
    }
})