import { Coordinate } from "./objectsRestaurants.js";
import { getCookie, greetUser, saveUser } from "./util.js";
import RestaurantApp from './restaurantApp.js';

const MODEL = Symbol('RestaurantModel');
const VIEW = Symbol('RestaurantView');
const LOAD_RESTAURANT_OBJECTS = Symbol('Load Restaurant Objects');
const AUTH = Symbol('AUTH');
const USER = Symbol('USER');

class RestaurantController {
    constructor(modelRestaurant, viewRestaurant, auth) {
        this[MODEL] = modelRestaurant;
        this[VIEW] = viewRestaurant;
        this[AUTH] = auth;
        this[USER] = null;
        this[LOAD_RESTAURANT_OBJECTS]();
        this.openedWindows = []; // Array para almacenar las ventanas abiertas.

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();
        
        // Enlazamos handlers con la vista
        this[VIEW].bindInit(this.handleInit);
    }

    onInit = () => {
        let dishes = [...this[MODEL].getDishes()];
        this[VIEW].showRandomDishes(dishes);
    };

    onLoad = () => {
        if (getCookie('accetedCookieMessage') !== 'true') {
            this[VIEW].showCookiesMessage();
        }
        const userCookie = getCookie('activeUser');
        console.log(userCookie);
        if (userCookie) {
            const user = this[AUTH].getUser(userCookie);
            if (user) {
                this[USER] = user;
                this.onOpenSession();
            }
        } else {
            this.onCloseSession();
        }

        this[VIEW].init();

        this[VIEW].bindCategoryDropdown(this.handleCategory);
        this[VIEW].bindAllergenDropdown(this.handleAllergen);
        this[VIEW].bindMenuDropdown(this.handleMenu);
        this[VIEW].bindRestaurantDropdown(this.handleRestaurant);

        this[VIEW].showCloseAllWindowsButton();
        this[VIEW].bindCloseAllWindows(this.handleCloseAllWindows);
        this[VIEW].bindDisconnect();
    };

    onOpenSession() { 
        this.onInit();
        this[VIEW].initHistory();
        this[VIEW].showAuthUserProfile(this[USER]);
        this[VIEW].bindCloseSession(this.handleCloseSession);
        this[VIEW].showNavAdmin();
        this[VIEW].bindAdmin(this.handleAdmin);
        this[VIEW].showNavfavorite();
        this[VIEW].bindfavorite(this.handlefavorite);
    }

    onCloseSession() {
        this[USER] = null;
        this[VIEW].deleteUserCookie();
        this[VIEW].showIdentificationLink();
        this[VIEW].bindIdentificationLink(this.handleLoginForm);
        this[VIEW].removeAdminMenu();
    }

    handleLoginForm = () => {
        this[VIEW].showLogin();
        this[VIEW].bindLogin(this.handleLogin);
    };

    handleLogin = (username, password, remember) => {
        if (this[AUTH].validateUser(username, password)) {
          this[USER] = this[AUTH].getUser(username);
          this.onOpenSession();
          if (remember) {
            this[VIEW].setUserCookie(this[USER]);
            saveUser();
          }
        } else {
          this[VIEW].showInvalidUserMessage();
        }
        greetUser();
    };

    handleCloseSession = () => {
        this.onCloseSession();
        this.onInit();
        RestaurantApp.onInit();
        this[VIEW].initHistory();
    };

    handleInit = () => {
        this.onInit();
    };

    // Handles para mostrar en la barra de navegación los despegables y en main los platos. 
    handleCategory = () => {
        this.onCategories();
    };

    handleShowCategory = (buttonId, category) => {
        let dishes = [...this[MODEL].getDishes()];
        this[VIEW].showDishes(buttonId, category, this.handleOpenWindow, this.handlefavoriteBtn, dishes);
    };

    handleAllergen = () => {
        this.onAllergens();
    };

    handleShowAllergen = (buttonId, allergen) => {
        let dishes = [...this[MODEL].getDishes()];
        this[VIEW].showDishes(buttonId, allergen, this.handleOpenWindow, this.handlefavoriteBtn, dishes);
    };

    handleMenu = () => {
        this.onMenus();
    };

    handleShowMenu = (buttonId, menu) => {
        this[VIEW].showDishes(buttonId, menu, this.handleOpenWindow, this.handlefavoriteBtn);
    };

    handleRestaurant = () => {
        this.onRestaurants();
    };

    handleShowRestaurant = (buttonId, restaurant) => {
        this[VIEW].showDishes(buttonId, restaurant);
    };

