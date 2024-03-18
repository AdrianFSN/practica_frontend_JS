import { getAds } from "./ads-list-model.js";
import { buildAd, buildEmptyAdsList } from "./ads-list-view.js";
import { dispatchEvent } from "../utils/dispatchEvent.js";

export async function adsPanelController(adsPanel) {
    try {
        const ads = await getAds();
        if (ads.length > 0) {
            renderAds(ads, adsPanel);
        } else {
            renderEmptyAdsList(adsPanel);
        };

    } catch (errorMessage) {
        dispatchEvent('error-loading-ads', {
            message: errorMessage,
            type: 'error'
        }, adsPanel);
    } finally {
        alert('Aquí debería desaparecer el spinner')
    }
}

function renderAds(ads, adsPanel) {
    ads.forEach(ad => {
        const adPiece = document.createElement('div');
        adPiece.innerHTML = buildAd(ad);
        adsPanel.appendChild(adPiece);
    })
};

function renderEmptyAdsList(adsPanel) {
    adsPanel.innerHTML = buildEmptyAdsList();
}