const modalAuthForms = document.getElementById('authenticationModal')
const formDiv = document.getElementById('formBox')
const messages = document.querySelectorAll('.message')
const pageMessage = document.querySelector('.pageMessage')

function messagesCloser() {
    messages.forEach((element) => {
        element.style.display = 'none'
    })
}

function pageMessageCloser() {
    pageMessage.style.display = 'none'
}

function registerSetter() {
    const registerButtons = document.querySelectorAll('.register')

    registerButtons.forEach((element) => {
        element.addEventListener('click', (event) => {
            if (modalAuthForms.style.display != 'flex') {
                modalAuthForms.style.display = 'flex'
            }

            if (document.body.style.overflowY != 'hidden') {
                document.body.style.overflowY = 'hidden'
            }

            formDiv.innerHTML = `<h1>Cadastre-se</h1>
                                <form action="/register" method="post">
                                    <label for="name">Nome completo:</label>
                                    <input type="text" name="name" placeholder="Digite seu nome" required>
                                    <label for="email">Endereço de Email:</label>
                                    <input type="email" name="email" placeholder="Digite seu endereço de e-mail" required>
                                    <label for="password">Senha</label>
                                    <input type="password" name="password" placeholder="Digite sua senha" required>
                                    <label for="passwordConfirm">Confirmação de senha:</label>
                                    <input type="password" name="passwordConfirm" placeholder="Confirme sua senha" required>
                                    <input type="submit" value="Avançar">
                                </form>
                                <p>Já tem uma conta? <span class="alterModal login">Entre agora!</span></p>`

            loginSetter()
            messagesCloser()
        })
    })
}

function loginSetter() {
    const loginButtons = document.querySelectorAll('.login')

    loginButtons.forEach((element) => {
        element.addEventListener('click', (event) => {
            console.log('event');
            if (modalAuthForms.style.display != 'flex') {
                modalAuthForms.style.display = 'flex'
            }

            if (document.body.style.overflowY != 'hidden') {
                document.body.style.overflowY = 'hidden'
            }

            formDiv.innerHTML = `<h1>Entre agora</h1>
                                <form action="/login" method="post">
                                    <label for="email">Endereço de Email:</label>
                                    <input type="email" name="email" placeholder="Digite seu endereço de e-mail" required>
                                    <label for="password">Senha</label>
                                    <input type="password" name="password" placeholder="Digite sua senha" required>
                                    <input type="submit" value="Avançar">
                                </form>
                                <button class="forgotPassBtn">Esqueceu a senha?</button>
                                <p>Não tem uma conta? <span class="alterModal register">Cadastre-se!</span></p>`

            registerSetter()
            messagesCloser()
        })
    })
}

modalAuthForms.addEventListener('click', (event) => {
    if (event.target == modalAuthForms) {
        modalAuthForms.style.display = 'none'
        document.body.style.overflowY = 'scroll'
        messagesCloser()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if (modalAuthForms.style.display != '') {
        document.body.style.overflowY = 'hidden'

        pageMessageCloser()
    }
})

registerSetter()
loginSetter()