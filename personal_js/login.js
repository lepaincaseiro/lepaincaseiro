var auth = firebase.auth();

const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('pass');
const btnLogin = document.getElementById('loginButton');

btnLogin.addEventListener('click', (teste) => {

    teste.preventDefault();

    const email = txtEmail.value;
    const pass = txtPass.value;

    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            window.alert('Login efetuado com sucesso !');
            window.location.href = "./administrar.html";
        })
        .catch(error => {
            window.alert('Login ou Senha incorretos !');
            console.error(error);
        });

});

