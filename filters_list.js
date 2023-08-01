import DoubleSlider from "./filters_double_slider.js";

export default class FiltersList {
    constructor(dataCategories = [], dataBrands = []) {
        this.dataCategories = dataCategories;
        this.dataBrands = dataBrands;

        this.filtersComponents = {};

        this.render();
        this.renderFiltersComponents();
        this.renderCategoriesBrands();

        this.addEventListeners();
        this.addEventListenersButtonClear();
    }

    getTemplate() {
        return `
            <section>
                <div class="wrapper-filters-list">
                    <section class="block-slider">
                        <h2 class="block-slider-text">Prise</h2>

                        <section class="wrapper-slider">
                            <!--Slider Price-->
                        </section>
                    </section>
            
            
                    <section class="category-filters-list">
            
                        <h2 class="block-category-brand">Category</h2>
                
                        <form action="#">
                            ${this.getCategories()}
                        </form>
            
                    </section>
            
            
                    <section class="brand">
            
                        <h2 class="block-category-brand strip">Brand</h2>
                
                        <form action="#">
                            ${this.getBrands()}
                        </form>
            
                        <div class="block-line"></div>
            
                    </section>
            
            
                    <div class="block-slider-rating">
                        <h2 class="block-slider-text">Rating</h2>
                
                        <section class="wrapper-slider">
                            <!--Slider Rating-->
                        </section>
                    </div>
                </div>
                                                                
                <section class="wrapper-butto-clear">
                    <button type="button" class="butto-clear">CLEAR ALL FILTERS</button>
                </section>

            </section>
        `;
    }

    getCategories() {
        return `
            <ul class="blocks-cat-list" data-category-list="category">
                <!--CategoriesTemplate-->
            </ul>
        `
    }

    getCategoriesTemplate(item, name) {
        return `
            <li class="blocks-cat-br">
                <input type="checkbox" id="blocks-category-${name}" class="cursor-filter-list" name="category" value="${name}">
                <label for="blocks-category-${name}" class="cursor-filter-list none-style-filters text-color-filters">${item}</label>
            </li>
        `
    }

    getBrands() {
        return `
            <ul class="blocks-cat-list" data-brand-list="brand">
                <!--BrandsTemplate-->
            </ul>
        `
    }

    getBrandsTemplate(item, name) {
        return `
            <li class="blocks-cat-br">
                <input type="checkbox" id="blocks-brand-${name}" class="cursor-filter-list" name="brand" value="${name}">
                <label for="blocks-brand-${name}" class="cursor-filter-list none-style-filters text-color-filters">${item}</label>
            </li>
        `
    }

    render() {
        const wrapper = document.createElement("div");

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }

    renderCategoriesBrands() {
        const categori = this.dataCategories.map(item => {
            const name = item.toLowerCase().split(" ").join("_");
            
            return this.getCategoriesTemplate(item, name);
        }).join("");

        const brand = this.dataBrands.map(item => {
            let name = "";
            // на backend не корректно написано в массиве бренд A4Tech
            if(item === "A4Tech") {name = "a4-tech"}
            else{name = item.toLowerCase().split(" ").join("_");}
            
            return this.getBrandsTemplate(item, name);
        }).join("");
        
        const bodyCategori = this.element.querySelector('[data-category-list="category"]');
        const bodyBrand = this.element.querySelector('[data-brand-list="brand"]');

        bodyCategori.innerHTML = categori;
        bodyBrand.innerHTML = brand;
    }

    initFiltersComponents() {
        const price = new DoubleSlider({
            min: 0,
            max: 85000,
            precision: 0,
            filterName: 'price'
        });

        this.filtersComponents.price = price;

        const rating = new DoubleSlider({
            min: 0,
            max: 5,
            precision: 2,
            filterName: 'rating'
        });

        this.filtersComponents.rating = rating;
    }

    renderFiltersComponents() {
        const price = new DoubleSlider({
            min: 0,
            max: 85000,
            precision: 0,
            filterName: 'price'
        });

        this.filtersComponents.price = price;

        const bodyPrice = this.element.querySelector(".block-slider .wrapper-slider");
        bodyPrice.append(price.element);

        const rating = new DoubleSlider({
            min: 0,
            max: 5,
            precision: 2,
            filterName: 'rating'
        });

        this.filtersComponents.rating = rating;
        
        const bodyRating = this.element.querySelector(".block-slider-rating .wrapper-slider");
        bodyRating.append(rating.element);
    }

    update(dataCategories = [], dataBrands = []) {
        this.dataCategories = dataCategories;
        this.dataBrands = dataBrands;

        this.renderCategoriesBrands();
    }

    addEventListeners() {
        const categoriesList = this.element.querySelector('[data-category-list="category"]');
        const brandsList = this.element.querySelector('[data-brand-list="brand"]');
        
        categoriesList.addEventListener("click", event => {
            const filtersCategories = event.target.closest('.blocks-cat-br input');
            
            if(filtersCategories === null) return;
             
            let stateElement = filtersCategories.checked;
            let block = "category";
            let filtersName = filtersCategories.value;
            
            this.dispatchEvent(block, filtersName, stateElement);
        });

        brandsList.addEventListener("click", event => {
            const filtersBrands = event.target.closest('.blocks-cat-br input');
            
            if(filtersBrands === null) return;
             
            let stateElement = filtersBrands.checked;
            let block = "brand";
            let filtersName = filtersBrands.value;
            
            this.dispatchEvent(block, filtersName, stateElement);
        });
    }

    dispatchEvent(block, filtersName, stateElement) {
        const customEvent = new CustomEvent("categories-brands", {detail:{nameBlock:block, filters:filtersName, state:stateElement}});

        this.element.dispatchEvent(customEvent);
    }

    clearFilters() {
        const filters = this.element.querySelectorAll("input[type=checkbox]");
        
        for(const item of filters) {item.checked = false;};

        this.filtersComponents.price.reset();
        this.filtersComponents.rating.reset();
    }

    addEventListenersButtonClear() {
        const buttonSection = this.element.querySelector(".wrapper-butto-clear");

        buttonSection.addEventListener("click", event => {
            const button = event.target.closest('.wrapper-butto-clear button');
            
            if(button === null) return;
            console.log("button=", button);

            this.clearFilters();
                        
            this.dispatchEventClear();
        });
    }

    dispatchEventClear() {
        const customEvent = new CustomEvent("clear-filters");

        this.element.dispatchEvent(customEvent);
    }
}
