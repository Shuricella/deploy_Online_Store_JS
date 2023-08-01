export default class Search {
    constructor() {
        this.render();
        
        this.addEventListeners();
    }

    getTemplate() {
        return `
            <div class="wrapper-search-component">
                <form action="#" class="search-text">
                    <input type="search" class="line-search" placeholder="Search">
                </form>

                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </div>
        `;
    }

    render() {
        const wrapper = document.createElement("div");

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper;
    }

    clearSearch() {
        const textField = this.element.querySelector('.search-text input');
        
        textField.value = "";
    }

    addEventListeners() {
        let search = this.element.querySelector('.wrapper-search-component');
        
        search.addEventListener("change", event => {
            const textField = event.target.closest('.search-text input');
            
            if(textField === null) return;

            let searchText = textField.value;
            
            this.dispatchEvent(searchText);
        });
    }

    dispatchEvent(searchText) {
        const customEvent = new CustomEvent("search", {detail:searchText});
        
        this.element.dispatchEvent(customEvent);
    }

}