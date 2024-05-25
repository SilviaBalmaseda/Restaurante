import RestaurantsModel from "./restaurantModel.js";
import RestaurantController from "./restaurantController.js";
import RestaurantView from "./restaurantView.js";
import AuthenticationService from "../authentication/authentication.js";

const RestaurantApp = new RestaurantController(
    RestaurantsModel.getInstance(),
    new RestaurantView(),
    AuthenticationService.getInstance(),
);

export default RestaurantApp;
