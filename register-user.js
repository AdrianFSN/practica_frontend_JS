import { notificationController } from "./notifications/notifications-controller.js"
import { registerUserController } from "./register-user/register-user-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#registerForm');
    const notifications = document.querySelector('.notification');

    const { showNotification } = notificationController(notifications);

    registerForm.addEventListener('register-user-notification', (event) => {
        event.stopPropagation();
        showNotification(event.detail.message, event.detail.type);
    });

    registerUserController(registerForm);
})