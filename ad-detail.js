import { adDetailController } from "./ad-detail/ad-detail-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.querySelector('.notification-list');
    const adDetail = document.querySelector('.ad-detail');
    const { showNotification } = notificationController(notificationList);

    adDetail.addEventListener('error-loading-ad-detail', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    })

    adDetailController(adDetail);
});