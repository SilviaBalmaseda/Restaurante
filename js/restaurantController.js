import { Coordinate } from "./objectsRestaurants.js";
import { getCookie, greetUser, saveUser } from "./util.js";
import RestaurantApp from './restaurantApp.js';

const MODEL = Symbol('RestaurantModel');
const VIEW = Symbol('RestaurantView');
const AUTH = Symbol('AUTH');
const USER = Symbol('USER');

class RestaurantController {
    constructor(modelRestaurant, viewRestaurant, auth) {
        this[MODEL] = modelRestaurant;
        this[VIEW] = viewRestaurant;
        this[AUTH] = auth;
        this[USER] = null;
        this.openedWindows = []; // Array para almacenar las ventanas abiertas.

        // Eventos iniciales del Controlador
        this.onLoad();
        // this.onInit();
        
        // Enlazamos handlers con la vista
        // this[VIEW].bindInit(this.handleInit);
    }

    onLoad = async () => {
        try {
            // Para abrirlo con el liveServer o el localhost, según donde lo abras.
            const isLiveServer = window.location.hostname === '127.0.0.1';
            const baseUrl = isLiveServer ? '../JSON/data.json' : 'http://localhost/Ejer/Clase/PruebaCliente/Restaurante/JSON/data.json';

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON.');
            }
            const data = await response.json();
            await this.initializeData(data);
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error.message);
        }

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

        this.onInit();
        this[VIEW].bindInit(this.handleInit);
    };

    // Para inicializar los objetos.
    initializeData = async (data) => {
        // Los platos.
        data.dishes.forEach(dish => {
            const newDish = this[MODEL].createDish(dish.name);
            newDish.description = dish.description;
            newDish.ingredients = dish.ingredients;
            newDish.image = dish.image;
            this[MODEL].addDish(newDish);
        });

        // Las categorías.
        data.categories.forEach(category => {
            const newCategory = this[MODEL].createCategory(category.name, category.description);
            this[MODEL].addCategory(newCategory);
        });

        // Los alérgenos.
        data.allergens.forEach(allergen => {
            const newAllergen = this[MODEL].createAllergen(allergen.name, allergen.description);
            this[MODEL].addAllergen(newAllergen);
        });

        // Los menús.
        data.menus.forEach(menu => {
            const newMenu = this[MODEL].createMenu(menu.name, menu.description);
            this[MODEL].addMenu(newMenu);
        });

        // Los restaurantes.
        data.restaurants.forEach(restaurant => {
            const newRestaurant = this[MODEL].createRestaurant(
                restaurant.name,
                restaurant.description,
                new Coordinate(restaurant.coordinates.latitude, restaurant.coordinates.longitude)
            );
            this[MODEL].addRestaurant(newRestaurant);
        });

        // Para asignar(guardamos los objetos en variables, para asignarlo mejor).
        let dis1 = this[MODEL].getDish("Croquetas").elem;
        let dis2 = this[MODEL].getDish("Pulpo a la gallega").elem;
        let dis3 = this[MODEL].getDish("Pisto Manchego").elem;
        let dis4 = this[MODEL].getDish("Torrijas").elem;
        let dis5 = this[MODEL].getDish("Ceviche de Salmón").elem;
        let dis6 = this[MODEL].getDish("Pita de pollo").elem;
        let dis7 = this[MODEL].getDish("Espaguetis de calabacín con gambas").elem;
        let dis8 = this[MODEL].getDish("Tarta de selva negra").elem;
        let dis9 = this[MODEL].getDish("Cachapas").elem;
        let dis10 = this[MODEL].getDish("Rollitos de primavera").elem;
        let dis11 = this[MODEL].getDish("Barramundi tradicional").elem;
        let dis12 = this[MODEL].getDish("Koeksisters").elem;
        
        let cat1 = this[MODEL].getCategory("Estrella");
        let cat2 = this[MODEL].getCategory("Tradicional"); 
        let cat3 = this[MODEL].getCategory("Postre"); 

        let all1 = this[MODEL].getAllergen("Lactosa"); 
        let all2 = this[MODEL].getAllergen("Marísco"); 
        let all3 = this[MODEL].getAllergen("Huevo"); 
        let all4 = this[MODEL].getAllergen("Soja"); 

        let men1 = this[MODEL].getMenu("Clásica").elem; 
        let men2 = this[MODEL].getMenu("Innovador").elem; 
        let men3 = this[MODEL].getMenu("Internacional").elem; 

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

    // Cuando el usuario hace login.
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

    // Cuando el ususario cierra sesión.
    onCloseSession() {
        this[USER] = null;
        this[VIEW].deleteUserCookie();
        this[VIEW].showIdentificationLink();
        this[VIEW].bindIdentificationLink(this.handleLoginForm);
        this[VIEW].removeAdminMenu();
    }

    // Mostrar los platos random.
    onInit = () => {
        let dishes = [...this[MODEL].getDishes()];
        this[VIEW].showRandomDishes(dishes);
    };

    // Para mostrar el formulario de login.
    handleLoginForm = () => {
        this[VIEW].showLogin();
        this[VIEW].bindLogin(this.handleLogin);
    };

    // Para validar si el usuario y la contraseña son correctos y si quiere recordarlo.
    handleLogin = (username, password, remember) => {
        if (this[AUTH].validateUser(username, password)) {
          this[USER] = this[AUTH].getUser(username);
          this.onOpenSession();
          if (remember) {
            this[VIEW].setUserCookie(this[USER]);
            saveUser();
          }
          greetUser();
        } else {
          this[VIEW].showInvalidUserMessage();
        }
    };

    // Para cuando se cierre sesión.
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

    // Mostrar todo lo que tiene que ver con la administración.
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
        this[VIEW].bindGenerateBackupBtn(this.handleGenerateBackup);
    }

    // Para mostrar y eliminar los platos favoritos.
    onfavorite = () => {
        // Eliminar del localStorage, si en el formulario han eliminado el plato.
        for (let index = localStorage.length-1; index >= 0; index--) {

            let dish = localStorage.key(index);
            
            if (this[MODEL].getDish(dish) == undefined) {
                // Eliminar en localStorage.
                localStorage.removeItem(dish);
            }
        }

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
        const cat = this[MODEL].createCategory(nameC);
        if (des != "" && des != undefined) {
            cat.description = des;
        }
        
        let done;
        let error;
        try {
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

    // Generar todos  los objetos actuales en la página, objetos creados y borrados, y guarde el fichero en una carpeta denominada “backup”.
    handleGenerateBackup = () => {
        const backup = this[MODEL].getBackup();
        // console.log(backup);
        let formData = new FormData();
        formData.append("backup", JSON.stringify(backup));
        let done = false;
        // Para abrirlo con el liveServer(no funciona el mensaje Modal) o el localhost, según donde lo abras.
        const isLiveServer = window.location.hostname === '127.0.0.1';
        const url = isLiveServer ? '../backup/backup.php' : 'http://localhost/Ejer/Clase/PruebaCliente/Restaurante/backup/backup.php';

        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            done = true;
            this[VIEW].showBackupModal(done, data.message); // Usa `data.message` en lugar de `error` para mostrar el mensaje del servidor
            // console.dir(data);
        })
        .catch(error => {
            console.log(error);
            this[VIEW].showBackupModal(done, error.message); // Muestra el mensaje de error en caso de fallo
        });
    }
}
export default RestaurantController;
