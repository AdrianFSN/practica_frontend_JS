import { insertAdController } from "./ad-creation/ad-creation-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const insertAdFormNode = document.querySelector('#insertAd')

    insertAdController(insertAdFormNode);
})