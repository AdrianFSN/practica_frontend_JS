import { spinnerController } from "./spinner/spinner-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";
import { loginController } from "./login/login-controller.js";


document.addEventListener('DOMContentLoaded', () => {
    const loginFormNode = document.querySelector('#loginForm');

    const notifications = document.querySelector('.notification');
    const { showNotification } = notificationController(notifications)

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);

    loginFormNode.addEventListener('login-user-notification', (event) => {
        event.stopPropagation();
        showNotification(event.detail.message, event.detail.type);
    });

    loginFormNode.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation();
    });

    loginFormNode.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation();
    });

    loginController(loginFormNode);
});