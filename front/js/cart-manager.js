/**
 * @class
 * @classdesc Create a cart product(contain id: String, quantity: Integer, color: String)
 */
class CartItem{
    constructor(id, quantity, color){
        this.id = id;
        this.quantity = quantity;         
        this.color = color;
        this.indexDuplicate;
   }


    /**
     * Réccupère la liste des produits dans localStorage
     * @return { ( Array.<{ id: String, quantity: Integer, color: String }> | [array] ) } cartProducts
     */
    getCartProducts() {
        let cartProducts = localStorage.getItem("cartProducts");
        if(cartProducts === null){
            return [];
        }else{
            return JSON.parse(cartProducts);
        }
    }    
    
    /**
     * Réccupère la liste des ID des produits dans localStorage
     * @return {  Array.<String>  } cartProducts.id
     */
    getCartProductsId() {
        return this.getCartProducts().map(cartProducts => cartProducts.id);
    }
    
    /**
     * Add to localStorage the quantity and color of product,
     * Check if duplicate exist,if none, add product to array and save to localStorage
     * Else add quantity to duplicate
     */
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

     /**
     * Find product in cart that match param id and color,
     * @param { Array.<{ id: String, quantity: Integer, color: String }> } cartProduct
     * @return { Integer } index
     */
    findItemByIdColor(cartProduct) {
        let cartProducts = this.getCartProducts();
        let index = cartProducts.findIndex(x => x.id === cartProduct.id && x.color === cartProduct.color)
        return index;
    }

    /**
     * Delete product in cart that match param id and color,
     * @param { PointerEvent } e
     * @param { Object.< id: String, quantity: Integer, color: String > } cartProduct
     * @return { Integer } index
     */
    deleteFromCart(e, cartProduct) {
        let cartProducts = this.getCartProducts();
        let index = this.findItemByIdColor(cartProduct)
        cartProducts.splice(index, 1)
        this.saveCart(cartProducts)
        this.deleteFromPage(e)
    }
    
    /**
     * Delete DOM element closest to the pointerEvent target,
     * @param { PointerEvent } e
     */
    deleteFromPage(e) {
        let toRemove = e.target.closest('article')
        toRemove.remove()
    }
    /**
     * Update localStorage products quantity with event target value
     * @param { PointerEvent } e
     * @param { Object.< id: String, quantity: Integer, color: String > } cartProduct
     */
    updateQuantity(e, cartProduct){
        let index = this.findItemByIdColor(cartProduct)
        let cartProducts = this.getCartProducts();
        cartProducts[index].quantity = e.target.value
        this.saveCart(cartProducts)
    }

    /**
     * Get number of total products in cart,
     * @return { Integer } 
     */
    getTotalItems(){
        let cartProducts = this.getCartProducts();
        if (cartProducts.length === 0){
            return 0
        }else{
            let total = cartProducts.reduce((a, b) => ({quantity: parseInt(a.quantity) + parseInt(b.quantity)}));
            return total.quantity;
        }
    }
    
    /**
     * Check if localStorage already contain product with same color
     * @param { Array.<{ id: String, quantity: Integer, color: String }> } cartProduct
     * @return { Boolean } 
     */
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

     /**
     * Stringify and Save the cart Products to local Storage
     * @param { Object.<{ id: String, quantity: Integer, color: String }> } cartProduct
     */
    saveCart(cartProducts) {
        localStorage.setItem("cartProducts",JSON.stringify(cartProducts))
    }          
}


