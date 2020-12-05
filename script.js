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

function create_row(liste, row) {
    let i = 0;
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

        let title = document.createElement('p');
        title.classList.add('card-text');
        title.textContent = image.title;

        let button = document.createElement('button');
        button.id = 'btn'+i;
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'mettre en favori';
        button.addEventListener('click', function (){
            if (button.textContent == 'favori'){
                button.classList.remove('btn-success')
                button.classList.add('btn-primary')
                button.textContent = 'mettre en favori';
            } else {
                button.classList.remove('btn-primary')
                button.classList.add('btn-success')
                button.textContent = 'favori';

                let fetchData;
                if (navigator.onLine) {
                    let options = {method:'POST',
                                    body: {img: image.src}}
                    fetchData = fetch('http://localhost:3000/favoris', options)
                        .then((favoris) => localforage.setItem("favoris", favoris));
                } else {
                    fetchData = localforage.getItem("favoris");
                }

                fetchData.then((json) => afficher(json));
            }
        });
        card_body.appendChild(title);
        card_body.appendChild(button);
        card.appendChild(img);
        card.appendChild(card_body);
        col.appendChild(card);
        row.appendChild(col);

        i++;
    }
}

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