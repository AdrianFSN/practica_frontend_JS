import { insertAd } from "./ad-creation-model.js";

export function insertAdController(insertAdFormNode) {


    insertAdFormNode.addEventListener('submit', async (event) => {
        event.preventDefault();

        const adToInsert = handleInsertAdForm(insertAdFormNode);

        try {
            await insertAd(adToInsert);
            setTimeout(() => {
                window.location = "./index.html";
            }, 2000);
        } catch (error) {
            alert(error)
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
        const category = formData.get("category");

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