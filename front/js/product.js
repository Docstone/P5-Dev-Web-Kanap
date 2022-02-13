class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

//recuperation de l'id du produit via l'url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let productId = params.id;

//requette GET via Id
fetch('http://localhost:3000/api/products/' + productId)
    .then(data => data.json())
    .then(jsonListDetails => {

    let detail = new Product(jsonListDetails);
    
    //injection du HTML dans le DOM
    document.querySelector(".item__img").innerHTML +=  
    `<img src="${detail.imageUrl}" alt="${detail.altTxt}">`;

    document.getElementById("title").innerHTML +=  
    `${detail.name}`;

    document.getElementById("price").innerHTML +=  
    `${detail.price}`;
    
    //iteration de l'array colors, creation d'elements option pour chaque couleurs, injection des elements dans la balise select
    for ( i=0 ; i<detail.colors.length ; i++ ){
        let option = document.createElement("option");
        option.setAttribute('value', detail.colors[i]);
        option.textContent = detail.colors[i];
        document.getElementById("colors").appendChild(option);
}
});