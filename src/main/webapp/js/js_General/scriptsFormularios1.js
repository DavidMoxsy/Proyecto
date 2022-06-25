const $btnSignIn = document.querySelector('.btn_Registrarse'),
        $btnSignUp = document.querySelector('.btn_iniciar_Sesion'),
        $signUp = document.querySelector('.sign-up'),
        $signIn = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignUp || e.target === $btnSignIn) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    }
});

function openModal() {
    const openModal = document.querySelector('.boton-portada');
    const modal = document.querySelector('.modal');

    modal.classList.add('modal--show');
}

function openModalCrear() {
    const openModal = document.querySelector('.boton-portada');
    const modal = document.querySelector('.modalCrear');

    modal.classList.add('modal--show');
}

function closeModal() {
    const modal = document.querySelector('.modal');
    const cerrarModal = document.querySelector('.cerrar_Modal');

    modal.classList.remove('modal--show');
}

function closeModalCrear() {
    const modal = document.querySelector('.modalCrear');
    const cerrarModal = document.querySelector('.cerrar_Modal');

    modal.classList.remove('modal--show');
}

