"use strict";
import {
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException
} from './exceptions.js';

// Expresion para un nombre(name).
const nombre = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;

// Expresión para una descripción(description).
const descripcion = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9.,:;'"()¿?¡!\-_\s]+$/;

// Expresión para un String con la ruta donde está ubicada una imagen(image).
const ruta = /^.*\.(jpg|jpeg|png|gif|bmp)$/;

class Dish {
    #name;
    #description;
    #ingredients;
    #image;

    constructor(name, description, ingredients, image) {
        if (!new.target) throw new InvalidAccessConstructorException();

        if (name === 'undefined' || name === '' || !name) throw new EmptyValueException("name");
        if (nombre.test(name) !== true)
            throw new InvalidValueException("name", name);

        // No son obligatorias.
        if (description || description === '') {
            if (description === 'undefined' || description === '') throw new EmptyValueException("description");
            if (descripcion.test(description) !== true)
                throw new InvalidValueException("description", description);
        }

        if (ingredients) {
            if (!(Array.isArray(ingredients))) throw EmptyValueException("ingredients");
        }

        if (image) {
            if (image === 'undefined' || image === '') throw new EmptyValueException("image");
            if (ruta.test(image) !== true)
                throw new InvalidValueException("image", image);
        }

        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (value === 'undefined' || value === '' || !value) throw new EmptyValueException("name");
        if (nombre.test(value) !== true)
            throw new InvalidValueException("name", value);
        this.#name = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        if (description === 'undefined' || description === '') throw new EmptyValueException("description");
        if (descripcion.test(description) !== true)
            throw new InvalidValueException("description", description);
        this.#description = value;
    }

    get ingredients() {
        return this.#ingredients;
    }
    set ingredients(value) {
        if (ingredients === 'undefined' || ingredients === '') throw new EmptyValueException("ingredients");
        if (!(Array.isArray(value))) throw EmptyValueException("ingredients");

        this.#ingredients = value;
    }

    get image() {
        return this.#image;
    }
    set image(value) {
        if (value === 'undefined' || value === '') throw new EmptyValueException("image");
        if (ruta.test(value) !== true)
            throw new InvalidValueException("image", value);
        this.#image = value;
    }

    toString() {
        // return `Dish: ${this.name} ${this.description} ${this.ingredients} ${this.image}`;
        return "Dish: " + this.name + ", " + this.description + ", " + this.ingredients + ", " + this.image;
    }
}

class Category {
    #name;
    #description;

    constructor(name, description) {
        if (!new.target) throw new InvalidAccessConstructorException();

        if (name === 'undefined' || name === '' || !name) throw new EmptyValueException("name");
        if (nombre.test(name) !== true)
            throw new InvalidValueException("name", name);

        // No son obligatorias.
        if (description) {
            if (description === 'undefined' || description === '') throw new EmptyValueException("description");
            if (descripcion.test(description) !== true)
                throw new InvalidValueException("description", description);
        }

        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (value === 'undefined' || value === '' || !value) throw new EmptyValueException("name");
        if (nombre.test(value) !== true)
            throw new InvalidValueException("name", value);
        this.#name = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        if (description === 'undefined' || description === '') throw new EmptyValueException("description");
        if (descripcion.test(description) !== true)
            throw new InvalidValueException("description", description);
        this.#description = value;
    }

    toString() {
        return "Category: " + this.name + ", " + this.description;
    }
}

class Allergen {
    #name;
    #description;

    constructor(name, description) {
        if (!new.target) throw new InvalidAccessConstructorException();

        if (name === 'undefined' || name === '' || !name) throw new EmptyValueException("name");
        if (nombre.test(name) !== true)
            throw new InvalidValueException("name", name);

        // No son obligatorias.
        if (description) {
            if (description === 'undefined' || description === '') throw new EmptyValueException("description");
            if (descripcion.test(description) !== true)
                throw new InvalidValueException("description", description);
        }

        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (value === 'undefined' || value === '' || !value) throw new EmptyValueException("name");
        if (nombre.test(value) !== true)
            throw new InvalidValueException("name", value);
        this.#name = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        if (description === 'undefined' || description === '') throw new EmptyValueException("description");
        if (descripcion.test(description) !== true)
            throw new InvalidValueException("description", description);
        this.#description = value;
    }

