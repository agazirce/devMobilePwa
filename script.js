// TODO : exploiter fav lors de l'affichage, supprimer des fav si nouvel appui, envoi d'un message lors de la synchro
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
        if (image.fav === "true"){
            button.classList.add('btn', 'btn-success');
            button.textContent = 'favori';
        } else {
            button.classList.add('btn', 'btn-primary');
            button.textContent = 'mettre en favori';
        }
        button.addEventListener('click', function (){
            if (button.textContent == 'favori'){
                button.classList.remove('btn-success')
                button.classList.add('btn-primary')
                button.textContent = 'mettre en favori';
                image.fav = "";
            } else {
                button.classList.remove('btn-primary')
                button.classList.add('btn-success')
                button.textContent = 'favori';
                image.fav = "true";
            }

            if (navigator.onLine) {
                let options = {
                    method:'POST',
                    body: JSON.stringify([{
                        img: image.src
                    }])
                };
                fetch('http://localhost:3000/favoris', options)
                    .then((response) => response.json())
                    .then((favoris) => {
                        localforage.getItem("data")
                            .then(items => {
                                items.forEach(item => {
                                    JSON.parse(favoris).forEach(favori => {
                                        if (item.src === favori.img){
                                            item.fav = 'true';
                                        } else {
                                            item.fav = '';
                                        }
                                    });
                                });
                                localforage.setItem("data", items);
                            });
                    })
                    .catch(function (error) {
                        console.error("une erreur s'est produite");
                        console.log(error);
                    });
            } else {
                localforage.getItem("data")
                    .then(items => {
                        items.forEach(item => {
                            if (item.src === image.src){
                                item.fav = 'true';
                            } else {
                                item.fav = '';
                            }
                        });
                        localforage.setItem("data", items);
                    });
            }
        });
        card_body.appendChild(title);
        card_body.appendChild(button);
        card.appendChild(img);
        card.appendChild(card_body);
        col.appendChild(card);
        row.appendChild(col);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (navigator.onLine) {
        document.getElementById('header').setAttribute("hidden", "");
    }

    window.addEventListener("online", () => {
        document.getElementById('header').setAttribute("hidden", "");
        let fetchdata = [];
        fetch('http://localhost:3000/favoris').then((response) => response.json())
            .then((favoris) => {
                localforage.getItem("data")
                    .then((items) => {
                        items.forEach(item => {
                            if (favoris == '') {
                                if (item.fav != '') {
                                    fetchdata.push({img: item.src});
                                }
                            } else {
                                JSON.parse(favoris).forEach(favori => {
                                    console.log('testwhat' + item.src + favori.img);
                                    if (item.src === favori.img) {
                                        if (item.fav == '') {
                                            fetchdata.push({img: item.src});
                                        }
                                    } else if (item.src !== favori.img) {
                                        if (item.fav != '') {
                                            fetchdata.push({img: item.src});
                                        }
                                    }
                                });
                            }
                        });
                        let options = {
                            method:'POST',
                            body: JSON.stringify(fetchdata)
                        };
                        fetch('http://localhost:3000/favoris', options)
                            .then((response) => {
                                document.getElementById('synch').removeAttribute("hidden");
                                setTimeout(function(){
                                    document.getElementById('synch').setAttribute("hidden", "");
                                }, 5000)
                            });
                    });
            })
    });
    window.addEventListener("offline", () => {
        document.getElementById('header').removeAttribute("hidden");
    });

    let fetchData;
    if (navigator.onLine) {
        fetchData = fetch("http://localhost:8080/GalerieRepos/galerie.json")
            .then((response) => response.json())
            .then((data) => localforage.setItem("data", data))
            .catch(function (error) {
                console.error("une erreur s'est produite");
                console.log(error);
            });
    }
    else {
        fetchData = localforage.getItem("data");
    }

    fetchData.then((json) => afficher(json));
});