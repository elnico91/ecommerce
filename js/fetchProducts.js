const API_URL = "https://fakestoreapi.com/products"
const buyProducts = document.querySelector(".buy-products")
const elementProduct = document.querySelector(".products")
const totalPrice = document.querySelector(".price-text")
const empty = document.querySelector("#empty-products")
const category = document.querySelectorAll(".category")
const circle = document.querySelector(".circle")
const div = document.createElement("div")

let allProducts = JSON.parse(localStorage.getItem("allProducts"))
let buyCartItems = JSON.parse(localStorage.getItem("buyCartItems")) || []
let total = parseFloat(localStorage.getItem("total")) || 0
let count = localStorage.getItem("count") || 0
let cards = []
let index = 0

document.addEventListener("DOMContentLoaded", getProducts())
totalPrice.textContent = "$ " + total.toFixed(2)
circle.textContent = count

if (!buyCartItems.length == 0) {
  setTimeout(()=> {
    empty.classList = "disable-empty-products"
    buyCartItems.forEach(id => addItemsCartLocal(getProductByid(id)))
  }, 150)
}

// Se realiza la peticion a la API una vez y despues los datos de los productos se guardan en localStorage
// Por la simple razon de no saturar la API con muchas peticiones
async function getProducts(){
  try {
    if (localStorage.getItem("allProducts")) setTimeout(()=>{addAllProducts()}, 150)
    else{
      const response = await fetch(API_URL)
      const data = await response.json()
      localStorage.setItem("allProducts", JSON.stringify(data))
      allProducts = JSON.parse(localStorage.getItem("allProducts"))
      addAllProducts()
    }
  } catch {
    elementProduct.innerHTML += `<div class="product-no-found"><span>No se ha encontrado ningun producto, por favor intentarlo mas tarde.</span></div>`
  }
}

const addItemsCartLocal = (item) => {
  item.forEach(product => {
    const addItem = document.createElement("div")
    addItem.classList = "card-buy-container"
    addItem.setAttribute("data-index", index)
    addItem.innerHTML += `<div>
                        <img class="product-preview" src="${ product.image }">
                      </div>
                      <div class="product-info">
                          <div class="div-product-name">
                              <span class="product-name">${ product.title }</span>
                          </div>
                          <div class="div-price">
                              <span class="product-price">$ ${ product.price }</span>
                              <img class="delete-product" src="./img/trash.svg">
                          </div>
                      </div>`
    buyProducts.appendChild(addItem)
  })
  index++
  eventDeleteProduct()
}

const addAllProducts = () => {
  div.classList.add("container-cards")
  elementProduct.appendChild(div)
  allProducts.forEach(product => {
    let cutTitle = product.title
    if (cutTitle.length >= 45) cutTitle = cutTitle.substring(0, 42) + "..."
    div.innerHTML += `<div class="card" data-index="${product.id}">
                        <img class="product-img" src="${product.image}">
                        <span class="info-text">${cutTitle}</span>
                        <span class="info-price">$ ${product.price}</span> 
                        <button class="buy-button" data-index="${product.id}">Añadir al carrito</button>          
                      </div>`
  })
  cards = document.querySelectorAll(".card")
  selectCard(cards)
  eventAddToCard()
}

category.forEach(element => {
  element.addEventListener("click", event => {
    category.forEach(element => { if (element.classList.value === "category active") element.classList = "category inactive" })
    element.classList = "category active"
    while (div.firstChild) div.removeChild(div.lastChild)
    if (element.attributes[1].value === "all products"){ 
      addAllProducts(allProducts)
    } else{
      allProducts.forEach(product => {
        if (product.category === element.attributes[1].value) {
          let cutTitle = product.title
          if (cutTitle.length >= 45) cutTitle = cutTitle.substring(0, 42) + "..."
          div.innerHTML += `<div class="card" data-index="${product.id}">
                              <img class="product-img" src="${product.image}">
                              <span class="info-text">${cutTitle}</span>
                              <span class="info-price">$ ${product.price}</span> 
                              <button class="buy-button" data-index="${product.id}">Añadir al carrito</button>          
                            </div>`
        }
      })
      cards = document.querySelectorAll(".card")
      selectCard(cards)
      eventAddToCard()
    }
  })
})

