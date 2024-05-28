import { createDishValidation, deleteDishValidation, asignMenuValidation, desasignMenuValidation, createCategoryValidation, deleteCategoryValidation, createRestaurantValidation, asignCategoryValidation, desasignCategoryValidation } from "./validation.js";
import { setCookie } from "./util.js";

const EXCECUTE_HANDLER = Symbol('excecuteHandler');

class RestaurantView {
  constructor() {
    this.breadcrumb = document.getElementById("breadcrumb");
    this.main = document.getElementsByTagName("main")[0];
    this.menuCabecera = document.getElementById("menuCabecera");
    this.categories = document.getElementById("categories");
    this.categoryArea = document.getElementById("categoryArea");
    this.allergens = document.getElementById("allergens");
    this.menus = document.getElementById("menus");
    this.restaurants = document.getElementById("restaurants");
    this.mainArea = document.getElementById("mainArea");
  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  // Muestra el inicio de las migas de pan.
  init() {
    this.breadcrumb.replaceChildren();
    this.breadcrumb.insertAdjacentHTML("beforeend",
      `<li class="breadcrumb-item" id="breadcrumb-item">
            <a id="initBreadcrumb" href="#">Inicio</a>
       </li>`
    );
  }

  // Hijos de migas de pan.
  showChildrenBreadcrumbs(type) {
    // Eliminamos el hijo(migas de pan) si se ha seleccionado.
    if (document.getElementById("breadcrumb-item1")) {
      this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
    }
    
    if (type != undefined) {
      this.breadcrumb.insertAdjacentHTML("beforeend",
        `<li class="breadcrumb-item" id="breadcrumb-item1">
          <a href="#">${type}</a>
        </li>`
      );
    }
  }

  // Para mostrar en la barra de navegación el Inicio.
  showInicio() {
    this.menuCabecera.insertAdjacentHTML(
      "afterbegin",
      `<div class="cabecera-menu" id="menuInicio">
        <a id="init" href="#" title="Link para recargar la página.">Inicio</a>
      </div>`
    );
  }

  // Para mostrar en la barra de navegación el Admin.
  showNavAdmin() {
    document.getElementById("menuRestaurant").insertAdjacentHTML("afterend", 
      `<div id="menuAdmin" class="cabecera-menu">
        <a id="admin" href="#" title="Link para ir a la parte de formularios.">Admin</a>
      </div>`
    );
  }

  // Para mostrar en la barra de navegación el Favoritos.
  showNavfavorite() {
    document.getElementById("menuAdmin").insertAdjacentHTML("afterend", 
      `<div id="menuFavorite" class="cabecera-menu">
        <a id="favoritos" href="#" title="Link para ir a la parte de platos favoritos.">Favoritos</a>
      </div>`
    );
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
      if (type != undefined) {
        this.categoryArea.insertAdjacentHTML("beforeend",
        `<div class="col-md-auto">
          <p>${type}</p>
        </div>`
      );
    }
  }

  // Mostrar 3 platos random.
  showRandomDishes(dishes) {
    const num = 3;
    this.showSelectedType();
    this.mainArea.replaceChildren();
    this.showChildrenBreadcrumbs();

    const array = Array.from(dishes); // Guardamos en un array auxiliar.
    for (let i = 0; i < num; i++) {
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
    let carta =
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
            </button>`

    let menuFavorite = document.getElementById("menuFavorite");
    if (menuFavorite) {
      carta += 
            `<br><button data-name="${value.name}" class="btn btn-dark favoriteBtn" type="button">
              <i class="bi bi-star"></i>
            </button>`;
    }
            
    carta += `
            <div class="collapse" id="${cadena}">
              <div class="card-text">
                Descripción: ${value.description}. 
                Incredientes: ${value.ingredients}      
              </div>
            </div>
          </div>
        </div>
      </div>`

    area.insertAdjacentHTML("beforeend", carta);
  }

  // Método para mostrar los platós(dishes) según el elemento(type) seleccionado(button) de los despegables, 'handleOpenWindow' -> abrir nueva ventana.
  showDishes(buttonId, type, handleOpenWindow, handlefavoriteBtn, dishes) {
    let cont = 1; // Variable contador para los botones de descripción.

    this.mainArea.replaceChildren();
    // Si el id del botón empieza por 'men-' ejecuta el código del menú y si no el de categoría y alérgenos.
    if (buttonId.startsWith('men-')) {
      // Migas de pan(añadimos el hijo).
      this.showChildrenBreadcrumbs(type.elem.name);

      // Para recorrer los platos(value). 
      type.dishes.entries().forEach(([key, value]) => {
        // Para los botones de descripción.
        let cadena = "dis" + cont++;

        this.showMenuDishe(this.mainArea, value, cadena);
      });

      // Mostramos la categoría seleccionada.
      this.showSelectedType(type.elem.name);
    }
    // Para categorías, alérgenos y restaurantes.
    else {
      // Migas de pan(añadimos el hijo).
      this.showChildrenBreadcrumbs(type.name);

      // Quitamos el tipo seleccionado del categoryArea.
      this.showSelectedType();

      if (buttonId.startsWith('res-')) {
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
        this.showSelectedType(type.name);
      }
    }

    // Para añadir un plato a favoritos.
    this.bindfavoriteBtn(handlefavoriteBtn);

    // Para abrir el plato en una ventana nueva.
    this.bindOpenWindow(handleOpenWindow);
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
                <select name="sCategory" class="form-select" id="sCategory" aria-describedby="sCategory" >
                  <option selected value=''>No tiene categoría</option> 
    `;

    for (const cat of categories) {
      formu += `  <option value="${cat.name}">${cat.name}</option>`;
    }

    formu += `  </select>
                <h3>Asignar plato a alégeno: </h3>
                <select name="sAllergen" class="form-select" id="sAllergen" aria-describedby="sAllergen" >
                  <option selected value=''>No tiene alérgeno</option> 
    `;

    for (const all of allergens) {
      formu += `  <option value="${all.name}">${all.name}</option>`;
    }

    formu +=`   </select>
                <button class="btn btn-dark" id="btnCreateDish" type="submit">
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
              <select name="sDish" class="form-select" id="sDish" aria-describedby="sDish" multiple>
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
            <form name="fAsignDishes" role="form" class="row g-3 formu" novalidate>
              <h3>Asignar plato a menú: </h3>

              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#asign" aria-expanded="false"
              aria-controls="asign">
                ELEGIR ASIGNACIÓN
              </button>

              <div class="collapse" id="asign">
                <select name="seDish" class="form-select" id="seDish" aria-describedby="seDish">
    `;

    for (const dis of dishes) {
      formu += `  <option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `  </select>
                <select name="sMenus" class="form-select" id="sMenus" aria-describedby="sMenus" multiple>
    `;

    for (const men of menus) {
      formu += `  <option value="${men.elem.name}">${men.elem.name}</option>`;
    }

    formu += `  </select>
                <button class="btn btn-dark" type="submit">
                  ASIGNAR
                </button>
              </div>
            </form>

            <hr>

            <form name="fDesasignDishes" role="form" class="row g-3 formu" novalidate>
              <h3>Desasignar plato a menú: </h3>
              
              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#desasign" aria-expanded="false"
              aria-controls="desasign">
                ELEGIR DESASIGNACIÓN
              </button>

              <div class="collapse" id="desasign">
                <select name="selDish" class="form-select" id="selDish" aria-describedby="selDish">
    `;

    for (const dis of dishes) {
      formu += `  <option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

      formu += `</select>
                <select name="seMenus" class="form-select" id="seMenus" aria-describedby="seMenus" multiple>
    `;

    for (const men of menus) {
      formu += `  <option value="${men.elem.name}">${men.elem.name}</option>`;
    }

    formu += `
                </select>
                <button class="btn btn-dark" type="submit">
                  DESASIGNAR
                </button>
              </div>
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
            <form name="fCreateC" role="form" class="row g-3 formu" novalidate>
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
            </form>

            <hr>

            <form name="fDeleteC" role="form" class="row g-3 formu" novalidate>
              <h3>Eliminar categoría: </h3>
              <select name="seCategory" class="form-select" id="seCategory" aria-describedby="seCategory" multiple>
    `;

    for (const cat of categories) {
      formu += `  <option value="${cat.name}">${cat.name}</option>`;
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
            <form name="fCreateRest" role="form" class="row g-3 formu" novalidate>
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
            <form name="fModifyAsign" role="form" class="row g-3 formu" novalidate>
              <h3>Añadir platos a categoría: </h3>

              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#add" aria-expanded="false"
              aria-controls="add">
                ELEGIR ASIGNACIÓN
              </button>

              <div class="collapse" id="add">
                <select name="seleDish" class="form-select" id="seleDish" aria-describedby="seleDish" multiple>
    `;

    for (const dis of dishes) {
      formu += `  <option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `  </select>
                <select name="seCategories" class="form-select" id="seCategories" aria-describedby="seCategories">
    `;

    for (const cat of categories) {
      formu += `  <option value="${cat.name}">${cat.name}</option>`;
    }

    formu += `  </select>
                <button class="btn btn-dark" type="submit">
                  ASIGNAR
                </button>
              </div>
            </form>

            <hr>

            <form name="fModifyDesasign" role="form" class="row g-3 formu" novalidate>
              <h3>Eliminar platos a categoría: </h3>
              
              <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#desasignC" aria-expanded="false"
              aria-controls="desasignC">
                ELEGIR DESASIGNACIÓN
              </button>

              <div class="collapse" id="desasignC">
                <select name="selecDish" class="form-select" id="selecDish" aria-describedby="selecDish" multiple>
    `;

    for (const dis of dishes) {
      formu += `  <option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `  </select>
                <select name="fCategories" class="form-select" id="fCategories" aria-describedby="fCategories">
    `;

    for (const cat of categories) {
      formu += `  <option value="${cat.name}">${cat.name}</option>`;
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
  showAdmin(dishes, menus, categories, restaurants, allergens){
    // Quitamos el tipo seleccionado del categoryArea.
    this.showSelectedType("Formularios/Administración");
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
  }

  // Mostrar los platos favoritos.
  showFavorite(handleDeletefavoriteBtn){
    // Quitamos el tipo seleccionado del categoryArea.
    this.showSelectedType("Favoritos");
    this.mainArea.replaceChildren();

    // Migas de pan(añadimos el hijo).
    this.showChildrenBreadcrumbs("Favoritos");

    let cont = 0;

    for (let index = 0; index < localStorage.length; index++) {
      // Obtener la clave(nombre del plato).
      let dish = localStorage.key(index);

      // Recuperar el objeto guardado en localStorage;
      let diss = JSON.parse(localStorage.getItem(dish));

      let cadena = "dis" + cont++;

      let carta =
      `<div class="col">
        <div class="card" style="width: 23rem">
          <img class="tamImg" src="./img/${diss.image}" alt="Imagen del plato: ${diss.name}" />
          <div class="card-body">
            <h5 class="card-title">${diss.name}</h5>

            <button class="btn btn-dark" type="button"
              data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
              aria-controls="${cadena}">
                Descripción
            </button>
            
            <button data-name="${diss.name}" class="btn btn-dark deleteFavoriteBtn" type="button">
              Eliminar Favorito
            </button>
            
            <div class="collapse" id="${cadena}">
              <div class="card-text">
                Descripción: ${diss.description}. 
                Incredientes: ${diss.ingredients}      
              </div>
            </div>
          </div>
        </div>
      </div>`;

      this.mainArea.insertAdjacentHTML("beforeend", carta);
    }

    this.bindDeletefavoriteBtn(handleDeletefavoriteBtn);
  }

	// Mostrar mensaje(plato) creado correctamente o de error(si hay alguno).
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
					<i class="bi bi-exclamation-triangle"></i>El plato <strong>${nameD}</strong> NO se pudo crear.
					<br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fCreateDish.reset();
      }
      document.fCreateDish.nameDish.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  // Mostrar mensaje(plato) eliminado correctamente o de error(si hay alguno).
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
          <i class="bi bi-exclamation-triangle"></i>El plato <strong>${nameD}</strong> NO se ha podido borrar.
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

  // Mostrar mensaje(plato y menú) asignados correctamente o de error(si hay alguno).
  showAsignMenuyModal(done, nameD, nameM, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Asignado plato a Menús';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">El plato <strong>${nameD}</strong> ha sido asignado correctamente a los menús <strong>${nameM}</strong>.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
					<i class="bi bi-exclamation-triangle"></i>El plato <strong>${nameD}</strong> NO se pudo asignar a los menús <strong>${nameM}</strong>.
					<br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fAsignDishes.reset();
      }
      document.fAsignDishes.seDish.focus();
      document.fAsignDishes.sMenus.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  } 

  // Mostrar mensaje(plato y menú) asignados correctamente o de error(si hay alguno).
  showDesasignMenuModal(done, nameD, nameM, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Desasignado plato a Menús';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">El plato <strong>${nameD}</strong> ha sido desasignado correctamente a los menús <strong>${nameM}</strong>.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
					<i class="bi bi-exclamation-triangle"></i>El plato <strong>${nameD}</strong> NO se pudo desasignar a los menús <strong>${nameM}</strong>.
					<br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fDesasignDishes.reset();
      }
      document.fDesasignDishes.selDish.focus();
      document.fDesasignDishes.seMenus.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  } 

	// Mostrar mensaje(categoría) creado correctamente o de error(si hay alguno).
  showNewCategoryModal(done, nameC, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nueva Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">La categoría <strong>${nameC}</strong> ha sido creada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
					<i class="bi bi-exclamation-triangle"></i>La categoría <strong>${nameC}</strong> NO se pudo crear.
					<br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fCreateC.reset();
      }
      document.fCreateC.nameCat.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  // Mostrar mensaje(categoría) eliminado correctamente o de error(si hay alguno).
  showRemoveCategoryModal(done, nameC, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');

    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Borrado de Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">La categoría <strong>${nameC}</strong> ha sido eliminada correctamente.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
          <i class="bi bi-exclamation-triangle"></i>La categoría <strong>${nameC}</strong> NO se ha podido borrar.
          <br>${error}
				</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        // const removeCategory = document.getElementById('remove-category');
        // const button = removeCategory.querySelector(`button.btn[data-category="${nameC}"]`);
        // button.parentElement.parentElement.remove();

				document.fDeleteC.seCategory.focus();
      }
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

	// Mostrar mensaje(restaurante) creado correctamente o de error(si hay alguno).
  showNewRestaurantModal(done, nameR, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Nuevo restaurante';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
			`<div class="p-3">El restaurante <strong>${nameR}</strong> ha sido creado correctamente.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
					<i class="bi bi-exclamation-triangle"></i>El restaurante <strong>${nameR}</strong> NO se pudo crear.
					<br>${error}
				</div>`,
      );
    }

    console.log(error);
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fCreateRest.reset();
      }
      document.fCreateRest.nameRest.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  }

  // Mostrar mensaje(plato y categoría) asignados correctamente o de error(si hay alguno).
  showAsignCategoryModal(done, nameD, nameC, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Asignado plato a Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
      `<div class="p-3">Los platos <strong>${nameD}</strong> han sido asignados correctamente a la categoría <strong>${nameC}</strong>.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
          <i class="bi bi-exclamation-triangle"></i>Los platos <strong>${nameD}</strong> NO se pudieron asignar a la categoría <strong>${nameC}</strong>.
          <br>${error}
        </div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fModifyAsign.reset();
      }
      document.fModifyAsign.seleDish.focus();
      document.fModifyAsign.seCategories.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  } 

  // Mostrar mensaje(plato y categoría) asignados correctamente o de error(si hay alguno).
  showDesasignCategoryModal(done, nameD, nameC, error) {
    const messageModalContainer = document.getElementById('messageModal');
    const messageModal = new bootstrap.Modal('#messageModal');
    const title = document.getElementById('messageModalTitle');
    title.innerHTML = 'Desasignado plato a Categoría';
    const body = messageModalContainer.querySelector('.modal-body');
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML('afterbegin', 
      `<div class="p-3">El plato <strong>${nameD}</strong> ha sido desasignado correctamente a la categoría <strong>${nameC}</strong>.</div>`);
    } else {
      body.insertAdjacentHTML('afterbegin',
        `<div class="error text-danger p-3">
          <i class="bi bi-exclamation-triangle"></i>El plato <strong>${nameD}</strong> NO se pudo desasignar a la categoría <strong>${nameC}</strong>.
          <br>${error}
        </div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.fModifyDesasign.reset();
      }
      document.fModifyDesasign.selecDish.focus();
      document.fModifyDesasign.fCategories.focus();
    };
    messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
  } 

  // Mostrar el mensaje de Cookies.
  showCookiesMessage() {
    const toast = `<div class="fixed-top p-5 mt-5">
			<div id="cookies-message" class="toast fade show bg-dark text-white w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-header">
					<h4 class="me-auto">Aviso de uso de cookies</h4>
					<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" id="btnDismissCookie"></button>
				</div>
				<div class="toast-body p-4 d-flex flex-column">
					<p> Este sitio web almacenda datos en cookies para activar su funcionalidad, entre las que se encuentra datos analíticos y 
            personalización. Para poder utilizar este sitio, estás automáticamente aceptando que utilizamos cookies.
					</p>
					<div class="ml-auto">
						<button type="button" class="btn btn-outline-light mr-3 deny" id="btnDenyCookie" data-bs-dismiss="toast">
							Denegar
						</button>
						<button type="button" class="btn btn-primary" id="btnAcceptCookie" data-bs-dismiss="toast">
							Aceptar
						</button>
					</div>
				</div>
			</div>
		</div>`;
    document.body.insertAdjacentHTML('afterbegin', toast);

		//  Bootstrap genera el evento hidden.bs.toast. Lo capturamos para eliminar la notificación del árbol DOM de la página.
    const cookiesMessage = document.getElementById('cookies-message');
    cookiesMessage.addEventListener('hidden.bs.toast', (event) => {
      event.currentTarget.parentElement.remove();
    });

		// Para dejar la cookie para evitar que muestre el mensaje nuevamente en la página.
    const btnAcceptCookie = document.getElementById('btnAcceptCookie');
    btnAcceptCookie.addEventListener('click', (event) => {
      setCookie('accetedCookieMessage', 'true', 1);
    });

		// Para que elimine el contenido de la página y muestre un mensaje que es necesario aceptar el uso de las cookies.
    const denyCookieFunction = (event) => {
      this.main.replaceChildren();
      this.main.insertAdjacentHTML('afterbegin', 
      `<div class="container my-3">
        <div class="alert alert-warning" role="alert">
            <strong>Para utilizar esta web es necesario aceptar el uso de cookies. Debe recargar la página y aceptar las condicones para seguir navegando. Gracias.</strong>
        </div>
      </div>`);

      this.menuCabecera.removeChild(document.getElementById("menuCategorias"));
      this.menuCabecera.removeChild(document.getElementById("menuAlergenos"));
      this.menuCabecera.removeChild(document.getElementById("menuMenu"));
      this.menuCabecera.removeChild(document.getElementById("menuRestaurant"));
    };

    const btnDenyCookie = document.getElementById('btnDenyCookie');
    btnDenyCookie.addEventListener('click', denyCookieFunction);
    const btnDismissCookie = document.getElementById('btnDismissCookie');
    btnDismissCookie.addEventListener('click', denyCookieFunction);
  }

  // Mostrar en la barra de navegación la parte de Identificate.
  showIdentificationLink() {
    const userArea = document.getElementById('userArea');
    userArea.replaceChildren();
    if (document.getElementsByClassName('cabecera-menu-admin')) {
      userArea.classList.remove("cabecera-menu-admin");
      userArea.classList.add("cabecera-menu");
    }
    userArea.insertAdjacentHTML('afterbegin', 
    `<div class="account d-flex mx-2 flex-column" style="text-align: right; height: 40px">
			<a id="login" href="#"><i class="bi bi-person-circle" aria-hidden="true"></i> Identificate</a>
		</div>`);
  }

  // Mostrar el formulario(login) para loguearse.
  showLogin() {
    // Añadimos el hijo.
    this.showChildrenBreadcrumbs("Login");
    this.mainArea.replaceChildren();
    const login = `<div class="container h-100 identificar">
			<div class="d-flex justify-content-center h-100">
				<div class="user_card">
					<div class="d-flex justify-content-center form_container">
					  <form name="fLogin" role="form" novalidate>
							<div class="input-group mb-3">
								<div class="input-group-append">
									<span class="input-group-text"><i class="bi bi-person-circle"></i></span>
								</div>
								<input type="text" name="username" class="form-control input_user" value="" placeholder="usuario">
							</div>
							<div class="input-group mb-2">
								<div class="input-group-append">
									<span class="input-group-text"><i class="bi bi-key-fill"></i></span>
								</div>
								<input type="password" name="password" class="form-control input_pass" value="" placeholder="contraseña">
							</div>
							<div class="form-group">
								<div class="custom-control custom-checkbox">
									<input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
									<label class="custom-control-label" for="customControlInline">Recuerdame</label>
								</div>
							</div>
              <div class="d-flex justify-content-center mt-3 login_container">
                <button class="btn login_btn" type="submit">Acceder</button>
						  </div>
						</form>
					</div>
				</div>
			</div>
		</div>`;
    this.mainArea.insertAdjacentHTML('afterbegin', login);
  }

  // Mostrar mensaje de mal login.
  showInvalidUserMessage() {
    this.mainArea.insertAdjacentHTML('beforeend', 
      `<div class="container my-3">
        <div class="alert alert-warning" role="alert">
          <strong>El usuario y la contraseña no son válidos. Inténtelo nuevamente.</strong>
        </div>
      </div>`);
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus(); 
  }

  // Mostrar cuando el usuario esta autenticado..
  showAuthUserProfile(user) { 
    const userArea = document.getElementById('userArea');
    userArea.replaceChildren(); 
    userArea.classList.remove("cabecera-menu");
    userArea.classList.add("cabecera-menu-admin");
    userArea.insertAdjacentHTML('afterbegin', 
      `<div class="dropdown">
        <div class="iconoLogin">
          <a id="aCloseSession" href="#">Cerrar sesión</a> 
          <div>${user.username} <img class="iconoIdioma" alt="${user.username}" src="img/user.png" /></div>
        </div>
      </div>`
    );

    if (document.getElementById("menuInicio")) this.menuCabecera.removeChild(document.getElementById("menuInicio"));
  }
  
  // Volver a dejar la página como si fuera un usuario normal.
  removeAdminMenu() {
    const adminMenu = document.getElementById('adminMenu');
    if (adminMenu) adminMenu.parentElement.remove();

    if (!document.getElementById('menuInicio')) {
      this.showInicio();
    }
  }

  // Crear la cookie cuando se identifica.
  setUserCookie(user) {
    setCookie("activeUser", user.username, 1);
  }

  // Eliminar la cookie cuando se Identifica, pero no le da a recordar.
  deleteUserCookie() {
    setCookie("activeUser", "", 0);
  }

	// Generar el botón de cierre de todas la ventanas nuevas.
  showCloseAllWindowsButton() {
    this.mainArea.insertAdjacentHTML("afterend",
      `<button id="closeAllWindowsButton" class="btn btn-dark btn-lg">Cerrar ventanas</button>`
    );
  }

  // Métodos bind.
  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
    });
    document.getElementById('initBreadcrumb').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
    });
    document.getElementById('initFooter').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
      handler();
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
    document.getElementById("closeAllWindowsButton").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "main", { action: "CloseAllWindows" }, "#CloseAllWindows", event);
    });
  }

  // Para mostrar los despegables(Categorías, alérgenos, menús, y restaurantes).
  bindCategoryDropdown(handler) {
    document.getElementById("categoriesDrop").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "nav", { action: "showCategories" }, "#Categories", event);
    });
  }

  bindAllergenDropdown(handler) {
    document.getElementById("allergensDrop").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "nav", { action: "showAllergens" }, "#Allergens", event);
    });
  }

  bindMenuDropdown(handler) {
    document.getElementById("menusDrop").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "nav", { action: "showMenus" }, "#Menus", event);
    });
  }

  bindRestaurantDropdown(handler) {
    document.getElementById("restaurantsDrop").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "nav", { action: "showRestaurants" }, "#Restaurants", event);
    });
  }

  // Para mostrar en el main las categorias, alérgenos, menús y restaurantes seleccionado en el desplegable
  bindCategory(categories, handler) {
    for (const category of categories) {
      let button = document.getElementById(`cat-${category.name}`);
      button.addEventListener("click", (event) => {
        handler(button.id, category);
      });
    }
  }

  bindAllergen(allergens, handler) {
    for (const all of allergens) {
      let button = document.getElementById(`all-${all.name}`);
      button.addEventListener("click", (event) => {
        handler(button.id, all);
      });
    }
  }

  bindMenu(menus, handler) {
    for (const men of menus) {
      let button = document.getElementById(`men-${men.elem.name}`);
      button.addEventListener("click", (event) => {
        handler(button.id, men);
      });
    }
  }

  bindRestaurant(restaurants, handler) {
    for (const rest of restaurants) {
      let button = document.getElementById(`res-${rest.name}`);
      button.addEventListener("click", (event) => {
        handler(button.id, rest);
      });
    }
  }

  // Para mostrar la parte del admin(formularios);
  bindAdmin(handler) {
    document.getElementById("menuAdmin").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "nav", { action: "showAdmin" }, "#Admin", event);
    });
  }

  // Para validar la creación de los platos.
  bindCreateDish(handler) {
    createDishValidation(handler);
  }

  // Para validar la eliminación de los platos.
  bindDeleteDish(handler) {
    deleteDishValidation(handler);
  }
  
  // Para validar la asignación de una categoría a varios platos.
  bindAsignMenu(handler) {
    asignMenuValidation(handler);
  }

  // Para validar la desasignación de una categoría a varios platos.
  bindDesasignMenu(handler) {
    desasignMenuValidation(handler);
  }

  // Para validar la creación de las categorías.
  bindCreateCategory(handler) {
    createCategoryValidation(handler);
  }

  // Para validar la eliminación de las categorías.
  bindDeleteCategory(handler) {
    deleteCategoryValidation(handler);
  }

  // Para validar la creación de los restaurantes.
  bindCreateRestaurant(handler) {
    createRestaurantValidation(handler);
  }

  // Para validar la asignación de una categoría a varios platos.
  bindAsignCategory(handler) {
    asignCategoryValidation(handler);
  }

  // Para validar la desasignación de una categoría a varios platos.
  bindDesasignCategory(handler) {
    desasignCategoryValidation(handler);
  }

  // COOKIES
  // Cuando le das al botón de Identificate.
  bindIdentificationLink(handler) {
    const login = document.getElementById('login');
    login.addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'main', { action: 'login' }, '#', event);
    });
  }

  // Cuando le das al botón de Acceder del Login.
  bindLogin(handler) {
    const form = document.forms.fLogin;
    form.addEventListener('submit', (event) => {
      handler(form.username.value, form.password.value, form.remember.checked);
      event.preventDefault();
    });
  }

  // Cuando se cierre sesión(se eliminana también El Admin y Favorito de la barra de navegación).
  bindCloseSession(handler) {
    document.getElementById("aCloseSession").addEventListener("click", (event) => {
      handler();
      event.preventDefault();
      if (document.getElementById("menuAdmin")) this.menuCabecera.removeChild(document.getElementById("menuAdmin"));
      if (document.getElementById("menuFavorite")) this.menuCabecera.removeChild(document.getElementById("menuFavorite"));
    });
  }

  // Para cuando el usuario se desconecte, eliminar la cookie del equipo.
  bindDisconnect() {
    window.addEventListener("beforeunload", function(event) {
      // No funciona está deprecado. 
      // event.returnValue = "Si se desconecta, se eliminara la cookie";
      setCookie("accetedCookieMessage", "", 0);
    });
  }

  // Para mostrar la parte de Favoritos(platos);
  bindfavorite(handler) {
    document.getElementById("menuFavorite").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](handler, [], "nav", { action: "showFavorite" }, "#Favorite", event);
    });
  }

  // Cuando le das al botón de favorito(estrella). 
  bindfavoriteBtn(handler) {
    const buttons = mainArea.getElementsByClassName('favoriteBtn');
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        // se puede usar así(event.currentTarget) o button.
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Cuando le das al botón de elminar favorito.
  bindDeletefavoriteBtn(handler) {
    const buttons = mainArea.getElementsByClassName('deleteFavoriteBtn');
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Para el historial.
  initHistory() {
    history.replaceState({ action: 'init' }, null);
  }

  // Devuelve un entero random entre 0 y el máximo pasado por parámetro.
  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

}
export default RestaurantView;
