import { adsPanelController } from "./ads-list/ads-list-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";


document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.querySelector('.notification-list');
    const adsPanel = document.querySelector('.ads-panel');
    const { showNotification } = notificationController(notificationList);

    adsPanel.addEventListener('error-loading-ads', (event) => {
        showNotification(event.detail.message, event.detail.type)
    });

    adsPanelController(adsPanel);
})