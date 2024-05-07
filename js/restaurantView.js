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
      `<li class="breadcrumb-item" id="breadcrumb-item">
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
            <a class="dropdown-item" id="men-${men.elem.name}">${men.elem.name}</a>
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

  showThatCategories(cats, dishes, handleOpenWindow) {
    // Recorremos las categorías.
    for (const category of cats) {
      // Obtener el id del botón de categoría.
      const buttonId = `cat-${category.name}`;
      // Botón de categoría.
      const categoryButton = document.getElementById(buttonId);

      // Verificar si el botón existe y si ya se le agregó un evento clic.
      if (categoryButton) {

        // Eliminar cualquier evento clic anterior.
        categoryButton.removeEventListener('click', this.categoryClickHandler);

        // Definir el manejador de eventos clic.
        this.categoryClickHandler = (event) => {
          // Prevenir el comportamiento por defecto del enlace.
          event.preventDefault();

          // Eliminamos la anterior categoría si se ha seleccionado.
          if (document.getElementById("breadcrumb-item1")) {
            this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
          }
          // Migas de pan(añadimos la categoría que se ha seleccionado).
          this.breadcrumb.insertAdjacentHTML("beforeend",
            `<li class="breadcrumb-item" id="breadcrumb-item1">
                <a href="#">${category.name}</a>
            </li>`
          );

          let array = [];
          let cont = 1; // Variable contador para los botones de descripción.

          this.mainArea.replaceChildren();
          for (const diss of dishes) {
            if (diss.categories.get(category.name) === category) {
              // Para los botones de descripción.
              let cadena = "dis" + cont++;

              this.mainArea.insertAdjacentHTML("beforeend",
                `<div class="col">
                  <div class="card" style="width: 23rem">
                    <img class="tamImg" src="./img/${diss.elem.image}" alt="Imagen del plato: ${diss.elem.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${diss.elem.name}</h5>

                        <button class="btn btn-dark" type="button" 
                          data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
                          aria-controls="${cadena}">
                            Descripción
                        </button>

                        <button data-name="${diss.elem.name}" class="btn btn-dark openWindowButton" type="button">
                            Abrir página
                        </button>

                        <div class="collapse" id="${cadena}">
                            <div class="card-text">
                                Descripción: ${diss.elem.description}. 
                                Incredientes: ${diss.elem.ingredients}      
                            </div>
                        </div>
                    </div>
                  </div>
                </div>`);
            }

          }

          this.bindOpenWindow(handleOpenWindow);
        };

        // Agregar el evento clic al botón de categoría.
        categoryButton.addEventListener('click', this.categoryClickHandler);

        // Seleccionar el botón(abrir ventana) después de agregarlo al DOM.
        // this.openWindowButton = document.getElementById('openWindowButton');
      }
    }
  }

  // La buena
  // showThatCategories(cats, dishes) {
  //   // Recorremos las categorías.
  //   for (const category of cats) {
  //     // Obtener el id del botón de categoría.
  //     const buttonId = `cat-${category.name}`;
  //     // Botón de categoría.
  //     const categoryButton = document.getElementById(buttonId);

  //     // Verificar si el botón existe y si ya se le agregó un evento clic.
  //     if (categoryButton) {

  //       // Eliminar cualquier evento clic anterior.
  //       categoryButton.removeEventListener('click', this.categoryClickHandler);

  //       // Definir el manejador de eventos clic.
  //       this.categoryClickHandler = (event) => {
  //         // Prevenir el comportamiento por defecto del enlace.
  //         event.preventDefault();

  //         // Eliminamos la anterior categoría si se ha seleccionado.
  //         if (document.getElementById("breadcrumb-item1")) {
  //           this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
  //         }
  //         // Migas de pan(añadimos la categoría que se ha seleccionado).
  //         this.breadcrumb.insertAdjacentHTML("beforeend",
  //           `<li class="breadcrumb-item" id="breadcrumb-item1">
  //               <a href="#">${category.name}</a>
  //           </li>`
  //         );

  //         let cont = 1; // Variable contador para los botones de descripción.

  //         this.mainArea.replaceChildren();
  //         for (const diss of dishes) {
  //           if (diss.categories.get(category.name) === category) {
  //             // Para los botones de descripción.
  //             let cadena = "dis" + cont++;

  //             this.mainArea.insertAdjacentHTML("beforeend",
  //               `<div class="col">
  //                 <div class="card" style="width: 23rem">
  //                   <img class="tamImg" src="./img/${diss.elem.image}" alt="Imagen del plato: ${diss.elem.name}" />
  //                   <div class="card-body">
  //                       <h5 class="card-title">${diss.elem.name}</h5>

  //                       <button class="btn btn-dark" type="button"
  //                               data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
  //                               aria-controls="${cadena}">
  //                           Descripción
  //                       </button>

  //                       <button id="openWindowButton" class="btn btn-dark" type="button">
  //                           Abrir página
  //                       </button>

  //                       <div class="collapse" id="${cadena}">
  //                           <div class="card-text">
  //                             Descripción: ${diss.elem.description}. 
  //                             Incredientes: ${diss.elem.ingredients}      
  //                           </div>
  //                       </div>
  //                   </div>
  //                 </div>
  //               </div>`);
  //           }
  //         }
  //       };

  //       // Agregar el evento clic al botón de categoría.
  //       categoryButton.addEventListener('click', this.categoryClickHandler);
  //     }
  //   }
  // }

  showThatAllergens(alls, dishes) {
    // Recorremos las categorías.
    for (const allergen of alls) {
      // Obtener el id del botón de categoría.
      const buttonId = `all-${allergen.name}`;
      // Botón de categoría.
      const allergenButton = document.getElementById(buttonId);

      // Verificar si el botón existe y si ya se le agregó un evento clic.
      if (allergenButton) {

        // Eliminar cualquier evento clic anterior.
        allergenButton.removeEventListener('click', this.allergenClickHandler);

        // Definir el manejador de eventos clic.
        this.allergenClickHandler = (event) => {
          // Prevenir el comportamiento por defecto del enlace.
          event.preventDefault();

          // Eliminamos la anterior categoría si se ha seleccionado.
          if (document.getElementById("breadcrumb-item1")) {
            this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
          }
          // Migas de pan(añadimos la categoría que se ha seleccionado).
          this.breadcrumb.insertAdjacentHTML("beforeend",
            `<li class="breadcrumb-item" id="breadcrumb-item1">
                <a href="#">${allergen.name}</a>
            </li>`
          );

          let cont = 1; // Variable contador para los botones de descripción.

          this.mainArea.replaceChildren();
          for (const diss of dishes) {
            if (diss.allergens.get(allergen.name) === allergen) {

              // Para los botones de descripción.
              let cadena = "dis" + cont++;

              this.mainArea.insertAdjacentHTML("beforeend",
                `<div class="col">
                  <div class="card" style="width: 23rem">
                    <img class="tamImg" src="./img/${diss.elem.image}" alt="Imagen del plato: ${diss.elem.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${diss.elem.name}</h5>

                        <button class="btn btn-dark" type="button"
                                data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
                                aria-controls="${cadena}">
                            Descripción
                        </button>
                        
                        <div class="collapse" id="${cadena}">
                            <div class="card-text">
                              Descripción: ${diss.elem.description}. 
                              Incredientes: ${diss.elem.ingredients}      
                            </div>
                        </div>
                    </div>
                  </div>
                </div>`);
            }
          }

          // Quitamos la categorías del main.
          this.categoryArea.replaceChildren();
        };

        // Agregar el evento clic al botón de alérgenos.
        allergenButton.addEventListener('click', this.allergenClickHandler);
      }
    }
  }

  showThatMenus(mens) {
    // Recorremos las categorías.
    for (const men of mens) {
      // Obtener el id del botón de categoría.
      const buttonId = `men-${men.elem.name}`;
      // Botón de categoría.
      const menButton = document.getElementById(buttonId);

      // Verificar si el botón existe y si ya se le agregó un evento clic.
      if (menButton) {

        // Eliminar cualquier evento clic anterior.
        menButton.removeEventListener('click', this.menClickHandler);

        // Definir el manejador de eventos clic.
        this.menClickHandler = (event) => {
          // Prevenir el comportamiento por defecto del enlace.
          event.preventDefault();

          // Eliminamos la anterior categoría si se ha seleccionado.
          if (document.getElementById("breadcrumb-item1")) {
            this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
          }
          // Migas de pan(añadimos la categoría que se ha seleccionado).
          this.breadcrumb.insertAdjacentHTML("beforeend",
            `<li class="breadcrumb-item" id="breadcrumb-item1">
                <a href="#">${men.elem.name}</a>
            </li>`
          );

          let cont = 1; // Variable contador para los botones de descripción.

          this.mainArea.replaceChildren();
          // Para recorres los platos(value). 
          men.dishes.entries().forEach(([key, value]) => {

            // Para los botones de descripción.
            let cadena = "dis" + cont++;

            this.mainArea.insertAdjacentHTML("beforeend",
              `<div class="col">
                <div class="card" style="width: 23rem">
                  <img class="tamImg" src="./img/${value.image}" alt="Imagen del plato: ${value.name}" />
                  <div class="card-body">
                      <h5 class="card-title">${value.name}</h5>

                      <button class="btn btn-dark" type="button"
                              data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
                              aria-controls="${cadena}">
                          Descripción
                      </button>
                      
                      <div class="collapse" id="${cadena}">
                          <div class="card-text">
                            Descripción: ${value.description}. 
                            Incredientes: ${value.ingredients}      
                          </div>
                      </div>
                  </div>
                </div>
              </div>`
            );

            // Quitamos la categorías del main.
            this.categoryArea.replaceChildren();
          });
        };

        // Agregar el evento clic al botón de alérgenos.
        menButton.addEventListener('click', this.menClickHandler);
      }
    }
  }

  showThatRestaurants(rests) {
    // Recorremos las categorías.
    for (const rest of rests) {
      // Obtener el ID del botón de categoría.
      const buttonId = `res-${rest.name}`;
      // Botón de categoría.
      const restButton = document.getElementById(buttonId);

      // Verificar si el botón existe y si ya se le agregó un evento clic.
      if (restButton) {

        // Eliminar cualquier evento clic anterior.
        restButton.removeEventListener('click', this.restClickHandler);

        // Definir el manejador de eventos clic.
        this.restClickHandler = (event) => {
          // Prevenir el comportamiento por defecto del enlace.
          event.preventDefault();

          // Eliminamos la anterior categoría si se ha seleccionado.
          if (document.getElementById("breadcrumb-item1")) {
            this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
          }
          // Migas de pan(añadimos la categoría que se ha seleccionado).
          this.breadcrumb.insertAdjacentHTML("beforeend",
            `<li class="breadcrumb-item" id="breadcrumb-item1">
                <a href="#">${rest.name}</a>
            </li>`
          );

          this.mainArea.replaceChildren();
          this.mainArea.insertAdjacentHTML("beforeend",
            `<div><h1>${rest.name}</h1></div>
            <div>
              Descripción: ${rest.description}.
            </div>
            <div>
              Coordenadas: ${rest.location}.
            </div>`
          );

          // Quitamos la categorías del main.
          this.categoryArea.replaceChildren();
        };

        // Agregar el evento clic al botón de alérgenos.
        restButton.addEventListener('click', this.restClickHandler);
      }
    }
  }

  bindOpenWindow(handler) {
    const buttons = mainArea.getElementsByClassName('openWindowButton');
    console.dir(buttons);
    for (const button of buttons){
      button.addEventListener('click', (event) => {
        // se puede usar así(event.currentTarget) o button.
        handler(event.currentTarget.dataset.name); // devuelve el nombre del plato.
      })
    }
    /*
    document.addEventListener('DOMContentLoaded', () => {
      for (const diss of dishes) {
        let id = "openWindowButton-" + diss;
        const button = document.getElementById(id);
        if (button) {
          button.addEventListener('click', handler);
        } else {
          console.error('No se encontró el botón con el id ' + id);
        }
      }
    });
    */
  }

  bindCloseAllWindows(handler) {
    const closeAllWindowsButton = document.getElementById('closeAllWindowsButton');
    closeAllWindowsButton.addEventListener('click', handler);
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
