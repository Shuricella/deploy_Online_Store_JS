export default class Card {
    constructor(someProduct) {
        this.state = someProduct;

        this.myRender();

        this.isErrorImage();

        this.addEventListeners();
    }
                          
    getTemplate() {
        return `
            <main class="wrapper-card">

                <section class="block-img">
                <!-- height="200" -->
                    <img src="${this.state.images[0]}" alt="${this.state.category}: ${this.state.brand}">
                </section>

                <section class="block-rating-price">

                <div class="block-rating">
                    <div>${this.state.rating}</div>
                    <div><i class="bi bi-star"></i></div>
                </div>

                <div class="block-price">${this.state.price}</div>

                </section>

                <section class="bloсk-description-type">

                <div class="bloсk-description">
                    <h1>${this.state.title}</h1>
                </div>

                <div class="block-type">
                    <p>${this.state.category}</p>
                </div>

                </section>

                <section class="block-button-add">
                <p>Add To Cart</p>
                </section>

            </main>
        `;
    }

    isErrorImage() {
        const imgBlock = this.element.querySelector('.block-img img');
        
        imgBlock.onerror = function(error) {
            imgBlock.src = "./wolf.jpg";
        };
    }

    update(data = {}) {
        this.state = data;
        this.element.innerHTML = this.getTemplate();
    }

    myRender() {
        const wrapper = document.createElement("div");

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }

    addEventListeners() {
        const button = this.element.querySelector('.block-button-add');
        
        button.addEventListener("click", event => {
            this.dispatchEvent(this.state);
        })
    }

    dispatchEvent(data = {}) {
    const cardEvent = new CustomEvent("cardeventadd", {bubbles:true, detail: data});
        
        this.element.dispatchEvent(cardEvent);
    }
};