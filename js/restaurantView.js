class RestaurantView {
    constructor() {
        this.main = document.getElementsByTagName("main")[0];
        this.categories = document.getElementById("categories");
    }

    init() {
        // Las categorías.
        this.categories.replaceChildren();
        this.categories.insertAdjacentHTML("afterbegin",
            `<div class="category">
                <a data-category="Estrella" href="#"><h1>Estrella</h1>
                </div>
                <div class="category">
                <a data-category="Tradicional" Principales" href="#">Tradicional<h1></h1>
                </div>
                <div class="category">
                <a data-category="Postre" href="#"><h1>Postre</h1>
            </div>`
        );

        // 3 platos aleatorios(en proceso)
        this.main.replaceChildren();
        this.main.insertAdjacentHTML(
            "afterbegin",
            `<div class="row justify-content-md-center principal">
            <div class="col-md-auto">
                <figure>
                    <p>Cocina en directo</p>
                    <img class="grande" src="img/imagenChef.jpg" alt="plato en directo" />
                </figure>
            </div>
    
            <div class="col-md-auto">
                <figure>
                    <p>Especialidades</p>
                    <img class="grande" src="img/pulpoGallega.jpg" alt="especialidad del día" />
                </figure>
            </div>
    
            <div class="col-md-auto">
                <figure>
                    <p>Cocina en directo</p>
                    <img class="grande" src="img/imagenChef.jpg" alt="plato en directo" />
                </figure>
            </div>
          </div>`
        );
    }


    showCategories(categories) {
        if (this.categories.children.length > 1) this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = 'category-list';
        container.classList.add('row');
        for (const category of categories) {
            container.insertAdjacentHTML('beforeend',
                `<div class="col-lg-3 col-md-6">
                    <a data-category="${category.name}" href="#product-list">
                        <div class="cat-list-image"><img alt="${category.name}" src="${category.image}" />
                        </div>
                        <div class="cat-list-text">
                        <h3>${category.name}</h3>
                        <div>${category.description}</div>
                        </div>
                    </a>
                </div>`);
        }
        this.categories.append(container);
    }

    // Métodos bind.
    bindInit(handler) {
        document.getElementById("init").addEventListener("click", (event) => {
            handler();
        });
    }
}
export default RestaurantView;
