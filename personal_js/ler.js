const db = firebase.database();
const refUsers = db.ref('users');

refUsers.orderByChild('date').on('value', snapshot => {

    var users = snapshot.val();
    var keys = Object.keys(users);

    var pegandoElements='';

    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var title = users[k].title;
        var author = users[k].author;
        var description = users[k].description;
        var updated = users[k].updated;
        var date = users[k].date;
        var createdOrUpdated='Criado em : ';
        if (updated) {
            createdOrUpdated= 'Atualizado em : ';
        } 
        pegandoElements += '<div class="col-md-5 card shadow my-5 mx-auto"><div class="card-body"><h5 id="cardTitle" class="card-title">' + title + '</h5><h6 id="cardAuthor" class="card-subtitle mb-2 text-muted">' + author + '</h6><p id="cardDescription" class="card-text">' + description + '</p><p id="cardCreatedOrUpdated" class="card-text text-success float-right">' + createdOrUpdated + date+ '</p></div ></div >';
    }
    var testandoLer = document.getElementById('testandoLer');
    testandoLer.innerHTML = pegandoElements;

});
