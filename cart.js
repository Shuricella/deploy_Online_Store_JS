export default class Cart {
    constructor(data = {}, amount = 1) {
        this.state = data;

        this.amount = amount;

        this.render();
        this.renderAmount();
        this.renderPrice();

        this.isErrorImage();

        this.addEventListeners();
    }

    getTemplate() {
        return `
            <li class="cart" data-element-id="${this.state.id}">
                    
                <div class="cart-img">
                <img src="${this.state.images[0]}" alt="${this.state.category}" height="40">
                </div>
                
                <div class="block-cart-title">
                <h1 class="cart-title text-cart-list">${this.state.title}</h1>
                </div>
                
                <section class="cart-block">
                <div class="amount-product">
                    <button type="button" data-element="prevbutton">
                    <i class="bi bi-dash-circle"></i>
                    </button>      
            
                    <p class="text-cart-list">

                        <!--Amount-->

                    </p>
            
                    <button type="button" data-element="nextbutton">
                    <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
                
                <div class="price-title">

                    <!--Price-->

                </div>
                
                <div class="delete-title">
                    <button type="button">
                    <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
                </section>
                
            </li>
        `
    }

    getTemplateAmount() {
        return `
            <div>
                ${this.amount}
            </div>
        `;
    }

    getTemplatePrice() {
        return `
            <p class="text-cart-list">
                ${this.state.price * this.amount}
            </p>
        `;
    }

    isErrorImage() {
        const imgBlock = this.element.querySelector('.cart-img img');
        
        imgBlock.onerror = function(error) {
            imgBlock.src = "./wolf.jpg";
        };
    }

    render() {
        const wrapper = document.createElement("div");
        
        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }

    renderAmount() {
        const amountBlock = this.element.querySelector('.amount-product .text-cart-list');
        
        amountBlock.innerHTML = this.getTemplateAmount();
    }

    renderPrice() {
        const priceBlock = this.element.querySelector('.price-title');
        
        priceBlock.innerHTML = this.getTemplatePrice();
    }

    addEventListeners() {
        const nextButton = this.element.querySelector('[data-element="nextbutton"]');
        const prevButton = this.element.querySelector('[data-element="prevbutton"]');
        const deleteButton = this.element.querySelector('.delete-title');
            
        nextButton.addEventListener("click", event => {
            const item = event.target.closest('.bi-plus-circle');

            if(item === null) return;

            this.amount += 1;

            this.renderAmount();
            this.renderPrice();

            this.dispatchEventAmount(this.state.id, this.amount);
        })

        prevButton.addEventListener("click", event => {
            const item = event.target.closest('.bi-dash-circle');
            if(item === null || this.amount === 1) return;

            this.amount -= 1;

            this.renderAmount();
            this.renderPrice();

            this.dispatchEventAmount(this.state.id, this.amount);
        })

        deleteButton.addEventListener("click", event => {
            const item = event.target.closest('.bi-trash-fill');
            if(item === null) return;

            console.log("item=", item);

            this.dispatchEventDelete(this.state.id);
        })
    }

    dispatchEventDelete(cartId) {
        const deleteButton = new CustomEvent("cartieventdelete", {bubbles:true, detail: cartId});
        
        this.element.dispatchEvent(deleteButton);
    }

    dispatchEventAmount(cartId, amount) {
        const updateAmout = new CustomEvent("updateamount", {bubbles:true, detail:{"cartId":cartId, "amount":amount}});
        
        this.element.dispatchEvent(updateAmout);
    }
    
}