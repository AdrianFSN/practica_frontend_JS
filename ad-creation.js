import { sessionController } from "./session/session-controller.js";
import { notificationController } from "./notifications/notifications-controller.js"
import { spinnerController } from "./spinner/spinner-controller.js";
import { insertAdController } from "./ad-creation/ad-creation-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const session = document.querySelector('#session');
    sessionController(session);

    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner);

    const notification = document.querySelector('.notification');
    const { showNotification } = notificationController(notification);


    const insertAdFormNode = document.querySelector('#insertAd')

    insertAdFormNode.addEventListener('show-spinner', (event) => {
        event.stopPropagation();
        showSpinner();
    });

    insertAdFormNode.addEventListener('hide-spinner', (event) => {
        event.stopPropagation();
        hideSpinner();
    });

    insertAdFormNode.addEventListener('notification-creating-ad', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();

    })

    insertAdController(insertAdFormNode);
})