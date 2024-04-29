import RestaurantsModel, { Restaurant } from "./restaurantModel.js";
import RestaurantController from "./restaurantController.js";
import RestaurantView from "./restaurantView.js";

const RestaurantApp = new RestaurantController(
    RestaurantsModel.getInstance(),
    new RestaurantView()
);

export default RestaurantApp;
