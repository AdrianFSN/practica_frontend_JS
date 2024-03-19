function parseAd(ad) {
    return {
        owner: ad.userId,
        title: ad.name,
        description: ad.description,
        image: ad.image,
        id: ad.id,
        tag: ad.tags,
        price: ad.price,
        sale: ad.sale
    }
}

export async function getAdDetail(adId) {

    const url = `http://localhost:8000/api/ads/${adId}`;
    let ad = {};
    try {
        const response = await fetch(url);
        const data = await response.json();
        ad = parseAd(data);

    } catch (error) {
        throw new Error(`There was an error getting ad with id: ${adId}`)
    }

    return ad;
};