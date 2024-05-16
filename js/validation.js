function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ? input.parentElement.querySelector('div.valid-feedback') : input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    // messageDiv.classList.remove('d-none');
    // messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
        messageDiv.innerHTML = message;
    }
}

// Validación en línea.
function defaultCheckElement() {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}

// Función para crear un nuevo plato.
function createDishValidation(handler) {
    const form = document.forms.fCreateDish;
    form.setAttribute('novalidate', true);
    // Validar datos.
    form.addEventListener('submit', function (event) {
      // Prevenir el comportamiento por defecto del enlace.
      event.preventDefault();

      let isValid = true;
      let firstInvalidElement = null;

      // Seleccionar el nombre de la imágen pasada.
      let imgDish = undefined;
      if (this.imgDish.files[0] != undefined) {
          imgDish = this.imgDish.files[0].name;
      }
      showFeedBack(this.imgDish, true);
      
      let arrayIng = this.ingDish.value.split(","); // Pasarlo a array, elemento separador comas','.
      let ingredients = []; // variable para guardar el array sin espacios en blanco al inicio y final de cada ingrediente.
      arrayIng.forEach((element) => ingredients.push(element.trim())); // Quitar los espaciós en blanco en las palabras.
      this.ingDish.value = ingredients
      showFeedBack(this.ingDish, true);

      this.desDish.value = this.desDish.value.trim();
      showFeedBack(this.desDish, true);

      this.sCategory.value = this.sCategory.value.trim();
      showFeedBack(this.sCategory, true);
      
      this.sAllergen.value = this.sAllergen.value.trim();
      showFeedBack(this.sAllergen, true);
  
      if (!this.nameDish.checkValidity()) {
        isValid = false;
        showFeedBack(this.nameDish, false);
        firstInvalidElement = this.nameDish;
      } else {
        showFeedBack(this.nameDish, true);
      }

      if (!isValid) {
          firstInvalidElement.focus();
      } else {
          handler(this.nameDish.value, this.desDish.value, ingredients, imgDish, this.sCategory.value, this.sAllergen.value);
          // handler(this.nameDish.value, this.desDish.value, this.ingDish.value, this.imgDish.value, this.sCategory.value, this.sAllergen.value);
      }
      event.stopPropagation();
    });
  
    // Estilo si está bien(verde) o mal(rojo).
    form.nameDish.addEventListener('change', defaultCheckElement);
    form.desDish.addEventListener('change', defaultCheckElement);
    form.ingDish.addEventListener('change', defaultCheckElement);
    form.imgDish.addEventListener('change', defaultCheckElement);
    form.sCategory.addEventListener('change', defaultCheckElement);
    form.sAllergen.addEventListener('change', defaultCheckElement);
}

function deleteDishValidation(handler) {
  const form = document.forms.fDeleteDishes;
  form.setAttribute('novalidate', true);
  let d = document.getElementById('sDish');
  
  form.addEventListener('submit', (function (event) {
    // Prevenir el comportamiento por defecto del enlace.
    event.preventDefault();

    let isValid = true;
    let firstInvalidElement = null;

    let selec = [];
    // Guardamos los select seleccionados. 
    for (const elem of d.options) {
      if (elem.selected == true) {
        selec.push(elem.value);
      }
    }
    
    if (selec.length!=0) {
      this.sDish.value = selec;
    }
    else {
      isValid = false;
    }

    if (!this.sDish.checkValidity()) {
      isValid = false;
      showFeedBack(this.sDish, false);
      firstInvalidElement = this.sDish;
    } else {
      showFeedBack(this.sDish, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(selec);
    }

    event.stopPropagation();

    form.sDish.addEventListener('change', defaultCheckElement);
  }));
}

// Asignar

// Función para crear una nueva categoría.
function createCategoryValidation(handler) {
  const form = document.forms.fCreateC;
  form.setAttribute('novalidate', true);
  // Validar datos.
  form.addEventListener('submit', function (event) {
      // Prevenir el comportamiento por defecto del enlace.
      event.preventDefault();

      let isValid = true;
      let firstInvalidElement = null;

      this.desCat.value = this.desCat.value.trim();
      showFeedBack(this.desCat, true);

      if (!this.nameCat.checkValidity()) {
          isValid = false;
          showFeedBack(this.nameCat, false);
          firstInvalidElement = this.nameCat;
        } else {
          showFeedBack(this.nameCat, true);
        }

      if (!isValid) {
          firstInvalidElement.focus();
      } else {
          handler(this.nameCat.value, this.desCat.value, );
      }
      event.stopPropagation();
  });

  // Estilo si está bien(verde) o mal(rojo).
  form.nameCat.addEventListener('change', defaultCheckElement);
  form.desCat.addEventListener('change', defaultCheckElement);
}

function deleteCategoryValidation(handler) {
  const form = document.forms.fDeleteC;
  form.setAttribute('novalidate', true);
  let c = document.getElementById('seCategory');
  
  form.addEventListener('submit', (function (event) {
    // Prevenir el comportamiento por defecto del enlace.
    event.preventDefault();

    let isValid = true;
    let firstInvalidElement = null;

    let selec = [];
    // Guardamos los select seleccionados. 
    for (const elem of c.options) {
      if (elem.selected == true) {
        selec.push(elem.value);
      }
    }
    
    if (selec.length!=0) {
      this.seCategory.value = selec;
    }
    else {
      isValid = false;
    }

    if (!this.seCategory.checkValidity()) {
      isValid = false;
      showFeedBack(this.seCategory, false);
      firstInvalidElement = this.seCategory;
    } else {
      showFeedBack(this.seCategory, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(selec);
    }

    event.stopPropagation();

    form.seCategory.addEventListener('change', defaultCheckElement);
  }));
}

// Función para crear un nuevo restaurante.
function createRestaurantValidation(handler) {
  const form = document.forms.fCreateRest;
  form.setAttribute('novalidate', true);
  // Validar datos.
  form.addEventListener('submit', function (event) {
      // Prevenir el comportamiento por defecto del enlace.
      event.preventDefault();

      let isValid = true;
      let firstInvalidElement = null;

      this.lonRest.value = this.lonRest.value.trim();
      showFeedBack(this.lonRest, true);

      this.latRest.value = this.latRest.value.trim();
      showFeedBack(this.latRest, true);

      this.desRest.value = this.desRest.value.trim();
      showFeedBack(this.desRest, true);
  
      if (!this.nameRest.checkValidity()) {
        isValid = false;
        showFeedBack(this.nameRest, false);
        firstInvalidElement = this.nameRest;
      } else {
        showFeedBack(this.nameRest, true);
      }

      if (!isValid) {
          firstInvalidElement.focus();
      } else {
          handler(this.nameRest.value, this.desRest.value, this.latRest.value, this.lonRest.value);
      }
      event.stopPropagation();
  });

  // Estilo si está bien(verde) o mal(rojo).
  form.nameRest.addEventListener('change', defaultCheckElement);
  form.desRest.addEventListener('change', defaultCheckElement);
  form.latRest.addEventListener('change', defaultCheckElement);
  form.lonRest.addEventListener('change', defaultCheckElement);
}

// Añadir


export {
    createDishValidation,
    deleteDishValidation,

    createCategoryValidation,
    deleteCategoryValidation,
    createRestaurantValidation,

};