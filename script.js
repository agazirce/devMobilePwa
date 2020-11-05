window.onload = function () {
    let images = [{"src" : "images/photos/couple-4852225__340.jpg",
                    "title" : "couple âgé"},
                    {"src" : "images/photos/bird-1045954__340.jpg",
                    "title" : "oiseau"},
                    {"src" : "images/photos/crocodile-5176851__340.jpg",
                    "title" : "oeil de croco"},
                    {"src" : "images/photos/tree-736885__340.jpg",
                    "title" : "coucher de soleil"},
                    {"src" : "images/photos/butterfly-1127666__340.jpg",
                    "title" : "papillon"}];

    if (images != []){
        let contenant = document.createElement('div');
        contenant.classList.add('container-fluid', 'bg-white');
        let row = document.createElement('div');
        row.classList.add('row');
        contenant.appendChild(row);
        document.body.appendChild(contenant);
        create_row(images, row);
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
}
