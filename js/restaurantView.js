class RestaurantView {
    constructor() {
        this.main = document.getElementsByTagName('main')[0];

    }

    init() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin',
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
          </div>`);
    }

    // Métodos bind.
    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            handler();
        });
        /** 
        document.getElementById('logo').addEventListener('click', (event) => {
            handler();
        });
        */
    }
}
export default RestaurantView;