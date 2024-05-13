import { createDishValidation } from "./validation.js";

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

  // Hijos de migas de pan.
  showChildrenBreadcrumbs(type) {
    this.breadcrumb.insertAdjacentHTML("beforeend",
      `<li class="breadcrumb-item" id="breadcrumb-item1">
        <a href="#">${type}</a>
      </li>`
    );
  }

  // Mostrar categorías en el main.
  // showCategoriesMain(cats) {
  //   this.categoryArea.replaceChildren();
  //   for (const category of cats) {
  //     this.categoryArea.insertAdjacentHTML("beforeend",
  //       `<div class="col-md-auto">
  //         <a id="cat-${category.name}" href="#">${category.name}</a>
  //       </div>`
  //     );
  //   }
  // }

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
  showDishes(button, type, handleOpenWindow, dishes) {
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
          this.showChildrenBreadcrumbs(type.elem.name);

          // Para recorrer los platos(value). 
          type.dishes.entries().forEach(([key, value]) => {
            // Para los botones de descripción.
            let cadena = "dis" + cont++;

            this.showMenuDishe(this.mainArea, value, cadena);
          });

          // Mostramos la categoría seleccionada.
          this.showSelectedType(type.elem);
        }
        // Para categorías, alérgenos y restaurantes.
        else {
          // Migas de pan(añadimos el hijo).
          this.showChildrenBreadcrumbs(type.name);

          if (button.id.startsWith('res-')) {
            this.mainArea.insertAdjacentHTML("beforeend",
              `<section id="rest-list">
                <div><h1>${type.name}</h1></div>
                <div>
                  Descripción: ${type.description}.
                </div>
                <div>
                  Coordenadas: ${type.location}.
                </div>
              </section>`
            );

          // Quitamos el tipo seleccionado del categoryArea.
          this.categoryArea.replaceChildren();
          }
          // // Para categorías y alérgenos.
          else {
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

      this.showDishes(this.categoryButton, category, handleOpenWindow, dishes);
    }
  }

  // Mostrar platos del alérgeno seleccionado.
  showThatAllergens(alls, dishes, handleOpenWindow) {
    // Recorremos los alérgenos.
    for (const allergen of alls) {
      // Botón de alérgenos.
      this.allergenButton = document.getElementById(`all-${allergen.name}`);

      this.showDishes(this.allergenButton, allergen, handleOpenWindow, dishes);
      
    }
  }

  // Mostrar platos del menú seleccionado.
  showThatMenus(mens, handleOpenWindow) {
    // Recorremos los menús.
    for (const men of mens) {
      // Botón de menú.
      this.menButton = document.getElementById(`men-${men.elem.name}`);

      this.showDishes(this.menButton, men, handleOpenWindow);
    }
  }

  // Mostrar información del restaurante seleccionado.
  showThatRestaurants(rests) {
    // Recorremos los menús.
    for (const rest of rests) {
      // Botón de menú.
      this.restButton = document.getElementById(`res-${rest.name}`);

      this.showDishes(this.restButton, rest);
    }
  }

  // FORMULARIOS

  // Mostrar formulario de platos(Crear).
  showFormCreateDish(categories, allergens){
    let formu = `
      <div class="col">
        <div class="card" style="width: 23rem">
          <div class="card-text">
            <form name="fCreateDish" role="form" class="row g-3 formu" novalidate>
              <h3>Crear plato: </h3>

              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#create1" aria-expanded="false"
              aria-controls="create1">
                CREAR
              </button>
              
              <div class="collapse" id="create1">

                <label class="form-label" for="nameDish">Nombre: </label>
                <input type="text" class="form-control" id="nameDish" name="nameDish"
                  placeholder="Nombre del plato" value="" required>
                <div class="invalid-feedback">El nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>

                <label class="form-label" for="desDish">Descripción: </label>
                <input type="text" class="form-control" id="desDish" name="desDish"
                  placeholder="Descripción del plato" value="">

                <label class="form-label" for="ingDish">Ingredientes: </label>
                <input type="text" class="form-control" id="ingDish" name="ingDish"
                  placeholder="Ingredientes del plato, separar por comas" value="">

                <label class="form-label" for="imgDish">Imágen: </label>
                <input type="file" class="form-control" id="imgDish" name="imgDish"
                  placeholder="Imágen del plato" value="">

                <hr>

                <h3>Asignar plato a categoría: </h3>
                <select name="fCategory" class="form-select" id="fCategory" aria-describedby="fCategory" >
                  <option selected value=''>No tiene categoría</option> 
    `;

    for (const cat of categories) {
      formu += `<option value="${cat.name}">${cat.name}</option>`;
    }

    formu += `</select>
              <h3>Asignar plato a alégeno: </h3>
                <select name="fallergen" class="form-select" id="fallergen" aria-describedby="fallergen" >
                  <option selected value=''>No tiene alérgeno</option> 
    `;

    for (const all of allergens) {
      formu += `<option value="${all.name}">${all.name}</option>`;
    }

      formu +=`</select>
              <button class="btn btn-dark" type="submit">
                  CREAR PLATO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

    this.mainArea.insertAdjacentHTML("beforeend", formu);
  }

  // Mostrar formulario de platos(Eliminar).
  showFormDeleteDishes(dishes){
    let formu = `
      <div class="col">
        <div class="card" style="width: 23rem">
          <div class="card-text">
            <form name="fDeleteDishes" role="form" class="row g-3 formu" novalidate>
              <h3>Eliminar plato: </h3>
              <select name="fDish" class="form-select" id="fDish" aria-describedby="fDish" multiple>
    `;

    for (const dis of dishes) {
      formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `
            </select>
            <button class="btn btn-dark" type="submit">
              ELIMINAR
            </button>
          </form>
        </div>
      </div>
    </div>`;

    this.mainArea.insertAdjacentHTML("beforeend", formu);
  }

  // Mostrar formulario de platos(asignar y desasignar).
  showFormADDishes(dishes, menus){
    let formu = `
      <div class="col">
        <div class="card" style="width: 23rem">
          <div class="card-text">
            <form name="fAsignDesDishes" role="form" class="row g-3 formu" novalidate>
              <h3>Asignar plato a menú: </h3>

              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#asign" aria-expanded="false"
              aria-controls="asign">
                ELEGIR ASIGNACIÓN
              </button>

              <div class="collapse" id="asign">

                <select name="fDish" class="form-select" id="fDish" aria-describedby="fDish" multiple>
    `;

    for (const dis of dishes) {
      formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `</select>
              <select name="fMenus" class="form-select" id="fMenus" aria-describedby="fMenus">
    `;

    for (const men of menus) {
      formu += `<option value="${men.elem.name}">${men.elem.name}</option>`;
    }

    formu += `  </select>
                <button class="btn btn-dark" type="submit">
                  ASIGNAR
                </button>
              </div>

              <hr>

              <h3>Desasignar plato a menú: </h3>
              
              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#desasign" aria-expanded="false"
              aria-controls="desasign">
                ELEGIR DESASIGNACIÓN
              </button>

              <div class="collapse" id="desasign">

                <select name="fDish" class="form-select" id="fDish" aria-describedby="fDish">
    `;

    for (const dis of dishes) {
      formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `</select>
              <select name="fMenus" class="form-select" id="fMenus" aria-describedby="fMenus" multiple>
    `;

    for (const men of menus) {
      formu += `<option value="${men.elem.name}">${men.elem.name}</option>`;
    }

    formu += `
            </select>
            <button class="btn btn-dark" type="submit">
              DESASIGNAR
            </button>
          </form>
        </div>
      </div>
    </div>`;

    this.mainArea.insertAdjacentHTML("beforeend", formu);
  }

  // Mostrar formulario de categorías(Crear y eliminar).
  showFormCategories(categories){
    let formu = `
      <div class="col">
        <div class="card" style="width: 23rem">
          <div class="card-text">
            <form name="fCategory" role="form" class="row g-3 formu" novalidate>
              <h3>Crear categoría: </h3>

              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#create2" aria-expanded="false"
              aria-controls="create2">
                CREAR
              </button>
              
              <div class="collapse" id="create2">

                <label class="form-label" for="nameCat">Nombre: </label>
                <input type="text" class="form-control" id="nameCat" name="nameCat"
                  placeholder="Nombre de la categoría" value="" required>
                <div class="invalid-feedback">El nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>

                <label class="form-label" for="desCat">Descripción: </label>
                <input type="text" class="form-control" id="desCat" name="desCat"
                  placeholder="Descripción de la categoría" value="">

                <button class="btn btn-dark" type="submit">
                  CREAR CATEGORÍA
                </button>
              </div>

              <hr>

              <h3>Eliminar categoría: </h3>
              <select name="fCategory" class="form-select" id="fCategory" aria-describedby="fCategory" multiple>
    `;

    for (const cat of categories) {
      formu += `<option value="${cat.name}">${cat.name}</option>`;
    }

    formu += `
            </select>
            <button class="btn btn-dark" type="submit">
              ELIMINAR
            </button>
          </form>
        </div>
      </div>
    </div>`;

    this.mainArea.insertAdjacentHTML("beforeend", formu);
  }

  // Mostrar formulario de restaurantes(Crear).
  showFormCreateRestaurant(restaurants){
    let formu = `
      <div class="col">
        <div class="card" style="width: 23rem">
          <div class="card-text">
            <form name="fCreateRest role="form" class="row g-3 formu" novalidate>
              <h3>Crear Restaurante: </h3>

              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#create3" aria-expanded="false"
              aria-controls="create3">
                CREAR
              </button>
              
              <div class="collapse" id="create3">

                <label class="form-label" for="nameRest">Nombre: </label>
                <input type="text" class="form-control" id="nameRest" name="nameRest"
                  placeholder="Nombre del restaurante" value="" required>
                <div class="invalid-feedback">El nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>

                <label class="form-label" for="desRest">Descripción: </label>
                <input type="text" class="form-control" id="desRest" name="desRest"
                  placeholder="Descripción del restaurante" value="">

                <label class="form-label" for="latRest">Latitud: </label>
                <input type="number" class="form-control" id="latRest" name="latRest"
                  placeholder="Latitud(entre -90 y 90)" value="" min="-90" max="90">

                <label class="form-label" for="lonRest">Longitud: </label>
                <input type="number" class="form-control" id="lonRest" name="lonRest"
                  placeholder="Longitud(entre -180 y 180)" value="" min="-180" max="180">

                <button class="btn btn-dark" type="submit">
                  CREAR RESTAURANTE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    this.mainArea.insertAdjacentHTML("beforeend", formu);
  }

  // Mostrar formulario para modificar categoría de un plato.
  showFormModifyCategory(dishes, categories){
  let formu = `
    <div class="col">
      <div class="card" style="width: 23rem">
        <div class="card-text">
          <form name="fModifyCategory" role="form" class="row g-3 formu" novalidate>
            <h3>Añadir platos a categoría: </h3>

            <button class="btn btn-dark" type="button"
            data-bs-toggle="collapse" data-bs-target="#add" aria-expanded="false"
            aria-controls="add">
              ELEGIR ASIGNACIÓN
            </button>

            <div class="collapse" id="add">

              <select name="fDish" class="form-select" id="fDish" aria-describedby="fDish" multiple>
  `;

  for (const dis of dishes) {
    formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
  }

  formu += `</select>
            <select name="fCategories" class="form-select" id="fCategories" aria-describedby="fCategories">
  `;

  for (const cat of categories) {
    formu += `<option value="${cat.name}">${cat.name}</option>`;
  }

  formu += `  </select>
              <button class="btn btn-dark" type="submit">
                ASIGNAR
              </button>
            </div>

            <hr>

            <h3>Eliminar platos a categoría: </h3>
            
            <button class="btn btn-dark" type="button"
            data-bs-toggle="collapse" data-bs-target="#desasignC" aria-expanded="false"
            aria-controls="desasignC">
              ELEGIR DESASIGNACIÓN
            </button>

            <div class="collapse" id="desasignC">

              <select name="fDish" class="form-select" id="fDish" aria-describedby="fDish" multiple>
  `;

  for (const dis of dishes) {
    formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
  }

  formu += `</select>
            <select name="fCategories" class="form-select" id="fCategories" aria-describedby="fCategories">
  `;

  for (const cat of categories) {
    formu += `<option value="${cat.name}">${cat.name}</option>`;
  }

  formu += `
          </select>
          <button class="btn btn-dark" type="submit">
            DESASIGNAR 
          </button>
        </form>
      </div>
    </div>
  </div>`;

  this.mainArea.insertAdjacentHTML("beforeend", formu);
  }

	// Mostrar todos los formularios.
  showAdmin(dishes, menus, categories, restaurants, allergens, handler){
    const button = document.getElementById("admin");

		button.addEventListener('click', () => {
			// Eliminamos la anterior categoría si se ha seleccionado.
			if (document.getElementById("breadcrumb-item1")) {
				this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
			}

			// Quitamos el tipo seleccionado del categoryArea.
			this.categoryArea.replaceChildren();
			this.mainArea.replaceChildren();

			// Migas de pan(añadimos el hijo).
			this.showChildrenBreadcrumbs("Admin");

			// Mostrar FORMULARIOS:

			// 1 Crear plato y poder añadir categorías y alérgenos.
			this.showFormCreateDish(categories, allergens);

			// 2 Eliminar plato.
			this.showFormDeleteDishes(dishes);

			// 3 Asignar y desasignar
			this.showFormADDishes(dishes, menus);

			// 4 Crear y eliminar categorias.
			this.showFormCategories(categories);

			// 5 Crear restaurante.
			this.showFormCreateRestaurant(restaurants);

			// 6 Modificar categoría de un plato.
			this.showFormModifyCategory(dishes, categories);

			this.bindCreateDish(handler);
    });
  }

	// Mostrar mensaje(plato) de creado correctamente o de error(si hay alguno).
	showNewDishModal(done, nameD, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nuevo Plato';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">El plato <strong>${nameD}</strong> ha sido creado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
					<i class="bi bi-exclamation-triangle"></i> El plato <strong>${nameD}</strong> ya está creado.
					<br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fCreateDish.reset();
      }
      document.fCreateDish.nameDish.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

	showRemoveDishModal(done, nameD, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Borrado de Plato';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">El plato <strong>${nameD}</strong> ha sido eliminado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
				<i class="bi bi-exclamation-triangle"></i> El plato <strong>${nameD}</strong> no se ha podido borrar.
				<br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        // const removeCategory = document.getElementById('remove-category');
        // const button = removeCategory.querySelector(`button.btn[data-category="${nameD}"]`);
        // button.parentElement.parentElement.remove();

				document.fCreateDish.nameDish.focus();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
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
      handler;
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

	bindCreateDish(handler) {
    createDishValidation(handler);
  }

  // Devuelve un entero random entre 0 y el máximo pasado por parámetro.
  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

}
export default RestaurantView;
