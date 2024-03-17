export function buildAd(ad) {
    return `
  <a class="ad" href="ad-detail.html?adId=${ad.id}">
    <p>${ad.title}</p>
    <p>Price: ${ad.price}</p>
    <p>Type: ${ad.sale ? "On sale" : "On search"}</p>
    <p>Info: ${ad.description}</p>
  </a>
  `
}

export function buildEmptyAdsList() {
    return '<h3>Ups, no ads available so far...</h3>';
}