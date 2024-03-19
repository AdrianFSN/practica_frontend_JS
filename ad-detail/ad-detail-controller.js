import { getAdDetail } from "./ad-detail-model.js";
import { buildAdDetail } from "./ad-detail-view.js";

export async function adDetailController(node) {
    const params = new URLSearchParams(window.location.search);
    const adId = params.get('adId');

    if (!adId) {
        window.location.href = './index.html'
    }

    try {
        const ad = await getAdDetail(adId);
        node.innerHTML = buildAdDetail(ad);
    } catch (error) {
        alert(`Pues me ha salido un ${error}`);
    }

}