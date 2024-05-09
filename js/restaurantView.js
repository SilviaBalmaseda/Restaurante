const EXCECUTE_HANDLER = Symbol('excecuteHandler');

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

    this.productWindow = null;
  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url,
    event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    console.log(scroll);
    if (scroll) scroll.scrollIntoView();
    //$(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
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

  // Hijos de migas de pan.
  showChildrenBreadcrumbs(type) {
    this.breadcrumb.insertAdjacentHTML("beforeend",
      `<li class="breadcrumb-item" id="breadcrumb-item1">
        <a href="#">${type.name}</a>
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

  // Mostrar el nombre del elemento(type) seleccionado en el despegable.
  showSelectedType(type) {
    this.categoryArea.replaceChildren();
    this.categoryArea.insertAdjacentHTML("beforeend",
      `<div class="col-md-auto">
        <p>${type.name}</p>
      </div>`
    );
  }

  // Mostrar 3 platos random.
  showRandomDishes(dishes) {
    const num = 3;
    this.mainArea.replaceChildren();

    const array = Array.from(dishes); // Guardamos en un array auxiliar.
    for (let index = 0; index < num; index++) {
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

  // Mostrar la carta del plato(value) en la zona pasada(area), la 'cadena' -> abrir la descripción.
  showMenuDishe(area, value, cadena = "1") {
    area.insertAdjacentHTML("beforeend",
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

            <button data-name="${value.name}" data-img="${value.image}" 
              data-desc="${value.description}" data-ing="${value.ingredients}" 
              class="btn btn-dark openWindowButton" type="button">
                Abrir página
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
  }

  // Método para mostrar los platós(dishes) según el elemento(type) seleccionado(button) de los despegables, 'handleOpenWindow' -> abrir nueva ventana.
  showDishes(handleOpenWindow, button, type, dishes) {
    // Verificar si el botón existe y si ya se le agregó un evento clic.
    if (button) {
      // Eliminar cualquier evento clic anterior.
      button.removeEventListener('click', this.typeClickHandler);

      // Definir el manejador de eventos clic.
      this.typeClickHandler = (event) => {
        // Prevenir el comportamiento por defecto del enlace.
        event.preventDefault();

        // Eliminamos la anterior categoría si se ha seleccionado.
        if (document.getElementById("breadcrumb-item1")) {
          this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
        }

        let cont = 1; // Variable contador para los botones de descripción.

        this.mainArea.replaceChildren();
        // Si el id del botón empieza por 'men-' ejecuta el código del menú y si no el de categoría y alérgenos.
        if (button.id.startsWith('men-')) {
          // Migas de pan(añadimos el hijo).
          this.showChildrenBreadcrumbs(type.elem);

          // Para recorrer los platos(value). 
          type.dishes.entries().forEach(([key, value]) => {
            // Para los botones de descripción.
            let cadena = "dis" + cont++;

            this.showMenuDishe(this.mainArea, value, cadena);
          });

          // Mostramos la categoría seleccionada.
          this.showSelectedType(type.elem);
        }
        // Para categoría y alérgenos.
        else {
          // Migas de pan(añadimos el hijo).
          this.showChildrenBreadcrumbs(type);

          for (const diss of dishes) {
            if (diss.categories.get(type.name) === type || diss.allergens.get(type.name) === type) {
              // Para los botones de descripción.
              let cadena = "dis" + cont++;

              this.showMenuDishe(this.mainArea, diss.elem, cadena);
            }
          }

          // Mostramos la categoría seleccionada.
          this.showSelectedType(type);
        }

        this.bindOpenWindow(handleOpenWindow);
      };

      // Agregar el evento clic al botón de categoría.
      button.addEventListener('click', this.typeClickHandler);
    }

  }

  // Mostrar platos de la categoría seleccionada.
  showThatCategories(cats, dishes, handleOpenWindow) {
    // Recorremos las categorías.
    for (const category of cats) {
      // Botón de categoría.
      const categoryButton = document.getElementById(`cat-${category.name}`);

      this.showDishes(handleOpenWindow, categoryButton, category, dishes);
    }
  }

  // Mostrar platos del alérgeno seleccionado.
  showThatAllergens(alls, dishes, handleOpenWindow) {
    // Recorremos los alérgenos.
    for (const allergen of alls) {
      // Botón de alérgenos.
      const allergenButton = document.getElementById(`all-${allergen.name}`);

      this.showDishes(handleOpenWindow, allergenButton, allergen, dishes);
    }
  }

  // Mostrar platos del menú seleccionado.
  showThatMenus(mens, handleOpenWindow) {
    // Recorremos los menús.
    for (const men of mens) {
      // Botón de menú.
      const menButton = document.getElementById(`men-${men.elem.name}`);

      this.showDishes(handleOpenWindow, menButton, men);
    }
  }

  // Mostrar información del restaurante seleccionado.
  showThatRestaurants(rests) {
    // Recorremos los restaurantes.
    for (const rest of rests) {
      // Botón de restaurante.
      const restButton = document.getElementById(`res-${rest.name}`);

      // Verificar si el botón existe y si ya se le agregó un evento clic.
      if (restButton) {

        // Eliminar cualquier evento clic anterior.
        restButton.removeEventListener('click', this.restClickHandler);

        // Definir el manejador de eventos clic.
        this.restClickHandler = (event) => {
          // Prevenir el comportamiento por defecto del enlace.
          event.preventDefault();

          // Eliminamos el anterior hijo si se ha seleccionado.
          if (document.getElementById("breadcrumb-item1")) {
            this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
          }
          // Migas de pan(añadimos el hijo).
          this.showChildrenBreadcrumbs(rest);

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

          // Quitamos el tipo seleccionado del categoryArea.
          this.categoryArea.replaceChildren();
        };

        // Agregar el evento clic al botón de alérgenos.
        restButton.addEventListener('click', this.restClickHandler);
      }
    }
  }

  // Generar el botón de cierre de todas la ventanas nuevas.
  showCloseAllWindowsButton() {
    this.mainArea.insertAdjacentHTML("afterend",
      `<button id="closeAllWindowsButton" class="btn btn-dark btn-lg">Cerrar ventanas</button>`
    );
  }

  // bindOpenWindow(handler) {
  //   console.log("---------------");
  //   const buttons = mainArea.getElementsByClassName('openWindowButton');
  //   for (const button of buttons) {
  //     button.addEventListener('click', (event) => {
  //       // se puede usar así(event.currentTarget) o button.
  //       handler(button.dataset.name);
  //     });
  //   }
  // }

  bindOpenWindow(handler) {
    const buttons = mainArea.getElementsByClassName('openWindowButton');
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        if (!this.productWindow || this.productWindow.closed) {
          // this.productWindow = window.open('auxPage.html', 'ProductWindow', 'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no');
          this.productWindow = window.open('auxPage.html', '_blank', 'width=600,height=400');
          this.productWindow.addEventListener('DOMContentLoaded', () => {
            handler(event.target.dataset.name);
          });
        } else {
          handler(event.target.dataset.name);
          this.productWindow.focus();
        }
      });
    }
  }

  showDishInNewWindow(dish, message, cadena = 'd1') {
    const main = this.productWindow.document.querySelector('main');
    const header = this.productWindow.document.querySelector('header nav');
    main.replaceChildren();
    header.replaceChildren();
    let container;
    if (product) {
      this.productWindow.document.title = `${dish.name}`;
      header.insertAdjacentHTML('beforeend', `<h1 data-name="${dish.name}" class="">${dish.name}</h1>`);
      container = document.createElement('div');
      container.id = 'prueba';
      // container.classList.add(`${product.constructor.name}-style`);
      // container.classList.add('container');
      // container.classList.add('mt-5');
      // container.classList.add('mb-5');
      container.insertAdjacentHTML('beforeend', `
        <div class="row d-flex justify-content-center">
            <div class="col">
            <div class="card" style="width: 23rem">
              <img class="tamImg" src="./img/${dish.image}" alt="Imagen del plato: ${value.name}" />
              <div class="card-body">
                <h5 class="card-title">${dish.name}</h5>

                <button class="btn btn-dark" type="button"
                  data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
                  aria-controls="${cadena}">
                    Descripción
                </button>

                <button data-name="${dish.name}" data-img="${dish.image}" 
                  data-desc="${dish.description}" data-ing="${dish.ingredients}" 
                  class="btn btn-dark openWindowButton" type="button">
                    Abrir página
                </button>

                <div class="collapse" id="${cadena}">
                  <div class="card-text">
                    Descripción: ${dish.description}. 
                    Incredientes: ${dish.ingredients}      
                  </div>
                </div>
              </div>
            </div>
          </div>
  			</div>`);
      main.append(container);
    } else {
      container = document.createElement('div');
      container.classList.add('container');
      container.classList.add('mt-5');
      container.classList.add('mb-5');
      container.insertAdjacentHTML('beforeend', `<div class="row d-flex justify-content-center">${message}</div>`);
    }
    main.append(container);
    this.productWindow.document.body.scrollIntoView();
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
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#',
        event);
    });
  }

  // Devuelve un entero random entre 0 y el máximo pasado por parámetro.
  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

}
export default RestaurantView;
