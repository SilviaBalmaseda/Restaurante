import { createDishValidation, deleteDishValidation,   createCategoryValidation, deleteCategoryValidation, createRestaurantValidation, } from "./validation.js";

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
    this.categoryArea.replaceChildren();
    this.mainArea.replaceChildren();

    // Eliminamos el hijo(migas de pan) si se ha seleccionado.
    if (document.getElementById("breadcrumb-item1")) {
      this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
    }

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
  showDishes(buttonId, type, handleOpenWindow, dishes) {
    // Eliminamos la anterior categoría si se ha seleccionado.
    if (document.getElementById("breadcrumb-item1")) {
      this.breadcrumb.removeChild(document.getElementById("breadcrumb-item1"));
    }

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
      this.showSelectedType(type.elem);
    }
    // Para categorías, alérgenos y restaurantes.
    else {
      // Migas de pan(añadimos el hijo).
      this.showChildrenBreadcrumbs(type.name);

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
      formu += `<option value="${cat.name}">${cat.name}</option>`;
    }

    formu += `</select>
              <h3>Asignar plato a alégeno: </h3>
                <select name="sAllergen" class="form-select" id="sAllergen" aria-describedby="sAllergen" >
                  <option selected value=''>No tiene alérgeno</option> 
    `;

    for (const all of allergens) {
      formu += `<option value="${all.name}">${all.name}</option>`;
    }

      formu +=`</select>
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

                <select name="seDish" class="form-select" id="seDish" aria-describedby="seDish" multiple>
    `;

    for (const dis of dishes) {
      formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `</select>
              <select name="sMenus" class="form-select" id="sMenus" aria-describedby="sMenus">
    `;

    for (const men of menus) {
      formu += `<option value="${men.elem.name}">${men.elem.name}</option>`;
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
      formu += `<option value="${dis.elem.name}">${dis.elem.name}</option>`;
    }

    formu += `</select>
              <select name="seMenus" class="form-select" id="seMenus" aria-describedby="seMenus" multiple>
    `;

    for (const men of menus) {
      formu += `<option value="${men.elem.name}">${men.elem.name}</option>`;
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

  // Asignar

  

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

  // Añadir






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
    const closeAllWindowsButton = document.getElementById('closeAllWindowsButton');
    closeAllWindowsButton.addEventListener('click', handler);
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
        this[EXCECUTE_HANDLER](handler, [button.id, category], "main", { action: "showDishes" }, "#Category-list", event);
        handler(button.id, category);
      });
    }
  }

  bindAllergen(allergens, handler) {
    for (const all of allergens) {
      let button = document.getElementById(`all-${all.name}`);
      button.addEventListener("click", (event) => {
        this[EXCECUTE_HANDLER](handler, [button.id, all], "main", { action: "showDishes" }, "#Category-list", event);
        handler(button.id, all);
      });
    }
  }

  bindMenu(menus, handler) {
    for (const men of menus) {
      let button = document.getElementById(`men-${men.elem.name}`);
      button.addEventListener("click", (event) => {
        this[EXCECUTE_HANDLER](handler, [button.id, men], "main", { action: "showDishes" }, "#Category-list", event);
        handler(button.id, men);
      });
    }
  }

  bindRestaurant(restaurants, handler) {
    for (const rest of restaurants) {
      let button = document.getElementById(`res-${rest.name}`);
      button.addEventListener("click", (event) => {
        this[EXCECUTE_HANDLER](handler, [button.id, rest], "main", { action: "showDishes" }, "#Category-list", event);
        handler(button.id, rest);
      });
    }
  }

  // Para mostrar la parte del admin(formularios);
  bindAdmin(handler) {
    document.getElementById("admin").addEventListener("click", (event) => {
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
  
  // Asignar


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


  // Añadir

  // Devuelve un entero random entre 0 y el máximo pasado por parámetro.
  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

}
export default RestaurantView;
