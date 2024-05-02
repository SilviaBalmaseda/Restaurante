class RestaurantView {
  constructor() {
    this.breadcrumb = document.getElementById("breadcrumb");
    this.main = document.getElementsByTagName("main")[0];
    this.categories = document.getElementById("categories");
    this.categoriesMain = document.getElementById("categoriesMain");
    this.allergens = document.getElementById("allergens");
    this.menus = document.getElementById("menus");
    this.restaurants = document.getElementById("restaurants");
    this.random = document.getElementById("random");
  }

  init() {
    // Migas de pan.
    this.breadcrumb.replaceChildren();
    this.breadcrumb.insertAdjacentHTML("beforeend",
      `<li class="breadcrumb-item">
            <a id="init" href="#">Inicio</a>
       </li>`
    );
  }

  showCategoriesMain(cats) {
    this.categoriesMain.replaceChildren();
    for (const category of cats) {
      this.categoriesMain.insertAdjacentHTML("beforeend",
        `<button id="btnCategory" class="col-md-auto">
          <a id="cat-${category.name}" class="dropdown-item">${category.name}</a>
        </button>`
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
    this.random.replaceChildren();

    const array = Array.from(dishes); // Guardamos en un array.
    for (let index = 0; index < 3; index++) {
      // Para no repetir el plato le borramos.
      let diss = array.splice(this.getRandom(array.length), 1);

      this.random.insertAdjacentHTML("afterbegin",
        `<div class="col-md-auto randomDishes">
          </figure>
                  <p>${diss[0].elem.name}</p>
                  <img class="grande" src="./img/${diss[0].elem.image}" alt="Imagen del plato: ${diss[0].elem.name}" />
          </figure>
        </div>`);
    }
  }

  showThatCategories(cats, dishes) {

    // for (const category of cats) {

    document.getElementById("cat-Estrella").addEventListener("click", () => {

      // Migas de pan.
      this.breadcrumb.insertAdjacentHTML("beforeend",
        `<li class="breadcrumb-item">
            <a href="#">${category.name}</a>
          </li>`
      );

      console.log("aaaaaaaaaaaaaaaa");
      // 

      this.main.replaceChildren();
      this.main.insertAdjacentHTML("beforeend",
        `<div class="col-md-auto">
            <a class="dropdown-item" id="cat-${category.name}">${category.name}</a>
          </div>`
      );
    });


    // }

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
