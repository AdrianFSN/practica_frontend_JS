import { buildNotification } from "./notifications-view.js";


export function notificationController(notificationNode) {
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerHTML = buildNotification(message);
        console.log('Esto es notification ', notification)
        console.log('Esto es notificationNode ', notificationNode)
        notificationNode.appendChild(notification);

        setTimeout(() => {
            notification.remove()
        }, 5000);
    }

    return {
        showNotification
    }
};