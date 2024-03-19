import { spinnerController } from "./spinner/spinner-controller.js"
import { notificationController } from "./notifications/notifications-controller.js"
import { registerUserController } from "./register-user/register-user-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#registerForm');

    const notifications = document.querySelector('.notification');
    const { showNotification } = notificationController(notifications);

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);

    registerForm.addEventListener('register-user-notification', (event) => {
        event.stopPropagation();
        showNotification(event.detail.message, event.detail.type);
    });

    registerForm.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation();
    })

    registerForm.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation();
    })

    registerUserController(registerForm);
})