    // Para mostrar en la barra de navegación la parte de admin(formularios).
    handleAdmin = () => {
        this.onAdmin();
    };

    // Para mostrar en la barra de navegación la parte de Favoritos(platos).
    handlefavorite = () => {
        this.onfavorite();
    };

    // Métodos que están en la barra de navegación.
    onCategories = () => {
        this[VIEW].showCategories(this[MODEL].getCategories());
        this[VIEW].bindCategory(this[MODEL].getCategories(), this.handleShowCategory);
    };

    onAllergens = () => {
        this[VIEW].showAllergens(this[MODEL].getAllergens());
        this[VIEW].bindAllergen(this[MODEL].getAllergens(), this.handleShowAllergen);
    };

    onMenus = () => {
        this[VIEW].showMenus(this[MODEL].getMenus());
        this[VIEW].bindMenu(this[MODEL].getMenus(), this.handleShowMenu);
    };

    onRestaurants = () => {
        this[VIEW].showRestaurants(this[MODEL].getRestaurants());
        this[VIEW].bindRestaurant(this[MODEL].getRestaurants(), this.handleShowRestaurant);
    };

    onAdmin = () => {
        let dishes = [...this[MODEL].getDishes()];
        let menus = [...this[MODEL].getMenus()];
        let categories = [...this[MODEL].getCategories()];
        this[VIEW].showAdmin(dishes, menus, categories, this[MODEL].getRestaurants(), this[MODEL].getAllergens());
        this[VIEW].bindCreateDish(this.handleCreateDish);
        this[VIEW].bindDeleteDish(this.handleDeleteDish);
        this[VIEW].bindAsignMenu(this.handleAsignMenu);
        this[VIEW].bindDesasignMenu(this.handleDesasignMenu);
        this[VIEW].bindCreateCategory(this.handleCreateCategory);
        this[VIEW].bindDeleteCategory(this.handleDeleteCategory);
        this[VIEW].bindCreateRestaurant(this.handleCreateRestaurant);
        this[VIEW].bindAsignCategory(this.handleAsignCategory);
        this[VIEW].bindDesasignCategory(this.handleDesasignCategory);
    }

    onfavorite = () => {
        let dishes = [...this[MODEL].getDishes()];
        this[VIEW].showFavorite(this.handleDeletefavoriteBtn);
    }

    // Crear plato.
    handleCreateDish = (nameD, des, ing, img, nameCat, nameAll) => {
        const dish = this[MODEL].createDish(nameD);
    
        if (des != "" && des != undefined) {
            dish.description = des;
        }

        if (ing != "" && ing != undefined) {
            dish.ingredients = ing;
        }

        if (img != "" && img != undefined) {
            dish.image = img;
        }
        
        let done;
        let error;
        try {
          this[MODEL].addDish(dish);
          if (nameCat != "") {
            let cat = this[MODEL].getCategory(nameCat); // Buscamos la categoría.
            this[MODEL].assignCategoryToDish(cat, dish);
          }
    
          if (nameAll != "") {
            let all = this[MODEL].getAllergen(nameAll); // Buscamos el alérgeno.
            this[MODEL].assignAllergenToDish(all, dish);
          }
    
          done = true;
          this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
          this[MODEL].removeDish(dish);
        }
        this[VIEW].showNewDishModal(done, nameD, error);
        // const dishes = [...this[MODEL].getDishes()];
        // console.log(dishes);
    };

