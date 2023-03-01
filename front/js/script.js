const itemsElement = document.querySelector("#items")

fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json()
    })

    .then(function(kanaps){
        console.log(kanaps)
        kanaps.forEach(kanap=> {
        itemsElement.innerHTML += 
        ` 
            <a href="./product.html?id=${kanap._id}">
                <article>
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                </article>
            </a>  
        `       
        });
    })

