var auth = firebase.auth();

const btnLogout = document.getElementById('logoutButton');
const btnConfig = document.getElementById('configButton');

btnLogout.addEventListener('click', (teste) => {

    teste.preventDefault();

    auth.signOut()
        .then(() => {
            window.alert('Logout efetuado com sucesso !');
        })
        .catch(error => {
            window.alert('Erro inesperado !');
            console.error(error);
        });

});

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        btnLogout.classList.remove('hide');
        btnConfig.classList.remove('hide');

    } else {
        btnLogout.classList.add('hide');
        btnConfig.classList.add('hide');
    }
});
