const UNSPLASH_KEY =
"Ob7-kATzJ8Ixsbmb2vysC0hylEFied28qtDMbLMwLrg";

let selectedImage = "";

async function searchUnsplash(){

    const query =
        document
        .getElementById("imageSearch")
        .value;

    if(!query){

        alert("Enter something to search.");

        return;

    }

    const response =
        await fetch(

`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&client_id=${UNSPLASH_KEY}`

        );

    const data =
        await response.json();

    const results =
        document.getElementById("imageResults");

    results.innerHTML = "";

    data.results.forEach(photo=>{

        const img =
            document.createElement("img");

        img.src =
            photo.urls.small;

        img.onclick = ()=>{

            selectedImage =
                photo.urls.regular;

            alert("✅ Image Selected");

        };

        results.appendChild(img);

    });

}