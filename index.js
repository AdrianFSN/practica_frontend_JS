
import { spinnerController } from "./spinner/spinner-controller.js";
import { adsPanelController } from "./ads-list/ads-list-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";


document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.querySelector('.notification-list');
    const adsPanel = document.querySelector('.ads-panel');
    const { showNotification } = notificationController(notificationList);
    const spinner = document.querySelector('#spinner');
    const { showSpinner, hideSpinner } = spinnerController(spinner)

    adsPanel.addEventListener('error-loading-ads', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    });

    adsPanel.addEventListener('show-spinner', showSpinner);
    adsPanel.addEventListener('hide-spinner', hideSpinner);

    adsPanelController(adsPanel);
})