export function buildAd(ad) {
    return `
  <a class="ad" href="ad-detail.html?adId=${ad.id}">
  <div class="ad-container">  
  <ul>
    <li><h3>${ad.title}</h3></li>
    <li>Price: ${ad.price} €</li>
    <li>Type of Offer: ${ad.sale ? "On sale" : "On search"}</li>
    <li>Info: ${ad.description}</li>
    </ul>
    <img src="${ad.image}">
    </div>
  </a>
  `
}

export function buildEmptyAdsList() {
    return '<h3>Ups, no ads available so far...</h3>';
}