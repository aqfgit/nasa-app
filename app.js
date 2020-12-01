
fetch(`https://images-api.nasa.gov/search?q=europa
&media_type=image
`)
    .then(data => data.json())
    .then(data => {
        const items = data.collection.items;
        console.log(items)
        items.forEach(item => {
            const href = item.links[0].href;
            const desc = item.data[0].description;
            const imgElement = document.createElement('img');
            const paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = desc;
            imgElement.src = href;
            document.body.appendChild(imgElement);
            document.body.appendChild(paragraphElement);
        })
    })





