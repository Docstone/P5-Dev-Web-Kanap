/**
 * Create a new instance of proxy containing the search parameter
 */
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let productId = params.id;

/**
 *Fetch data from API with the productID
 *and create instance of Product
 * @param { String } url
 * @param { String } productId
 * @return { Object  } item
 */
fetch('http://localhost:3000/api/products/' + productId)
    .then(data => data.json())
    .then(jsonListDetails => {
    let item = new Product(jsonListDetails);
    
    //injection du HTML dans le DOM
    document.querySelector(".item__img").innerHTML +=  
    `<img src="${item.imageUrl}" alt="${item.altTxt}">`;

    document.getElementById("title").innerHTML +=  
    `${item.name}`;

    document.getElementById("description").innerHTML +=  
    `${item.description}`;

    document.getElementById("price").innerHTML +=  
    `${item.price}`;
    
    //iteration de l'array colors, creation d'elements option pour chaque couleurs,
    //  injection des elements dans la balise select
    for ( i = 0 ; i < item.colors.length ; i++ ){
        let option = document.createElement("option");
        option.setAttribute('value', item.colors[i]);
        option.textContent = item.colors[i];
        document.getElementById("colors").appendChild(option);
    }
});

// Event Listener <onClick> create a new cartItem
//  {productId (String} userColor {String} userQuantity {Integer} } 
document.getElementById("addToCart").addEventListener("click",function(){
    let userColor = document.getElementById("colors").value;
    let userQuantity = document.getElementById("quantity").value;
    if (userColor === "" || userQuantity <= 0){
        return alert('Veuillez choisir une couleur et une quantité.')
    }
    let item = new CartItem(productId, userQuantity, userColor);
    item.addToCart();
});