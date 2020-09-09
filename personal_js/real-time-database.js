const db = firebase.database();
const rootRef = db.ref('posts');
var auth = firebase.auth();

var postsList = document.getElementById('postsList');
var title = document.getElementById('title');
var sinopse = document.getElementById('sinopse');
var description = document.getElementById('description');
var photo = document.getElementById('photo');
var updateSinopse = document.getElementById('updateSinopse');
var updateDescription = document.getElementById('updateDescription');
const addButton = document.getElementById('addButton');
const updateButton = document.getElementById('updateButton');
const deleteButton = document.getElementById('deleteButton');

console.log(title);

function completeDate() {

    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável
    var dia = data.getDate();           // 1-31
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();       // 4 dígitos


    // Formata a data e a hora (note o mês + 1)
    var completeDate = dia + '/' + (mes + 1) + '/' + ano4;

    return completeDate;
}

addButton.addEventListener('click', (teste) => {

    teste.preventDefault();

    const autoId = rootRef.push().key
    rootRef.child(autoId).set({

        title: title.value,
        sinopse: sinopse.value,
        description: description.value,
        photo: photo.value,
        date: completeDate(),
        updated: false
    })
        .then(() => {
            window.alert('Curiosidade adicionada com sucesso !');
        })
        .catch(error => {
            auth.onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    window.alert('Erro inesperado !');
                } else {
                    window.alert('Acesso não permitido !');
                }
            });
            console.error(error);
        });

});

updateButton.addEventListener('click', (teste) => {

    teste.preventDefault();

    const newData = {

        sinopse: updateSinopse.value,
        description: updateDescription.value,
        date: completeDate(),
        updated: true

    };

    rootRef.child(postsList.value).update(newData)
        .then(() => {
            window.alert('Curiosidade atualizada com sucesso !');
        })
        .catch(error => {
            auth.onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    window.alert('Erro inesperado !');
                } else {
                    window.alert('Acesso não permitido !');
                }
            });
            console.error(error);
        });

});

deleteButton.addEventListener('click', (teste) => {

    teste.preventDefault();

    rootRef.child(postsList.value).remove()
        .then(() => {
            window.alert('Curiosidade removido com sucesso !');
        })
        .catch(error => {
            auth.onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    window.alert('Erro inesperado !');
                } else {
                    window.alert('Acesso não permitido !');
                }
            });
            console.error(error);
        });
});

rootRef.orderByKey().on('child_added', snapshot => {
    const option = document.createElement('option');
    option.innerText = snapshot.val().title;
    option.value = snapshot.key;
    postsList.appendChild(option);
})


