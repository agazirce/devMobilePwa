/*window.onload = function () {
    if(navigator.onLine){
        document.getElementById('header').setAttribute('hidden', '');
        fetch(`https://cranky-mcnulty-e3f846.netlify.app/GalerieRepos/galerie.json`).then((result) => {
            console.info(`Données récupérées !`);
            result.json()
                .then((images) => {
                    localforage.setItem('images_search_result', images)
                    console.info(`Données Jsonizées !`);
                    afficher(images)
                });
        }).catch(function (error) {
            console.error(`Une erreur s'est produite.`);
            console.log(error);
        });
    } else {
        localforage.getItem('images_search_result').then((image) => {
        afficher(image);
        });
    }

    window.addEventListener('offline', ()=>{
        document.getElementById('header').removeAttribute('hidden');
    }) ;

    window.addEventListener('online', ()=>{
        document.getElementById('header').setAttribute('hidden', '');
    }) ;*/

    function afficher(images){
        if (images != []){
            let contenant = document.createElement('div');
            contenant.classList.add('container-fluid', 'bg-white');
            let row = document.createElement('div');
            row.classList.add('row');
            contenant.appendChild(row);
            document.body.appendChild(contenant);
            create_row(images, row);
        }
    }

    /*fetch(`https://cranky-mcnulty-e3f846.netlify.app/GalerieRepos/galerie.json`).then((result) => {
        console.info(`Données récupérées !`);
        result.json()
            .then((images) => {
                localforage.setItem('images_search_result', images)
                console.info(`Données Jsonizées !`);
                afficher(images)
            });
    }).catch(function (error) {
        console.error(`Une erreur s'est produite.`);
        console.log(error);
    });*/

    function create_row(liste, row) {
        for (let image of liste) {

            let col = document.createElement('div');
            col.classList.add('col-sm-12', 'col-md-6', 'col-lg-3', 'col-xl-2', 'm-2');

            let card = document.createElement('div');
            card.classList.add('card');

            let img = document.createElement('img');
            img.src = image.src;
            img.classList.add('card-img-top');
            img.setAttribute('alt', image.title);

            let card_body = document.createElement('div');
            card_body.classList.add('card-body');

            let title = document.createElement('p')
            title.classList.add('card-text');
            title.textContent = image.title;

            card_body.appendChild(title);
            card.appendChild(img);
            card.appendChild(card_body);
            col.appendChild(card);
            row.appendChild(col);
        }
    }
/*}*/
document.addEventListener("DOMContentLoaded", function () {
    if (navigator.onLine) {
        document.getElementById('header').setAttribute("hidden", "");
    }

    window.addEventListener("online", () => {
        document.getElementById('header').setAttribute("hidden", "");
    });
    window.addEventListener("offline", () => {
        document.getElementById('header').removeAttribute("hidden");
    });

    let fetchData;
    if (navigator.onLine) {
        fetchData = fetch("https://cranky-mcnulty-e3f846.netlify.app/GalerieRepos/galerie.json")
            .then((response) => response.json())
            .then((data) => localforage.setItem("data", data));
    }
    else {
        fetchData = localforage.getItem("data");
    }

    fetchData.then((json) => afficher(json));
});