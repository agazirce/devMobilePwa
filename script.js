window.onload = function () {

    fetch(`https://github.com/agazirce/GalerieRepos/blob/main/galerie.json`).then(function (result) {
        console.warn(`Données récupérées !`);
        result.json()
            .then(function (images) {
                console.warn(`Données Jsonizées !`);
                console.log(images);
                if (images != []){
                    let contenant = document.createElement('div');
                    contenant.classList.add('container-fluid', 'bg-white');
                    let row = document.createElement('div');
                    row.classList.add('row');
                    contenant.appendChild(row);
                    document.body.appendChild(contenant);
                    create_row(images, row);
                }
            });
    }).catch(function (error) {
        console.error(`Une erreur s'est produite.`);
        console.log(error);
    });




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
