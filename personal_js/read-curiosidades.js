const db = firebase.database();
const refPosts = db.ref('posts');
const storage = firebase.storage();
const storageRef = storage.ref('posts');


refPosts.orderByKey().on('value', snapshot => {
    
    var posts = snapshot.val();
    var keys = Object.keys(posts);
    
    var pegandoElements='';
    
    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var title = posts[k].title;
        var sinopse = posts[k].sinopse;
        // var description = posts[k].description;
        var image = posts[k].image_url;
        console.log(image);
        var updated = posts[k].updated;
        // var date = posts[k].date;
        // var createdOrUpdated='Criado em : ';
        // if (updated) {
        //     createdOrUpdated= 'Atualizado em : ';
        // } 
        pegandoElements += '<div class="hoverzoom mx-auto my-3 my-md-auto"><img src="'+image+'" alt="Imagem para Hoverzoom" /><div class="retina"><p>'+sinopse+'</p><a href="#">Saiba mais</a></div></div>';
    }
    var testandoLer = document.getElementById('hoverzoons');
    testandoLer.innerHTML = pegandoElements;

});
