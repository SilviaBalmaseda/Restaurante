function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ? input.parentElement.querySelector('div.valid-feedback') : input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
        messageDiv.innerHTML = message;
    }
}

function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}

// Para resetear todos los formularios.
function resetForms() {
    for (const elem of document.forms) {
        elem.reset();
    }
}

function createDishValidation(handler) {
    const form = document.forms.fCreateDish;
    form.setAttribute('novalidate', true);
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
    resetForms();
}

// Lo tenemos que llamar cuando ya este pintado, porque sino lo llama varias veces.
// function createDishValidation(handler) {
//     const form = document.forms.fCreateDish;
//     form.setAttribute('novalidate', true);

//     // Primero, eliminamos cualquier manejador de eventos submit anterior asociado al formulario.
//     form.removeEventListener('submit', handleFormSubmit);

//     // Definimos el manejador de eventos submit.
//     function handleFormSubmit(event) {
//         event.preventDefault(); // Prevenir el envío del formulario por defecto.
//         console.log("entra");
        
//         let isValid = true;
//         let firstInvalidElement = null;

//         // Seleccionar el nombre de la imágen pasada.
//         let imgDish = undefined;
//         if (this.imgDish.files[0] != undefined) {
//             imgDish = this.imgDish.files[0].name;
//         }
//         showFeedBack(this.imgDish, true);
        
//         let arrayIng = this.ingDish.value.split(","); // Pasarlo a array, elemento separador comas','.
//         let ingredients = []; // variable para guardar el array sin espacios en blanco al inicio y final de cada ingrediente.
//         arrayIng.forEach((element) => ingredients.push(element.trim())); // Quitar los espaciós en blanco en las palabras.
//         this.ingDish.value = ingredients;
//         showFeedBack(this.ingDish, true);

//         this.desDish.value = this.desDish.value.trim();
//         showFeedBack(this.desDish, true);

//         this.sCategory.value = this.sCategory.value.trim();
//         showFeedBack(this.sCategory, true);
        
//         this.sAllergen.value = this.sAllergen.value.trim();
//         showFeedBack(this.sAllergen, true);
    
//         if (!this.nameDish.checkValidity()) {
//           isValid = false;
//           showFeedBack(this.nameDish, false);
//           firstInvalidElement = this.nameDish;
//         } else {
//           showFeedBack(this.nameDish, true);
//         }

//         if (!isValid) {
//             firstInvalidElement.focus();
//         } else {
//             handler(this.nameDish.value, this.desDish.value, ingredients, imgDish, this.sCategory.value, this.sAllergen.value);
//             // handler(this.nameDish.value, this.desDish.value, this.ingDish.value, this.imgDish.value, this.sCategory.value, this.sAllergen.value);
//         }
//         event.stopPropagation();
//     }

//     // Agregamos el nuevo manejador de eventos submit al formulario.
//     form.addEventListener('submit', handleFormSubmit);

//     resetForms();
// }

// function createDishValidation(handler) {
//     const form = document.forms.fCreateDish;
//     form.setAttribute('novalidate', true);

//     // Primero, eliminamos cualquier manejador de eventos submit anterior asociado al formulario.
//     form.removeEventListener('submit', handleFormSubmit);

//     // Definimos el manejador de eventos submit.
//     function handleFormSubmit(event) {
//         event.preventDefault(); // Prevenir el envío del formulario por defecto.
//         console.log("entra");
        
//         let isValid = true;
//         let firstInvalidElement = null;

//         // Seleccionar el nombre de la imágen pasada.
//         let imgDish = undefined;
//         if (this.imgDish.files[0] != undefined) {
//             imgDish = this.imgDish.files[0].name;
//         }
//         showFeedBack(this.imgDish, true);
        
//         let arrayIng = this.ingDish.value.split(","); // Pasarlo a array, elemento separador comas','.
//         let ingredients = []; // variable para guardar el array sin espacios en blanco al inicio y final de cada ingrediente.
//         arrayIng.forEach((element) => ingredients.push(element.trim())); // Quitar los espaciós en blanco en las palabras.
//         this.ingDish.value = ingredients;
//         showFeedBack(this.ingDish, true);

//         this.desDish.value = this.desDish.value.trim();
//         showFeedBack(this.desDish, true);

//         this.sCategory.value = this.sCategory.value.trim();
//         showFeedBack(this.sCategory, true);
        
//         this.sAllergen.value = this.sAllergen.value.trim();
//         showFeedBack(this.sAllergen, true);
    
//         if (!this.nameDish.checkValidity()) {
//           isValid = false;
//           showFeedBack(this.nameDish, false);
//           firstInvalidElement = this.nameDish;
//         } else {
//           showFeedBack(this.nameDish, true);
//         }

//         if (!isValid) {
//             firstInvalidElement.focus();
//         } else {
//             handler(this.nameDish.value, this.desDish.value, ingredients, imgDish, this.sCategory.value, this.sAllergen.value);
//             // handler(this.nameDish.value, this.desDish.value, this.ingDish.value, this.imgDish.value, this.sCategory.value, this.sAllergen.value);
//         }
//         event.stopPropagation();
//     }

//     // Agregamos el nuevo manejador de eventos submit al formulario.
//     form.addEventListener('submit', handleFormSubmit);

//     resetForms();
// }

export {
    createDishValidation,
};