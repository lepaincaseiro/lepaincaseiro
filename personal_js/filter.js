var auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        btnLogout.classList.remove('hide');

    } else {
        btnLogout.classList.add('hide');
        window.location.href = "./index.html";
    }
});