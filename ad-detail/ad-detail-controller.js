import { loadSpinner } from "../utils/loadSpinner.js";
import { getAdDetail } from "./ad-detail-model.js";
import { buildAdDetail } from "./ad-detail-view.js";
import { dispatchEvent } from "../utils/dispatchEvent.js";

export async function adDetailController(node) {
    const params = new URLSearchParams(window.location.search);
    const adId = params.get('adId');

    if (!adId) {
        window.location.href = './index.html'
    }

    try {
        loadSpinner('show-spinner', node)
        const ad = await getAdDetail(adId);
        node.innerHTML = buildAdDetail(ad);
    } catch (error) {
        dispatchEvent('error-loading-ad-detail', {
            message: error,
            type: 'error'
        }, node);
    } finally {
        loadSpinner('hide-spinner', node);
    }

}