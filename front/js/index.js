//recuperation de la liste de produits
fetch('http://localhost:3000/api/products')
    .then(data => data.json())
    .then(jsonListProduct => {
        //iteration de la reponse et creation d'instance pour chaque produit
        for (let jsonProduct of jsonListProduct) {
            let product = new Product(jsonProduct);

            //recuperation de l'id des produits pour redirection page
            let productId = product._id;

            //injection HTML
            document.querySelector(".items").innerHTML +=  
            
            `<a href="./product.html?id=${productId}">
                <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
                </article>
            </a>`
    }
});
