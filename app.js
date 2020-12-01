const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');

searchInput.addEventListener('keyup', (event) => {
    const phrase = event.target.value;
    fetch(`https://images-api.nasa.gov/search?q=${phrase}
    &media_type=image
    `)
    .then(data => data.json())
    .then(data => {
        resultsContainer.innerHTML = '';
        const items = data.collection.items;
        console.log(items)
        items.forEach(item => {
            const href = item.links[0].href;
            const desc = item.data[0].description;
            const newItem = document.createElement('article');
            newItem.classList.add('results__item');
            newItem.style.backgroundImage = `url(${href})`;
            //const paragraphElement = document.createElement('p');
            //paragraphElement.innerHTML = desc;
            newItem.src = href;
            resultsContainer.appendChild(newItem);
            //resultsContainer.appendChild(paragraphElement);
        })
    })
})