    toString() {
        return "Allergen: " + this.name + ", " + this.description;
    }
}

class Menu {
    #name;
    #description;

    constructor(name, description) {
        if (!new.target) throw new InvalidAccessConstructorException();

        if (name === 'undefined' || name === '' || !name) throw new EmptyValueException("name");
        if (nombre.test(name) !== true)
            throw new InvalidValueException("name", name);

        // No son obligatorias.
        if (description) {
            if (description === 'undefined' || description === '') throw new EmptyValueException("description");
            if (descripcion.test(description) !== true)
                throw new InvalidValueException("description", description);
        }

        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (value === 'undefined' || value === '' || !value) throw new EmptyValueException("name");
        if (nombre.test(value) !== true)
            throw new InvalidValueException("name", value);
        this.#name = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        if (description === 'undefined' || description === '') throw new EmptyValueException("description");
        if (descripcion.test(description) !== true)
            throw new InvalidValueException("description", description);
        this.#description = value;
    }

    toString() {
        return "Menu: " + this.name + ", " + this.description;
    }
}

class Coordinate {
    #latitude;
    #longitude;

    constructor(latitude = 0, longitude = 0) {
        if (!new.target) throw new InvalidAccessConstructorException();

        latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
        if (Number.isNaN(latitude) || latitude < -90 || latitude > 90 || !latitude)
            throw new InvalidValueException("latitude", latitude);

        longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
        if (Number.isNaN(longitude) || longitude < -180 || longitude > 180 || !longitude)
            throw new InvalidValueException("longitude", longitude);

        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    get latitude() {
        return this.#latitude;
    }
    set latitude(value) {
        value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
        if (Number.isNaN(value) || value < -90 || value > 90)
            throw new InvalidValueException("latitude", value);
        this.#latitude = value;
    }

    get longitude() {
        return this.#longitude;
    }
    set longitude(value) {
        value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
        if (Number.isNaN(value) || value < -180 || value > 180)
            throw new InvalidValueException("longitude", value);
        this.#longitude = value;
    }

    toString() {
        return "Coordinate: " + this.latitude + ", " + this.longitude;
    }
}

class Restaurant {
    #name;
    #description;
    #location;

    constructor(name, description, location) {
        if (!new.target) throw new InvalidAccessConstructorException();

        if (name === 'undefined' || name === '' || !name) throw new EmptyValueException("name");
        if (nombre.test(name) !== true)
            throw new InvalidValueException("name", name);

        // No son obligatorias.
        if (description) {
            if (description === 'undefined' || description === '') throw new EmptyValueException("description");
            if (descripcion.test(description) !== true)
                throw new InvalidValueException("description", description);
        }

        if (location) {
            if (!(location instanceof Coordinate)) throw new InvalidValueException("location", location);
        }

        this.#name = name;
        this.#description = description;
        this.#location = location;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (value === 'undefined' || value === '' || !value) throw new EmptyValueException("name");
        if (nombre.test(value) !== true)
            throw new InvalidValueException("name", value);
        this.#name = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        if (description === 'undefined' || description === '') throw new EmptyValueException("description");
        if (descripcion.test(description) !== true)
            throw new InvalidValueException("description", description);
        this.#description = value;
    }

    get location() {
        return this.#location;
    }
    set location(value) {
        if (location instanceof Coordinate) throw new InvalidValueException("location", location);
        this.#location = value;
    }

    toString() {
        return "Restaurant: " + this.name + ", " + this.description + ", " + this.location;
    }
}

export { Dish, Category, Allergen, Menu, Coordinate, Restaurant };
