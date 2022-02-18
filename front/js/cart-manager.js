class CartItem{
    constructor(id, quantity, color, price){
        this.id = id;
        this.quantity = quantity;         
        this.color = color;
        this.price = price;
        this.indexDuplicate;
   }

    getCartProducts() {
        let cartProducts = localStorage.getItem("cartProducts");
        if(cartProducts === null){
            return [];
        }else{
            return JSON.parse(cartProducts);
        }
    }    
    
    getCartProductsId() {
        return this.getCartProducts().map(cartProducts => cartProducts.id);
    }
    
    addToCart() {
        let cartProducts = this.getCartProducts();
        let isDuplicate = this.checkCart(cartProducts);
        if (isDuplicate === false){
            cartProducts.push(this);
            this.saveCart(cartProducts);
        } else {
            cartProducts[this.indexDuplicate].quantity = parseInt(cartProducts[this.indexDuplicate].quantity) + parseInt(this.quantity);
            this.saveCart(cartProducts);
        }
    }

    findItemByIdColor(cartProduct) {
        let cartProducts = this.getCartProducts();
        let index = cartProducts.findIndex(x => x.id === cartProduct.id && x.color === cartProduct.color)
        return index;
    }

    deleteFromCart(e, cartProduct) {
        let cartProducts = this.getCartProducts();
        let index = this.findItemByIdColor(cartProduct)
        cartProducts.splice(index, 1)
        this.saveCart(cartProducts)
        this.deleteFromPage(e)
    }

    deleteFromPage(e) {
        let toRemove = e.target.closest('article')
        toRemove.remove()
    }
    
    updateQuantity(e, cartProduct){
        let index = this.findItemByIdColor(cartProduct)
        let cartProducts = this.getCartProducts();
        cartProducts[index].quantity = e.target.value
        this.saveCart(cartProducts)
    }

    getTotalItems(){
        let cartProducts = this.getCartProducts();
        if (cartProducts.length === 0){
            return 0
        }else{
            let total = cartProducts.reduce((a, b) => ({quantity: parseInt(a.quantity) + parseInt(b.quantity)}));
            return total.quantity;
        }
    }
    
    getPrice(item){
        return parseInt(item.price) * parseInt(item.quantity);
    }
    
    getTotalPrice(){
        let cartProducts = this.getCartProducts();
        if (cartProducts.length === 0){
            return 0
        }else{
        let total = [];
        cartProducts.forEach(item => total.push(this.getPrice(item)))
        return total.reduce((a, b) => a + b);
        }
    }

    checkCart(cartProducts) {
        if (cartProducts.length > 0){
            for( let i = 0 ; i < cartProducts.length ; i++) {
                if (cartProducts[i].id === this.id && cartProducts[i].color === this.color) {
                    this.indexDuplicate = i;
                    return true;
                }
            }
            return false;
        }
        return false;
    }
    
    saveCart(cartProducts) {
        localStorage.setItem("cartProducts",JSON.stringify(cartProducts))
    }          
}


