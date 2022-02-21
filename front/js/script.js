/**
 * @class
 * @classdesc Create a product from API response(contain Id, Price, Color, Name, Description, urlImg, AltTxt)
 */
class Product{
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}
