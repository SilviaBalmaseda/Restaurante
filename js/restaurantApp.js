import RestaurantModel from "./restaurantModel.js";
import RestaurantController from "./restaurantController.js";
import RestaurantView from "./restaurantView.js";

const RestaurantApp = new RestaurantController(
  RestaurantModel.getInstance(),
  new RestaurantView()
);

export default RestaurantApp;
