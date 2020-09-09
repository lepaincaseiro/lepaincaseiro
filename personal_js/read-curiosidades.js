const db = firebase.database();
const refPosts = db.ref('posts');

refPosts.orderByKey().on('value', snapshot => {

    var posts = snapshot.val();
    var keys = Object.keys(posts);

    var pegandoElements='';

    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        // var title = posts[k].title;
        var sinopse = posts[k].sinopse;
        // var description = posts[k].description;
        var photo = posts[k].photo;
        var updated = posts[k].updated;
        // var date = posts[k].date;
        // var createdOrUpdated='Criado em : ';
        // if (updated) {
        //     createdOrUpdated= 'Atualizado em : ';
        // } 
        pegandoElements += '<div class="hoverzoom mx-auto my-3 my-md-auto"><img src="'+photo+'" alt="Imagem para Hoverzoom" /><div class="retina"><p>'+sinopse+'</p><a href="#">Saiba mais</a></div></div>';
    }
    var testandoLer = document.getElementById('hoverzoons');
    testandoLer.innerHTML = pegandoElements;

});
