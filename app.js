const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');

const trimSentenceTo100Words = function trimSentenceTo100Words(sentence) {
    const words = sentence.split(" ");
    const reducedWords = [];
    for (let i = 0; i < 100; i++) {
        reducedWords.push(words[i])
    }

    return reducedWords.join(" ") + "...";
}


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
            const title = item.data[0].title;
            const newItem = document.createElement('div');
            newItem.classList.add('results__item');
            newItem.style.backgroundImage = `url(${href})`;
            newItem.dataset.desc = desc;
            newItem.dataset.href = href;
            newItem.dataset.title = title;
            newItem.src = href;
            resultsContainer.appendChild(newItem);
        })

        const imageItems = document.querySelectorAll('.results__item');
        const imageItemsArray = Array.from(imageItems);

        imageItemsArray.forEach(item => {
            item.addEventListener('click', event => {
                const title = event.target.dataset.title;
                const description = (event.target.dataset.desc.split(" ").length > 100) ? trimSentenceTo100Words(event.target.dataset.desc) : event.target.dataset.desc;
                const href = event.target.dataset.href;

                const popupElement = document.createElement('article');
                popupElement.classList.add('popup');
                const popupElementImage = document.createElement('img');
                popupElementImage.classList.add('popup__image');
                popupElementImage.src = href;
                const popupElementTitle = document.createElement('h2');
                popupElementTitle.classList.add('popup__title');
                popupElementTitle.innerHTML = title;
                const popupElementDescription = document.createElement('p');
                popupElementDescription.classList.add('popup__description');
                popupElementDescription.innerHTML = description;
                const popupElementTextWrapper = document.createElement('div');
                popupElementTextWrapper.classList.add('popup__text-wrapper');
               
                popupElementTextWrapper.appendChild(popupElementTitle);
                popupElementTextWrapper.appendChild(popupElementDescription);

                popupElement.appendChild(popupElementImage);
                popupElement.appendChild(popupElementTextWrapper);
                
                document.body.appendChild(popupElement);

            })
        })
    })
})








