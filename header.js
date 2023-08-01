export default class Header {
    constructor() {
        this.totalProducts = 0;

        this.render();
        this.renderTotalProducts();

        this.addEventListenersCart();
        this.initEventListenersTotalProducts();
    }

    getTemplate() {
        return `
            <section class="header-components">
                <h1 class="header-text-onlstore">Online Store</h1>
                
                <a href="#" class="header-cart">
                    <div class="header-cart-bloc">
                        <div class="header-cart-bloc-resicle"><i class="bi bi-cart"></i></div>
                        <p class="header-cart-bloc-text">CART</p>

                        <p class="header-total-roducts">

                            <!--Total products-->

                        </p>
                    </div>
                </a>
            </section>
        `;
    }

    getTemplateTotalProducts() {
        return `
            <div>
                ${this.totalProducts}
            </div>
        `;
    }

    render() {
        const wrapper = document.createElement("div");
        
        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }

    renderTotalProducts() {
        const totalProductsBlock = this.element.querySelector('.header-total-roducts');

        if(this.totalProducts > 0) {
            totalProductsBlock.innerHTML = this.getTemplateTotalProducts();
        }
        else{
            totalProductsBlock.innerHTML = "";
        }
    }

    addEventListenersCart() {
        const orderButton = this.element.querySelector(".header-cart");
        
        orderButton.addEventListener("click", event => {
            this.dispatchEvent();
        })
    }

    dispatchEvent() {
        const cartsListEvent = new CustomEvent("cartslistevent");

        this.element.dispatchEvent(cartsListEvent);
    }

    initEventListenersTotalProducts() {
        document.addEventListener("cartieventtotalproducts", event => {
            const totalProducts = event.detail;
            
            this.totalProducts = totalProducts;
            
            this.renderTotalProducts();
        })
    }
}