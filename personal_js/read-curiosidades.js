const db = firebase.database();
const refPosts = db.ref('posts');


refPosts.orderByKey().on('value', snapshot => {

    var posts = snapshot.val();
    var keys = Object.keys(posts);

    var pegandoElements = '';

    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var title = posts[k].title;
        var author = posts[k].author;
        var description = posts[k].description;
        var image = posts[k].image_url;
        var updated = posts[k].updated;
        var date = posts[k].date;
        var createdOrUpdated = 'Criado em : ';
        if (updated) {
            createdOrUpdated = 'Atualizado em : ';
        }
        pegandoElements += '<div class="col-12 col-md-4 mx-auto mb-5"><div class="card my-3 shadow"><img class="card-img-top" src="' + image + '"><div class="card-body"><h5 class="card-title">' + title + '</h5><h6 class="text-muted card-substitle mb-2">' + author + '</h6><p class="card-text">' + description + '</p><p class="text-right text-muted mt-5 ml-auto">' + createdOrUpdated + date + '</p></div></div></div>';
    }
    var testandoLer = document.getElementById('cards-curiosities');
    testandoLer.innerHTML = pegandoElements;
});
