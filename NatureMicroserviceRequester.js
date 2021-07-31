window.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://nature-image-web-scraper.wl.r.appspot.com/a-nature-image',
        {method: 'GET'})
        .then(response => response.json())
        .then(data => applyBackground(data.imageUrl));
});

function applyBackground(theURL) {
    console.log(theURL)
    const page_body = document.body
    page_body.style.backgroundImage = `url(${theURL})`;
}