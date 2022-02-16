document.getElementById('order').addEventListener('click', function(){
    var isValid = true;
    for ( let input of document.querySelectorAll('.form input')){
        isValid &= input.checkValidity();
        if( !isValid){
            document.getElementById(`${input.id}ErrorMsg`).innerText = "Ce champ n'est pas valide"
            break;
        }
    }
});

fetch("http://localhost:3000/api/article",
        {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            "body": JSON.stringify({ cart: getCartProductsId() })
        }).then(data => data.json())
        .then(jsonListProduct => {
            for (let jsonProduct of jsonListProduct) {
                let product = new Product(jsonProduct);
                document.getElementById(".cart-items").innerHTML += `
                    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                        <div class="cart__item__img">
                        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>Nom du produit</h2>
                            <p>Vert</p>
                            <p>42,00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article>`;
            }
        })