    // Eliminar platos.
    handleDeleteDish = (arrayD) => {
        let done;
        let error;
        try {
            for (const nameD of arrayD) {
                this[MODEL].removeDish(this[MODEL].getDish(nameD).elem);
            }
            
            done = true;
            this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showRemoveDishModal(done, arrayD.toString(), error);
        // const dishes = [...this[MODEL].getDishes()];
        // console.log(dishes);
    };

    // Asignar Menú.
    handleAsignMenu = (arrayM, nameD) => {
        let done;
        let error;
        try {
            if (arrayM.length!=0 && nameD != "") {
                let dis = this[MODEL].getDish(nameD).elem;  // Buscamos el plato.
                for (const nameM of arrayM) {
                    let men = this[MODEL].getMenu(nameM).elem; // Buscamos el menú.
                    this[MODEL].assignDishToMenu(dis, men);
                }
            }
          
          done = true;
          this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showAsignMenuyModal(done, nameD, arrayM.toString(), error);
        // const m = [...this[MODEL].getMenus()];
        // console.log(m);
    };

    // Desasignar Menú.
    handleDesasignMenu = (arrayM, nameD) => {
        let done;
        let error;
        try {
          if (arrayM.length!=0 && nameD != "") {
            let dis = this[MODEL].getDish(nameD).elem;  // Buscamos el plato.
            for (const nameM of arrayM) {
                let men = this[MODEL].getMenu(nameM).elem; // Buscamos el menú.
                this[MODEL].deassignDishToMenu(dis, men);
            }
          }
          
          done = true;
          this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showDesasignMenuModal(done, nameD, arrayM.toString(), error);
        // const m = [...this[MODEL].getMenus()];
        // console.log(m);
    };

    // Crear categoría.
    handleCreateCategory = (nameC, des) => {
        if (des != "" && des != undefined) {
            cat.description = des;
        }
        
        let done;
        let error;
        try {
            const cat = this[MODEL].createCategory(nameC);
            this[MODEL].addCategory(cat);
            
            done = true;
            this.onAdmin();
        } catch (exception) {
            done = false;
            error = exception;
        }
        this[VIEW].showNewCategoryModal(done, nameC, error);
        // const c = [...this[MODEL].getCategories()];
        // console.log(c);
    };

    // Eliminar categorías.
    handleDeleteCategory = (arrayC) => {
        let done;
        let error;
        try {
            for (const nameC of arrayC) {
                this[MODEL].removeCategory(this[MODEL].getCategory(nameC));
            }
            
            done = true;
            this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showRemoveCategoryModal(done, arrayC.toString(), error);
        // const c = [...this[MODEL].getCategories()];
        // console.log(c);
    };

    // Crear restaurante.
    handleCreateRestaurant = (nameR, des, latitude, longitude) => {
        const res = this[MODEL].createRestaurant(nameR);
    
        if (des != "" && des != undefined) {
            res.description = des;
        }
        
        let done;
        let error;
        try {
          this[MODEL].addRestaurant(res);
          if (latitude != "" && longitude != "") {
            console.log(longitude);
            res.location = new Coordinate(latitude, longitude);
          }
    
          done = true;
          this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
          this[MODEL].removeRestaurant(res);
        }
        this[VIEW].showNewRestaurantModal(done, nameR, error);
        // const r = [...this[MODEL].getRestaurants()];
        // console.log(r);
    };

    // Asignar Categoría.
    handleAsignCategory = (arrayD, nameC) => {
        let done;
        let error;
        try {
          if (nameC != "" && arrayD.length!=0) {
            let cat = this[MODEL].getCategory(nameC); // Buscamos la categoría.
            for (const nameD of arrayD) {
                let dis = this[MODEL].getDish(nameD).elem;  // Buscamos los platos.
                this[MODEL].assignCategoryToDish(cat, dis);
            }
          }
          
          done = true;
          this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showAsignMenuyModal(done, arrayD.toString(), nameC, error);
        // const m = [...this[MODEL].getMenus()];
        // console.log(m);
    };

    // Desasignar Categoría.
    handleDesasignCategory = (arrayD, nameC) => {
        let done;
        let error;
        try {
          if (nameC != "" && arrayD.length!=0) {
            let cat = this[MODEL].getCategory(nameC); // Buscamos la categoría.
            for (const nameD of arrayD){
                let dis = this[MODEL].getDish(nameD).elem;  // Buscamos los platos.
                this[MODEL].deassignCategoryToDish(cat, dis);
            }
          }
          
          done = true;
          this.onAdmin();
        } catch (exception) {
          done = false;
          error = exception;
        }
        this[VIEW].showDesasignMenuModal(done, arrayD.toString(), nameC, error);
        // const m = [...this[MODEL].getMenus()];
        // console.log(m);
    };

    // Abrir una ventana nueva.
    handleOpenWindow = (nameD) => {
        // Buscar el plato.
        const dish = this[MODEL].getDish(nameD);

        // Si lo encuentra.
        if (dish !== undefined) {
            const newWindow = window.open('auxPage.html', '_blank', 'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no');
            if (newWindow) {
                // Si la ventana se abrió correctamente, agregamos su referencia al array.
                this.openedWindows.push(newWindow);
            
                let myObj = {
                    name: dish.elem.name,
                    description: dish.elem.description,
                    ingredients: dish.elem.ingredients,
                    image: dish.elem.image,
                };
                // Serializar.
                let stringJSON = JSON.stringify(myObj);

                newWindow.addEventListener('load', function() {
                    newWindow.postMessage(stringJSON, '*');
                });
            }
        }
    }

    // Guardar el plato seleccionado favorito en el localStorage.
    handlefavoriteBtn = (nameD) => {
        let dish = this[MODEL].getDish(nameD).elem;  // Buscamos el plato.

        if (dish !== undefined) {
            let myObj = {
                name: dish.name,
                description: dish.description,
                ingredients: dish.ingredients,
                image: dish.image,
            };

            // Guardar en localStorage.
            localStorage.setItem(dish.name, JSON.stringify(myObj));
        }
    }

    // Eliminar el plato seleccionado en el localStorage.
    handleDeletefavoriteBtn = (nameD) => {
        // Eliminar en localStorage.
        localStorage.removeItem(nameD);

        // para que se muestres los platos despues de eliminar uno.
        this.handlefavorite();
    }

    // Cerrar todas las ventanas abiertas.
    handleCloseAllWindows = () => {
        const windows = this.openedWindows;
        windows.forEach(window => {
            window.close();
        });
        this.openedWindows = [];
    }
    
    [LOAD_RESTAURANT_OBJECTS]() {
        // Los platos.
        const dis1 = this[MODEL].createDish("Croquetas");
        dis1.description = "Croquetas(jamón, pollo, queso)";
        dis1.ingredients = [
            "leche",
            "mantequilla",
            "cebolla",
            "huevo",
            "harina de trigo",
            "pan rallado",
        ];
        dis1.image = "croquetas.jpg";

        const dis2 = this[MODEL].createDish("Pulpo a la gallega");
        dis2.description = "Pulpo al estilo gallego";
        dis2.ingredients = [
            "pulpo",
            "patatas",
            "sal",
            "pimentón dulce o picante",
            "agua",
            "aceite de oliva",
        ];
        dis2.image = "pulpoGallega.jpg";

        const dis3 = this[MODEL].createDish("Pisto Manchego");
        dis3.description = "Pisto manchego tradicional";
        dis3.ingredients = [
            "tomate",
            "cebolla",
            "pimiento verder y rojo",
            "calabacín o berenjenas",
            "ajo",
            "sal",
            "aceite de oliva",
        ];
        dis3.image = "pistoManchego.jpg";

        const dis4 = this[MODEL].createDish("Torrijas");
        dis4.description = "Torrijas tradicionales";
        dis4.ingredients = [
            "pan",
            "leche",
            "canela",
            "limón",
            "azúcar",
            "huevo",
            "aceite de oliva",
        ];
        dis4.image = "torrijas.jpg";

        const dis5 = this[MODEL].createDish("Ceviche de Salmón");
        dis5.description = "Ceviche de Salmón";
        dis5.ingredients = [
            "salmón",
            "cebolla",
            "cilantro",
            "lima",
            "aguacate",
            "ají amarillo",
            "sal",
        ];
        dis5.image = "cevicheSalmon.jpg";

        const dis6 = this[MODEL].createDish("Pita de pollo");
        dis6.description = "Pan de pita con pollo";
        dis6.ingredients = [
            "pollo",
            "ajo",
            "cebolla",
            "pan pita",
            "tomate",
            "lechuga",
            "aceitunas",
            "mayonesa",
        ];
        dis6.image = "pitaPollo.jpg";

        const dis7 = this[MODEL].createDish("Espaguetis de calabacín con gambas");
        dis7.description = "Calabacín en forma de espaguetis con gambas";
        dis7.ingredients = [
            "calabacín",
            "ajo",
            "sal",
            "gambas",
            "perejil o guindilla",
            "aceite de oliva",
        ];
        dis7.image = "espaguetisGambas.jpg";

        const dis8 = this[MODEL].createDish("Tarta de selva negra");
        dis8.description = "Varias capas de bizcocho de chocolate con nata y cerezas";
        dis8.ingredients = [
            "harina",
            "azúcar",
            "mantequilla",
            "cacao en polvo",
            "levadura en polvo",
            "nata líquida",
            "licor de cerezas",
            "cerezas",
            "chocolate",
            "agua",
        ];
        dis8.image = "tartaSelvaNegra.jpg";

        const dis9 = this[MODEL].createDish("Cachapas");
        dis9.description = "Cachapas venezolanas";
        dis9.ingredients = [
            "maíz dulce",
            "huevo",
            "mantequilla",
            "sal",
            "leche entera",
            "azúcar",
            "harina",
            "queso(tierno o mozzarella)",
        ];
        dis9.image = "cachapa.jpg";

        const dis10 = this[MODEL].createDish("Rollitos de primavera");
        dis10.description = "Comida original de China";
        dis10.ingredients = [
            "repollo",
            "zanahoria",
            "cebolla",
            "aceite vegetal",
            "brotes de soja",
            "sal",
            "cerdo o ternera(carne picada)",
            "pasta wonton",
            "huevo",
        ];
        dis10.image = "rollitosPrimavera.jpg";

        const dis11 = this[MODEL].createDish("Barramundi tradicional");
        dis11.description = "Pescado típico australiano";
        dis11.ingredients = [
            "barramundi",
            "aceite de macadamia o de oliva",
            "mirto de limón o ralladura de limón",
            "hojas de laurel",
            "sal",
            "pimienta",
            "ajo",
        ];
        dis11.image = "Barramundi.webp";

        const dis12 = this[MODEL].createDish("Koeksisters");
        dis12.description = "típico dulce africano(es como la masa de donuts)";
        dis12.ingredients = [
            "azúcar moreno",
            "harina blanca",
            "limón",
            "canela",
            "margarina",
            "huevo",
            "agua",
            "aceite de girasol",
        ];
        dis12.image = "Koeksisters.jpg";

        // Las categorías.
        const cat1 = this[MODEL].createCategory("Estrella", "Platos con gran popularidad");
        const cat2 = this[MODEL].createCategory("Tradicional", "Platos tradicionales");
        const cat3 = this[MODEL].createCategory("Postre", "Platos dulces");

        // Los alérgenos.
        const all1 = this[MODEL].createAllergen("Lactosa", "Alimentos derivados de los lacteos");
        const all2 = this[MODEL].createAllergen("Marísco", "Pescado y productos a base de pescado");
        const all3 = this[MODEL].createAllergen("Huevo", "Huevos y productos a base de huevo");
        const all4 = this[MODEL].createAllergen("Soja", "Soja y productos a base de soja");

        // Los menús.
        const men1 = this[MODEL].createMenu("Clásica", "Platos tradicionales españoles");
        const men2 = this[MODEL].createMenu("Innovador", "Platos que te los comes con la vista");
        const men3 = this[MODEL].createMenu("Internacional", "Platos de diferentes continentes");

        // Los restaurantes.
        const res1 = this[MODEL].createRestaurant("Serendipia 1º", "Primer restaurante", new Coordinate(12, 20));
        const res2 = this[MODEL].createRestaurant("Serendipia 2º", "Segundo restaurante", new Coordinate(35, 62));
        const res3 = this[MODEL].createRestaurant("Serendipia 3º", "Tercer restaurante", new Coordinate(71, 29));

        // Añadimos.
        this[MODEL].addDish(dis1, dis2, dis3, dis4, dis5, dis6, dis7, dis8, dis9, dis10, dis11, dis12);
        this[MODEL].addCategory(cat1, cat2, cat3);
        this[MODEL].addAllergen(all1, all2, all3, all4);
        this[MODEL].addMenu(men1, men2, men3);
        this[MODEL].addRestaurant(res1, res2, res3);

        // Asignamos.
        this[MODEL].assignCategoryToDish(cat1, dis1, dis6, dis10); // Estrella.
        this[MODEL].assignCategoryToDish(cat2, dis3, dis4, dis11); // Tradicional.
        this[MODEL].assignCategoryToDish(cat3, dis4, dis8, dis12); // Postre.

        this[MODEL].assignAllergenToDish(all1, dis1, dis4, dis8, dis9); // Lactosa.
        this[MODEL].assignAllergenToDish(all2, dis2, dis5, dis7, dis11); // Marisco.
        this[MODEL].assignAllergenToDish(all3, dis1, dis4, dis6, dis9, dis10, dis12); // Huevo.
        this[MODEL].assignAllergenToDish(all4, dis10); // Soja.

        this[MODEL].assignDishToMenu(dis1, men1); // Clásico.
        this[MODEL].assignDishToMenu(dis2, men1);
        this[MODEL].assignDishToMenu(dis3, men1);
        this[MODEL].assignDishToMenu(dis4, men1);
        this[MODEL].assignDishToMenu(dis5, men2); // Innovador.
        this[MODEL].assignDishToMenu(dis6, men2);
        this[MODEL].assignDishToMenu(dis7, men2);
        this[MODEL].assignDishToMenu(dis8, men2);
        this[MODEL].assignDishToMenu(dis9, men3); // Internacional.
        this[MODEL].assignDishToMenu(dis10, men3);
        this[MODEL].assignDishToMenu(dis11, men3);
        this[MODEL].assignDishToMenu(dis12, men3);
    }

}
export default RestaurantController;
