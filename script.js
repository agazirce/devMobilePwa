window.onload = function () {
    let images = [{"src" : "https://cdn.pixabay.com/photo/2020/02/15/22/55/couple-4852225__340.jpg",
                    "title" : "couple âgé"},
                    {"src" : "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954__340.jpg",
                    "title" : "oiseau"},
                    {"src" : "https://cdn.pixabay.com/photo/2020/05/16/10/04/crocodile-5176851__340.jpg",
                    "title" : "oeil de croco"},
                    {"src" : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
                    "title" : "coucher de soleil"},
                    {"src" : "https://cdn.pixabay.com/photo/2016/01/08/11/57/butterfly-1127666__340.jpg",
                    "title" : "papillon"}];

    if (images != []){
        let contenant = document.createElement('div');
        contenant.classList.add('container-fluid', 'bg-white');
        document.body.appendChild(contenant);
        create_row(images, contenant);
    }


    function create_row(liste, contenant) {
        let i = 0;
        let row;

        for (let image of liste) {
            if (i ==0 ){
                row = document.createElement('div');
                row.classList.add('row');
            }

            if (++i == 3){
                i = 0;
            }

            let col = document.createElement('div');
            col.classList.add('col', 'm-2');

            let card = document.createElement('div');
            card.classList.add('card');
            // card.style.height = '30rem'

            let img = document.createElement('img');
            img.src = image.src;
            img.classList.add('card-img-top');
            img.style.height = '20rem';

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
            contenant.appendChild(row);
        }
    }
}
