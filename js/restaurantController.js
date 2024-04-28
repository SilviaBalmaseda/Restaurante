const MODEL = Symbol('RestaurantModel'); 
const VIEW = Symbol('RestaurantView'); 
const LOAD_RESTAURANT_OBJECTS = Symbol('Load Restaurant Objects');
 
class RestaurantController { 
  constructor(model, view) { 
    this[MODEL] = model; 
    this[VIEW] = view; 

    this.onLoad();
    this.onInit();

    this[VIEW].bindInit(this.handleInit);
  } 

  //

  onInit = () => {
    this[VIEW].init();
  };


  // Eventos de aplicación

  onLoad = () => {
    this[LOAD_RESTAURANT_OBJECTS]();
    // this[VIEW].showProductTypes();
    // this[VIEW].showProductTypesInMenu();
    // this.onAddCategory();
    // this[VIEW].bindProductsTypeList(this.handleProductsTypeList);
    // this[VIEW].bindProductsTypeListInMenu(this.handleProductsTypeList);
  };


  // Métodos handlers

  handleInit = () => {
    this.onInit();
  };

} 

export default RestaurantController; 