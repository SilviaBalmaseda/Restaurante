// const EXCECUTE_HANDLER = Symbol('excecuteHandler');

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

  // [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url,
  //   event) {
  //   handler(...handlerArguments);
  //   const scroll = document.querySelector(scrollElement);
  //   console.log(scroll);
  //   if (scroll) scroll.scrollIntoView();
  //   //$(scrollElement).get(0).scrollIntoView();
  //   history.pushState(data, null, url);
  //   event.preventDefault();
  // }

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
        `<li id="category-list">
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
        `<li id="allergen-list">
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
        `<li id="menu-list">
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
        `<li id="rest-list">
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
      this.categoryButton = document.getElementById(`cat-${category.name}`);

      this.showDishes(handleOpenWindow, this.categoryButton, category, dishes);
    }
  }

  // Mostrar platos del alérgeno seleccionado.
  showThatAllergens(alls, dishes, handleOpenWindow) {
    // Recorremos los alérgenos.
    for (const allergen of alls) {
      // Botón de alérgenos.
      this.allergenButton = document.getElementById(`all-${allergen.name}`);

      this.showDishes(handleOpenWindow, this.allergenButton, allergen, dishes);
      
    }
  }

  // Mostrar platos del menú seleccionado.
  showThatMenus(mens, handleOpenWindow) {
    // Recorremos los menús.
    for (const men of mens) {
      // Botón de menú.
      this.menButton = document.getElementById(`men-${men.elem.name}`);

      this.showDishes(handleOpenWindow, this.menButton, men);
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
            `<section id="rest-list">
              <div><h1>${rest.name}</h1></div>
              <div>
                Descripción: ${rest.description}.
              </div>
              <div>
                Coordenadas: ${rest.location}.
              </div>
            </section>`
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

  // Devolver el nombre del plato y luego handler(abrir ventana nueva). 
  bindOpenWindow(handler) {
    const buttons = mainArea.getElementsByClassName('openWindowButton');
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        // se puede usar así(event.currentTarget) o button.
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Si le ha dado click cerrar todas las ventanas abiertas(handler).
  bindCloseAllWindows(handler) {
    const closeAllWindowsButton = document.getElementById('closeAllWindowsButton');
    closeAllWindowsButton.addEventListener('click', handler);
  }

  // Para el history.
  // bindProductsCategoryList(handler) {
  //   const categoryList = document.getElementById('category-list');
  //   const links = categoryList.querySelectorAll('a');
  //   for (const link of links) {
  //     link.addEventListener('click', (event) => {
  //       const { category } = event.currentTarget.dataset;
  //       this[EXCECUTE_HANDLER](
  //         handler,
  //         [category],
  //         '#product-list',
  //         { action: 'productsCategoryList', category },
  //         '#category-list',
  //         event,
  //       );
  //     });
  //   }
  // }

  // bindProductsCategoryListInMenu(handler) {
  //   const navCats = document.getElementById('category-list');
  //   const links = navCats.nextSibling.querySelectorAll('a');
  //   for (const link of links) {
  //     link.addEventListener('click', (event) => {
  //       const { category } = event.currentTarget.dataset;
  //       this[EXCECUTE_HANDLER](
  //         handler,
  //         [category],
  //         '#product-list',
  //         { action: 'productsCategoryList', category },
  //         '#category-list',
  //         event,
  //       );
  //     });
  //   }
  // }

  // Devuelve un entero random entre 0 y el máximo pasado por parámetro.
  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

}
export default RestaurantView;
