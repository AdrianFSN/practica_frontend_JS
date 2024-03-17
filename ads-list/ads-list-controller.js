import { getAds } from "./ads-list-model.js";
import { buildAd, buildEmptyAdsList } from "./ads-list-view.js";

/* export function adsPanelController(adsPanel) {
    const ads = ['anuncio1', 'anuncio2', 'anuncio3']
    ads.forEach(item => {
        const addItem = document.createElement('div');
        addItem.innerHTML = `
        <p>He añadido ${item}</p>
        `
        adsPanel.appendChild(addItem)
        console.log(`Esto es adsPanel jujano ${adsPanel}`)
    })
} */

export async function adsPanelController(adsPanel) {
    try {
        const ads = await getAds();
        if (ads.length > 0) {
            renderAds(ads, adsPanel);
        } else {
            renderEmptyAdsList(adsPanel);
        };

    } catch (error) {
        alert("Ha habido un error al cargar los ads")
    }
}

function renderAds(ads, adsPanel) {
    ads.forEach(ad => {
        const adPiece = document.createElement('div');
        adPiece.innerHTML = buildAd(ad);
        adsPanel.appendChild(adPiece);
        console.log(adPiece)
        console.log(adsPanel)
    })
};

function renderEmptyAdsList(adsPanel) {
    adsPanel.innerHTML = buildEmptyAdsList();
}