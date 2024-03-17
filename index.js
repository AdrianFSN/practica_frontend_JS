import { adsPanelController } from "./ads-list/ads-list-controller.js";


document.addEventListener('DOMContentLoaded', () => {
    const adsPanel = document.querySelector('.ads-panel');
    adsPanelController(adsPanel);
    console.log(`Esto es adsPanel desde el orquestador ${adsPanel}`)
})