import Cart from "./cart.js";

export default class CartsList {
    constructor() {
        this.carts = [];
        this.cartsId = {};

        this.totalPrice = 0;
        this.totalProducts = 0;

        this.render();
            this.renderPrice();
        this.updateTotalPrice();

        this.addEventListenersClose();
        this.initEventListenersCartsList();
    }

    getTemplate() {
        return `
            <section class="wrapper-cart-list">

                <header class="header-close">
                    <a href="#" data-element="close-carts-list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="black" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </a>
                </header>
                
                <main>
                    <ul class="carts-list">

                        <!--Carts-->
                                    
                    </ul>
                </main>
                
                <footer>
                    <div class="cart-total">
                        <h2 class="text-cart-list">Total:</h2>
                        <p class="text-cart-list" data-element="total">
                            <!--Price-->
                        </p>
                    </div>
                
                    <div class="order-button">
                        <button class="text-cart-list">ORDER</button>
                    </div>
                </footer>
        
            </section>
        `;
    }
    
    getTemplatePrice() {
        return `
            <div>
                ${this.totalPrice}
            </div>
        `;
    }

    initCart(item = {}, amount = 1) {
        const cart = new Cart(item, amount);

        return cart.element;
    }

    render() {
        const wrapper = document.createElement("div");
        
        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }

    renderCarts() {
        const conteinerCarts = this.element.querySelector('.carts-list');
        
        const template = this.carts.map((item) =>{
            const amount = this.cartsId[item.id];
                
            return this.initCart(item, amount);
        });

        conteinerCarts.innerHTML = "";
        conteinerCarts.append(...template);
    }

    renderPrice() {
        const priceBlock = this.element.querySelector('[data-element="total"]');
        
        priceBlock.innerHTML = this.getTemplatePrice();
    }

    update(dataCarts){
        const searchId = dataCarts.id;
        const resaltSearch = this.carts.find(item => item.id === searchId);

        if(resaltSearch) {
            this.cartsId[searchId] += 1;
        }
        else{
            this.carts.push(dataCarts);
            this.cartsId[searchId] = 1;
        }
        this.renderCarts();
         console.log("this.carts1=", this.carts);
         console.log("this.cartsId1=", this.cartsId);

         this.updateTotalPrice();
    }

    deleteCart(cartId) {
        const indexCart = this.carts.findIndex(item => item.id === cartId);

        const newDataCarts = this.carts.filter((item, index) => {if(index != indexCart) {return item} });

        this.carts = newDataCarts;

        delete this.cartsId[cartId];
        console.log("this.cartsId_delete=", this.cartsId);

        this.renderCarts();
        this.updateTotalPrice();
    }

    updateTotalPrice() {
        let totalPrice = 0;
        let totalProducts = 0;

        for(const key in this.cartsId) {
            totalProducts += this.cartsId[key];

            const cartObjSearch = this.carts.find(item => item.id === key);

            const price = cartObjSearch.price;

            totalPrice += this.cartsId[key] * price;
        }

        this.totalPrice = totalPrice;
        this.totalProducts = totalProducts;

        console.log("this.totalPrice=", this.totalPrice);
        console.log("this.totalProducts=", this.totalProducts);
        this.renderPrice();

        this.dispatchEventProducts();
    }

    addEventListenersClose() {
        const closeButton = this.element.querySelector('[data-element="close-carts-list"]');
        
        closeButton.addEventListener("click", event => {
            
            this.dispatchEvent();
        })
    }

    initEventListenersCartsList() {
        this.element.addEventListener("cartieventdelete", event => {
            const cartId = event.detail;
            
            this.deleteCart(cartId);
        })

        this.element.addEventListener("updateamount", event => {
            const cartId = event.detail.cartId;
            const amount = event.detail.amount;
         
            this.cartsId[cartId] = amount;
            console.log("this.cartsID=", this.cartsId);

            this.updateTotalPrice();
        })
    }
   
    dispatchEvent() {
        const closeCartsListEvent = new CustomEvent("closecartslistevent");
        
        this.element.dispatchEvent(closeCartsListEvent);
    }

    dispatchEventProducts() {
        const totalProductsCartsListEvent = new CustomEvent("cartieventtotalproducts", {bubbles:true, detail: this.totalProducts});
        
        this.element.dispatchEvent(totalProductsCartsListEvent);
    }
}