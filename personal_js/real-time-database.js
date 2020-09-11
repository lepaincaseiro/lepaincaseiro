const db = firebase.database();
const storage = firebase.storage();
const rootRef = db.ref('posts');
const storageRef = storage.ref('posts_images');
var auth = firebase.auth();

var postsList = document.getElementById('postsList');
var author = document.getElementById('author');
var title = document.getElementById('title');
var sinopse = document.getElementById('sinopse');
var description = document.getElementById('description');
var image = document.getElementById('image');
var updateSinopse = document.getElementById('updateSinopse');
var updateDescription = document.getElementById('updateDescription');
const addButton = document.getElementById('addButton');
const updateButton = document.getElementById('updateButton');
const deleteButton = document.getElementById('deleteButton');

var image_url = "";

console.log(image_url);


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


    // Upload image on Storage
    var uploadTask = storageRef.child(title.value).put(image.files[0]);

    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    },
        function (error) {
            window.alert('Erro ao mandar imagem para nuvem !');
            console.log(error);
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                // Add a JSON file on Realtime Database
                const autoId = rootRef.push().key
                rootRef.child(autoId).set({

                    author: author.value,
                    title: title.value,
                    sinopse: sinopse.value,
                    description: description.value,
                    image_url: downloadURL,
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

                console.log('File available at', downloadURL);
            });
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


