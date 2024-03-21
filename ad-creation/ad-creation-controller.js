import { loadSpinner } from "../utils/loadSpinner.js";
import { dispatchEvent } from "../utils/dispatchEvent.js"
import { insertAd } from "./ad-creation-model.js";

export function insertAdController(insertAdFormNode) {


    insertAdFormNode.addEventListener('submit', async (event) => {
        event.preventDefault();

        const adToInsert = handleInsertAdForm(insertAdFormNode);
        console.log('Esto es adToInsert: ', adToInsert)

        try {
            loadSpinner('show-spinner', insertAdFormNode);
            await insertAd(adToInsert);

            dispatchEvent('notification-creating-ad', {
                message: 'Your ad is live now!',
                type: 'success'
            }, insertAdFormNode);

            /* setTimeout(() => {
                window.location = "./index.html";
            }, 2000); */

        } catch (error) {
            dispatchEvent('notification-creating-ad', {
                message: error,
                type: 'error'
            }, insertAdFormNode);

        } finally {
            loadSpinner('hide-spinner', insertAdFormNode);
        }
    });

    function handleInsertAdForm(insertAdFormNode) {
        const formData = new FormData(insertAdFormNode);
        const name = formData.get("name");
        const price = formData.get("price");
        const typeOfOffer = formData.get("typeOfOffer");

        const isOnSale = (typeOfOffer === "onSale");
        const description = formData.get("description")

        const image = formData.get("image");
        console.log('Esto es image ', image)
        const category = formData.get("category");
        console.log('Esto es category ', category)

        const objetoPrueba = {
            name: name,
            price: price,
            sale: isOnSale,
            description: description,
            image: image,
            category: category
        }
        console.log('Esto es objeto prueba', objetoPrueba);

        return {
            name: name,
            price: price,
            sale: isOnSale,
            description: description,
            image: image,
            category: category
        };
    };

};