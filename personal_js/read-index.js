const db = firebase.database();
const refPosts = db.ref('posts');


refPosts.orderByKey().on('value', snapshot => {
    
    var posts = snapshot.val();
    var keys = Object.keys(posts);
    
    var pegandoElements='';
    
    for (let i = 0; i < keys.length; i++) {
        var k = keys[i];
        var sinopse = posts[k].sinopse;
        var image = posts[k].image_url;
        pegandoElements += '<div class="hoverzoom mx-auto my-3 my-md-auto"><img src="'+image+'" alt="Imagem para Hoverzoom" /><div class="retina"><p>'+sinopse+'</p><a href="./curiosidades.html">Saiba mais</a></div></div>';
    }
    var testandoLer = document.getElementById('hoverzoons');
    testandoLer.innerHTML = pegandoElements;

});
