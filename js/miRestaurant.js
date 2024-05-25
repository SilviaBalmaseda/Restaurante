import RestaurantApp from "./restaurantApp.js";

const historyActions = {
    init: () => {
      RestaurantApp.handleInit();
    },
    showCategories: () => {
      RestaurantApp.handleCategory();
    },
    showAllergens: () => {
      RestaurantApp.handleAllergen();
    },
    showMenus: () => {
      RestaurantApp.handleMenu();
    },
    showRestaurants: () => {
      RestaurantApp.handleRestaurant();
    },
    showAdmin: () => {
      RestaurantApp.handleAdmin();
    },

    // lo del main.
    

    CloseAllWindows: () => {
        RestaurantApp.handleCloseAllWindows();
    },

    login: () => ManagerApp.handleLoginForm(),
};

window.addEventListener('popstate', (event) => {
    if (event.state) {
      historyActions[event.state.action](event);
    }
});

history.replaceState({ action: 'init' }, null);