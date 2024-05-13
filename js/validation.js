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

function createDishValidation(handler) {
    const form = document.forms.fCreateDish;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        this.imgDish.value = this.imgDish.value.trim();
        showFeedBack(this.imgDish, true);

        this.ingDish.value = this.ingDish.value.trim();
        showFeedBack(this.ingDish, true);
    
        console.log(this.desDish,value);
        this.desDish.value = this.desDish.value.trim();
        showFeedBack(this.desDish, true);
    
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
          handler(this.nameDish.value, this.desDish.value, this.ingDish.value, this.imgDish.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
}

export {
    createDishValidation,
};