import { spinnerController } from "./spinner/spinner-controller.js";
import { adDetailController } from "./ad-detail/ad-detail-controller.js";
import { notificationController } from "./notifications/notifications-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const adDetail = document.querySelector('.ad-detail');

    const notificationList = document.querySelector('.notification-list');
    const { showNotification } = notificationController(notificationList);

    const spinner = document.querySelector('#spinner')
    const { showSpinner, hideSpinner } = spinnerController(spinner)

    adDetail.addEventListener('error-loading-ad-detail', (event) => {
        showNotification(event.detail.message, event.detail.type);
        event.stopPropagation();
    })

    adDetail.addEventListener('show-spinner', (event) => {
        showSpinner();
        event.stopPropagation()
    })
    adDetail.addEventListener('hide-spinner', (event) => {
        hideSpinner();
        event.stopPropagation()
    })

    adDetailController(adDetail);
});