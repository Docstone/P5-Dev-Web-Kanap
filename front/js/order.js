// FORM CONFIRMATION
/**
 * @class
 * @classdesc Create a order from form input and product IDs
 * (contain contact{firstName, lastName, address, city, email}, [IDs])
 */
class Order {
    constructor(contact, products){
        this.contact = contact;
        this.products = products
    }
}

//Regex pattern for form validation
let firstName = document.getElementById("firstName")
    setAttributes(firstName, {
        "pattern" : "(-?([A-Z].\s)?([a-zA-ZÀ-ÖØ-öø-ÿ][a-zÀ-ÖØ-öø-ÿ-]+)\s?)+([A-Z]'([A-Z][a-z]+))?",
        "minlength" : "2",
        "maxlength" : "25"
    })

let lastName = document.getElementById("lastName")
    setAttributes(lastName, {
        "pattern" : "(-?([A-Z].\s)?([a-zA-ZÀ-ÖØ-öø-ÿ][a-zÀ-ÖØ-öø-ÿ-]+)\s?)+([A-Z]'([A-Z][a-z]+))?",
        "minlength" : "2",
        "maxlength" : "25"
    })

let address = document.getElementById("address")
    setAttributes(address, {
        "pattern" : "[a-zA-Z0-9 ]+",
        "minlength" : "8",
        "maxlength" : "50"
    })

let city = document.getElementById("city")
    setAttributes(city, {
        "pattern" : "[a-zA-Z -]+",
        "maxlength" : "25"
    })

let email = document.getElementById("email")

let errMsg = [
    "Veuillez entrer un prénom valide",
    "Veuillez entrer un nom valide",
    "Veuillez entrer une adresse valide",
    "Veuillez entrer une ville valide",
    "Veuillez entrer un email valide"
]

let form = document.querySelectorAll('input')


//Event Listener <onChange> check user input validity, display error message if invalid
form.forEach((input, index)=> {
    input.addEventListener('change', function(){
        if( !input.checkValidity() ){
            document
            .getElementById(`${input.id}ErrorMsg`)
            .innerText =  `${errMsg[index]}`
        }else{
            document
            .getElementById(`${input.id}ErrorMsg`)
            .innerText =  ""
        }
    })
}) 

/**
*Event listener <onSubmit> retrieve valid form input and cart products ID,
*Create a new Order instance, stringify and send POST request to API
*Then if res=ok redirect to confirmation page with orderId in URL
*/
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault()
    let productsId = items.getCartProductsId()
    let contact = {
        "firstName" : e.target.firstName.value,
        "lastName" : e.target.lastName.value,
        "address" : e.target.address.value,
        "city" : e.target.city.value,
        "email" : e.target.email.value
    }
    let order = new Order(contact, productsId)
    console.log(productsId.length)
    if( productsId.length == 0) {
        alert('Votre panier est vide')
    }else{
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
            })
            .then(response => response.json())
            .then(response => {
            window.location.assign(`./confirmation.html?id=${response.orderId}`);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
    }
   
})