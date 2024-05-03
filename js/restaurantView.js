class RestaurantView {
  constructor() {
    this.breadcrumb = document.getElementById("breadcrumb");
    this.main = document.getElementsByTagName("main")[0];
    this.categories = document.getElementById("categories");
    this.categoryArea = document.getElementById("categoryArea");
    this.allergens = document.getElementById("allergens");
    this.menus = document.getElementById("menus");
    this.restaurants = document.getElementById("restaurants");
    this.mainArea = document.getElementById("mainArea");
  }

  init() {
    // Migas de pan.
    this.showBreadcrumb();
  }

  // Migas de pan.
  showBreadcrumb() {
    this.breadcrumb.replaceChildren();
    this.breadcrumb.insertAdjacentHTML("beforeend",
      `<li class="breadcrumb-item">
            <a id="init" href="#">Inicio</a>
       </li>`
    );
  }

  // Mostrar categorías en el main.
  showCategoriesMain(cats) {
    this.categoryArea.replaceChildren();
    for (const category of cats) {
      this.categoryArea.insertAdjacentHTML("beforeend",
        `<div class="col-md-auto">
          <a id="cat-${category.name}" href="#">${category.name}</a>
        </div>`
      );
    }
  }

  // Desplegables.

  showCategories(cats) {
    this.categories.replaceChildren();
    for (const category of cats) {
      this.categories.insertAdjacentHTML(
        "beforeend",
        `<li>
            <a class="dropdown-item" id="cat-${category.name}">${category.name}</a>
        </li>`
      );
    }
  }

  showAllergens(alls) {
    this.allergens.replaceChildren();
    for (const allergen of alls) {
      this.allergens.insertAdjacentHTML(
        "beforeend",
        `<li>
            <a class="dropdown-item" id="all-${allergen.name}">${allergen.name}</a>
        </li>`
      );
    }
  }

  showMenus(mens) {
    this.menus.replaceChildren();
    for (const men of mens) {
      this.menus.insertAdjacentHTML(
        "beforeend",
        `<li>
            <a class="dropdown-item" id="men-${men.name}">${men.elem.name}</a>
        </li>`
      );
    }
  }

  showRestaurants(rests) {
    this.restaurants.replaceChildren();
    for (const rest of rests) {
      this.restaurants.insertAdjacentHTML(
        "beforeend",
        `<li>
            <a class="dropdown-item" id="res-${rest.name}">${rest.name}</a>
        </li>`
      );
    }
  }

  // Mostrar 3 platos random.
  showRandomDishes(dishes) {
    this.mainArea.replaceChildren();

    const array = Array.from(dishes); // Guardamos en un array.
    for (let index = 0; index < 3; index++) {
      // Para no repetir el plato le borramos.
      let diss = array.splice(this.getRandom(array.length), 1);

      this.mainArea.insertAdjacentHTML("afterbegin",
        `<div class="col-md-auto mainArea">
          </figure>
                  <p>${diss[0].elem.name}</p>
                  <img class="grande" src="./img/${diss[0].elem.image}" alt="Imagen del plato: ${diss[0].elem.name}" />
          </figure>
        </div>`);
    }
  }

  showThatCategories(cats, dishes) {
    // Recorremos las categorías.
    for (const category of cats) {
      // Obtener el ID del botón de categoría
      const buttonId = `cat-${category.name}`;
      // Obtener el botón de categoría por su ID
      const categoryButton = document.getElementById(buttonId);
      console.log(categoryButton);

      // Verificar si el botón existe y si ya se le agregó un evento clic
      if (categoryButton) {

        // Eliminar cualquier evento clic anterior
        categoryButton.removeEventListener('click', this.categoryClickHandler);

        // Definir el manejador de eventos clic
        this.categoryClickHandler = (event) => {
          // Prevenir el comportamiento por defecto del enlace
          event.preventDefault();

          // Migas de pan(añadimos la categoría que se ha seleccionado).
          this.breadcrumb.insertAdjacentHTML("beforeend",
            `<li class="breadcrumb-item">
                <a href="#">${category.name}</a>
            </li>`
          );


          this.mainArea.replaceChildren();

          let cont = 1; // Variable contador para los botones de descripción.

          for (const diss of dishes) {
            if (diss.categories.get(category.name) === category) {

              // this.mainArea.insertAdjacentHTML("beforeend",
              //   `<div class="row">
              //   </div>`);


              // Para los botones de descripción.
              let cadena = "cl" + cont++;

              this.mainArea.insertAdjacentHTML("beforeend",
                `<div class="col">
                  <div class="card" style="width: 22.6rem">
                    <img class="tamImg" src="./img/${diss.elem.image}" alt="Imagen del plato: ${diss.elem.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${diss.elem.name}</h5>

                        <button class="btn btn-dark" type="button"
                                data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
                                aria-controls="${cadena}">
                            Descripción
                        </button>

                        <div class="collapse">
                            <div class="card-text">
                              ${diss.elem.description}
                            </div>
                        
                            <div class="card-text">
                              ${diss.elem.ingredients}
                            </div>
                        </div>
                    </div>
                  </div>
                </div>`);

              //   this.mainArea.insertAdjacentHTML("beforeend",
              //     `<div class="col-md-auto mainArea">
              //         <figure>
              //             <p>${diss.elem.name}</p>
              //             <img class="grande" src="./img/${diss.elem.image}" alt="Imagen del plato: ${diss.elem.name}" />
              //         </figure>
              //     </div>`);
            }
          }
        };

        // Agregar el evento clic al botón de categoría.
        categoryButton.addEventListener('click', this.categoryClickHandler);
      }
    }
  }


  // Métodos bind.
  bindInit(handler) {
    // Les pone el enlace a los de inicio.
    document.querySelectorAll('#init').forEach(function (init) {
      init.setAttribute('href', 'index.html');
    });

    document.getElementById('init').addEventListener("click", (event) => {
      handler();
    });
  }

  // Devuelve un entero random entre 0 y el máximo pasado por parámetro.
  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

}
export default RestaurantView;