const getProductByid = id => {
  return allProducts.filter(product => product.id === parseInt(id))
}

const selectCard = card => {
  card.forEach(element => {
    element.addEventListener("click", event =>{
      if (!event.target.classList.contains('buy-button')){
        const allInfoCard = document.querySelector("#all-info-card")
        const cardInfo = document.querySelector("#card-info")
        const body = document.querySelector("body")
        const product = getProductByid(element.attributes[1].value)
        if (allInfoCard.childElementCount === 2) allInfoCard.lastElementChild.remove()
        product.forEach(product => {
          const addCard = document.createElement("div")        
          addCard.classList = "div-info"
          addCard.innerHTML = `<img class="img-info" src="${product.image}">
                          <p class="info-title">${product.title}</p>
                          <p class="description">${product.description}</p>
                          <p class="info-price">$ ${product.price}</p>
                          <button class="buy-button" data-index="${product.id}" data-unique="true">Añadir al carrito</button>`
          allInfoCard.appendChild(addCard)
        }) 
        allInfoCard.classList = "all-info-card-visible"
        cardInfo.classList = "card-info-visible"
        body.classList = "body-hidden"
        eventAddToCard()
      }
    })
  })
}

const eventAddToCard = () => {
  const buyButtons = document.querySelectorAll(".buy-button")
  buyButtons.forEach(button => button.addEventListener("click", addToCart))
}

const addToCart = event => {
  const alertBuyProduct = document.querySelector(".success-add-cart-container")
  const product = getProductByid(event.target.attributes[1].value)
  const div = document.createElement("div")
  buyCartItems.push(event.target.attributes[1].value)
  localStorage.setItem("buyCartItems", JSON.stringify(buyCartItems))
  if (event.target.classList.contains('buy-button')){
    product.forEach(product => {
      count++
      circle.textContent = count
      if (count >= 99) circle.textContent = "+99"
      total += product.price
      totalPrice.textContent = "$ " + total.toFixed(2)
      let cutTitle = product.title
      if (cutTitle.length >= 45) cutTitle = cutTitle.substring(0, 42) + "..."
      div.classList = "card-buy-container"
      div.setAttribute("data-index", count-1)
      div.innerHTML += `<div>
                          <img class="product-preview" src="${ product.image }">
                        </div>
                        <div class="product-info">
                            <div class="div-product-name">
                                <span class="product-name">${ product.title }</span>
                            </div>
                            <div class="div-price">
                                <span class="product-price">$ ${ product.price }</span>
                                <img class="delete-product" src="./img/trash.svg">
                            </div>
                        </div>`
      buyProducts.appendChild(div)
      empty.classList = "disable-empty-products"
      if (!alertBuyProduct.childElementCount == 0) alertBuyProduct.children[0].remove()
      alertBuyProduct.innerHTML +=`<div class="success-add-cart"> <span>Se ha añadido exitosamente al carrito</span> </div>`
    })
    localStorage.setItem("count", count)
    localStorage.setItem("total", total.toFixed(2))
    eventDeleteProduct()
  }
}

const eventDeleteProduct = () => {
  const deleteButton = document.querySelectorAll(".card-buy-container")
  deleteButton.forEach(button => button.addEventListener("click", deleteProduct))
}

const deleteProduct = event => {
  const circle = document.querySelector(".circle")
  const div = event.target.parentElement.parentElement.parentElement
  const deleteButton = document.querySelectorAll(".card-buy-container")
  let i = -1
  if (event.target.classList.contains("delete-product")){
    count--
    if (count <= 0) count = 0
    circle.textContent = count
    total -= div.children[1].children[1].children[0].textContent.slice(2)   
    totalPrice.textContent = "$ " + total.toFixed(2)
    if (total <= 0) totalPrice.textContent = "$ 0"
    deleteButton.forEach(element => {i++; if (element === div) buyCartItems.splice(i, 1)})
    localStorage.setItem("buyCartItems", JSON.stringify(buyCartItems))
    localStorage.setItem("total", total.toFixed(2))
    localStorage.setItem("count", count)
    div.remove()
  }
  checkEmpty()
}

const checkEmpty = () => {
  const deleteButton = document.querySelectorAll(".card-buy-container")
  if (deleteButton.length === 0) empty.classList = "empty-products"
}
