// FORM CONFIRMATION
class Order {
    constructor(contact, products){
        this.contact = contact;
        this.products = products
    }
    checkOrder() {
        for(let i = 0 ; i > this.contact.keys().length ; i++ ) {
            if( !this.contact[i] || typeof( this.contact[i].value != string) ){
                console.log("POST request: wrong format")
                return false
            }else {
                console.log('format ok')
                return true
            }
        }
    
    }
}


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

document.querySelector("form")
        .addEventListener("submit", function(e) {
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
            console.log(order)
})