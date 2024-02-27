function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputElements = form.querySelectorAll(config.inputSelector);
    const buttonDisabledElement = form.querySelector(
      config.submitButtonSelector,
    );

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        const errorMessageElement =
          inputElement.parentElement.nextElementSibling;
        if (!inputElement.checkValidity()) {
          errorMessageElement.style.opacity = 1;
          inputElement.parentElement.classList.add(config.inputErrorClass);
          buttonDisabledElement.classList.add(config.inactiveButtonClass);
          errorMessageElement.textContent = inputElement.validationMessage;
        } else {
          errorMessageElement.style.opacity = 0;
          inputElement.parentElement.classList.remove(config.inputErrorClass);
          buttonDisabledElement.classList.remove(config.inactiveButtonClass);
          errorMessageElement.textContent = '';
        }
      });
    });
  });
}
