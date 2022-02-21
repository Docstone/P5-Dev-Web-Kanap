let items = new CartItem;
let cart = items.getCartProducts()
let sortedCart = items.sortCart(cart)

/**
 * Return attribute key value pair for each object in argument for element
 * @param { HTMLElement } element
 * @param { object } options
 * @param { string } options.attr
 * @return { fn } setAttribute(options.attr, option[attr])
 */
function setAttributes(element, options) {
   Object.keys(options).forEach(function(attr) {
     element.setAttribute(attr, options[attr])
   })
}

sortedCart.forEach( item => {
    fetch('http://localhost:3000/api/products/' + item.id)
    .then(data => data.json())
    .then(jsonListDetails => {
    let product = new Product(jsonListDetails)

    let article = document.createElement("article")
        setAttributes(article, {
            "class": "cart__item",
            "data-id": item.id,
            "data-color": item.color
        })

    let imgCont = document.createElement("div")
        imgCont.setAttribute("class", "cart__item__img")

    let img = document.createElement("img")
        setAttributes(img, {
            "src": product.imageUrl,
            "alt": product.altTxt
        });

    let itemContent = document.createElement("div")
        itemContent.setAttribute("class", "cart__item__content")

    let description = document.createElement("div")
        description.setAttribute("class", "cart__item__content__description")
    
    let h2 = document.createElement("h2")
        h2.innerText = product.name
    
    let color = document.createElement("p")
        color.innerText = item.color
    
    let price = document.createElement("p")
        price.innerText = `${product.price}€`

    let settings = document.createElement("div")
        settings.setAttribute("class", "cart__item__content__settings")

    let quantitySettings = document.createElement("div")
        quantitySettings.setAttribute("class", "cart__item__content__settings__quantity")

    let quantityP = document.createElement("p")
        quantityP.innerText = "Qté : "
    
    let quantityInput = document.createElement("input")
        setAttributes(quantityInput, {
            "type": "number",
            "class": "itemQuantity",
            "name": "itemQuantity",
            "min": "1",
            "max": "100",
            "value": item.quantity,

        })

    let deleteItem = document.createElement("div")
        deleteItem.setAttribute("class", "cart__item__content__settings__delete")

    let deleteP = document.createElement("p")
        deleteP.setAttribute("class", "deleteItem")
        deleteP.innerText = "Supprimer"

    document.getElementById("cart__items").appendChild(article)
    article.appendChild(imgCont)
        imgCont.appendChild(img)
        article.appendChild(itemContent)
        itemContent.appendChild(description)
            itemContent.appendChild(h2)
            itemContent.appendChild(color)
            itemContent.appendChild(price)
        itemContent.appendChild(settings)
            settings.appendChild(quantitySettings)
            quantitySettings.appendChild(quantityP)
            quantitySettings.appendChild(quantityInput)
        settings.appendChild(deleteItem)
            deleteItem.appendChild(deleteP)
    

        deleteP.addEventListener("click", function(e){
            items.deleteFromCart(e, item)
            showQuantity()
        })
        
        quantityInput.addEventListener("change", function(e){
            items.updateQuantity(e, item)
            showQuantity()
        })
    })
})

function getPrice(item){
    return fetch('http://localhost:3000/api/products/' + item.id)
    .then(data => data.json())
    .then(jsonListDetails => item.quantity * jsonListDetails.price)
}   


function showTotalPrice() {
    let cartProducts = items.getCartProducts();
    let prices = [];
    if (cartProducts.length === 0){
        document.getElementById("totalPrice").innerText = 0   
    }else{
    cartProducts.forEach(item => {
        getPrice(item).then(res => prices.push(res)).then( res => 
            prices.reduce((a, b) => a + b)).then( res => document.getElementById("totalPrice")
            .innerText = res)
        })
    }
}

function showQuantity(){
    document.getElementById("totalQuantity")
        .innerText = items.getTotalItems()
        showTotalPrice()
}

showQuantity()
showTotalPrice()