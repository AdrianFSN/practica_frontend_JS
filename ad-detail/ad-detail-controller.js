import { loadSpinner } from "../utils/loadSpinner.js";
import { getAdDetail, getUserData, deleteAd } from "./ad-detail-model.js";
import { buildAdDetail } from "./ad-detail-view.js";
import { dispatchEvent } from "../utils/dispatchEvent.js";

export async function adDetailController(adDetailNode) {
    const params = new URLSearchParams(window.location.search);
    const adId = params.get('adId');

    if (!adId) {
        window.location.href = './index.html'
    };

    goBackButton(adDetailNode)

    try {
        loadSpinner('show-spinner', adDetailNode)
        const ad = await getAdDetail(adId);

        handleRemoveAdButton(adDetailNode, ad);

        const container = adDetailNode.querySelector('#container');
        container.innerHTML = buildAdDetail(ad);

    } catch (error) {
        dispatchEvent('error-loading-ad-detail', {
            message: error,
            type: 'error'
        }, adDetailNode);

    } finally {
        loadSpinner('hide-spinner', adDetailNode);
    };

    async function handleRemoveAdButton(adDetailNode, ad) {
        const token = localStorage.getItem('token');
        const userData = await getUserData(token);
        const removeAdButton = adDetailNode.querySelector('#removeAdButton');

        if (ad.userId === userData.id) {
            removeAdButton.classList.remove('.remove-button-hidden');
            removeAdButton.addEventListener('click', () => {
                removeAd(ad.id, token)
            });
        } else {
            removeAdButton.classList.add('.remove-button-hidden');
        };
    };

    async function removeAd(adId, token) {
        if (window.confirm('Are you sure you want to delete this ad?')) {
            try {
                await deleteAd(adId, token);
                setTimeout(() => {
                    window.location.href = './index.html'
                }, 2000);

            } catch (error) {
                alert(error);
            };
        };
    };

    function goBackButton(adDetailNode) {
        const backButton = adDetailNode.querySelector('#goBack');
        backButton.addEventListener('click', () => {
            window.history.back()
        });
    };

};