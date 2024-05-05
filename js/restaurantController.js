import { Coordinate } from "./objectsRestaurants.js";

const MODEL = Symbol('RestaurantModel');
const VIEW = Symbol('RestaurantView');
const LOAD_RESTAURANT_OBJECTS = Symbol('Load Restaurant Objects');

class RestaurantController {
    constructor(modelRestaurant, viewRestaurant) {
        this[MODEL] = modelRestaurant;
        this[VIEW] = viewRestaurant;

        // Eventos iniciales del Controlador
        this.onInit();
        this.onLoad();

        // Enlazamos handlers con la vista
        this[VIEW].bindInit(this.handleInit);
    }

    onInit = () => {
        this[VIEW].init();
    };

    onLoad = () => {
        this[LOAD_RESTAURANT_OBJECTS]();
        this[VIEW].showCategories(this[MODEL].getCategories());
        this[VIEW].showCategoriesMain(this[MODEL].getCategories());
        this[VIEW].showAllergens(this[MODEL].getAllergens());
        this[VIEW].showMenus(this[MODEL].getMenus());
        this[VIEW].showRestaurants(this[MODEL].getRestaurants());
        this[VIEW].showRandomDishes(this[MODEL].getDishes());

        // Almacenar los platos en un array.
        const dishes = [...this[MODEL].getDishes()];
        this[VIEW].showThatCategories(this[MODEL].getCategories(), dishes);
        this[VIEW].showThatAllergens(this[MODEL].getAllergens(), dishes);
        this[VIEW].showThatMenus(this[MODEL].getMenus());
        this[VIEW].showThatRestaurants(this[MODEL].getRestaurants());
    };

    handleInit = () => {
        this.onInit();
    };

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
