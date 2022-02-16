class CartItem{
    constructor(id, quantity, color){
        this.id = id;
        this.quantity = quantity;         
        this.color = color;
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
        return getFavorites().map(favorite => favorite.id);
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
            console.log(this)
        }
    }
    
    checkCart(cartProducts) {
        if (cartProducts.length > 0){
            for( let i = 0 ; i < cartProducts.length ; i++) {
                console.log(i)
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



