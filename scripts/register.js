//capturando os elementos do HTML
const $form = document.getElementById('form');
const $nome = document.getElementById('nome');
const $sobrenome = document.getElementById('sobrenome');
const $email = document.getElementById('email');
const $senha = document.getElementById('senha');
const $confirm = document.getElementById('confirmSenha');

const $itens = document.querySelectorAll('.formiten')

//variaveis para validação geral
var validName = false;
var validLastName = false;
var validEmail = false;
var validSenha = false;


//============ evento para validação
$form.addEventListener('submit', function formSubmit(e) {

    //=========funções para validação
    checkName();
    checkLastName();
    checkEmail();
    checkSenha();
    cadastrar();

    function checkName() {

        if ($nome.value === '' || $nome.value == null) {
            e.preventDefault()
            validName = false;

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[0].classList.add("error")
        }

        else {
            validName = true;
            $itens[0].classList.remove("error")
            $itens[0].classList.add("success")
        }
    }

    function checkLastName() {

        if ($sobrenome.value === '' || $sobrenome.value == null) {
            e.preventDefault()
            validLastName = false;

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[1].classList.add("error")
        }

        else {
            validLastName = true;
            $itens[1].classList.remove("error")
            $itens[1].classList.add("success")
        }
    }

    function checkEmail() {

        if ($email.value === '' || $email.value == null) {
            e.preventDefault()


            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[2].classList.add("error")
        }

        else if (!isEmail($email.value)) {
            e.preventDefault()

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[2].classList.add("error")
        }

        else {
            validEmail = true;
            $itens[2].classList.remove("error")
            $itens[2].classList.add("success")
        }

        function isEmail(email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
    }

    function checkSenha() {

        if ($senha.value === '' || $senha.value == null) {
            e.preventDefault()


            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")

        }

        else if ($senha.value.length < 8) {
            e.preventDefault()

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")
        }

        else if ($senha.value.length > 15) {
            e.preventDefault();

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")
        }

        else if (!/[A-Z]/.test($senha.value)) {
            e.preventDefault()

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")
        }

        else if (!/[0-9]/.test($senha.value)) {
            e.preventDefault()

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")
        }

        else if (!/[^A-Za-z0-9]/.test($senha.value)) {
            e.preventDefault()

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")
        }

        else {
            console.log('tudo OK')
            $itens[3].classList.remove("error")
            $itens[3].classList.add("success")
        }

        if ($senha.value != $confirm.value || $confirm.value === '' || $confirm.value == null) {
            e.preventDefault();

            //============= parte visual para o usuario identificar em qual campo ele errou =============
            $itens[3].classList.add("error")
            $itens[4].classList.add("error")
        }

        else {
            validSenha = true;
            $itens[3].classList.remove("error")
            $itens[4].classList.remove("error")
            $itens[4].classList.add("success")
            $itens[3].classList.add("success")
        }

    }

});

function cadastrar() {

    if (validName && validLastName && validEmail && validSenha) {
        fetch('https://ctd-todo-api.herokuapp.com/v1/users', {
            method: 'POST',
            headers: {
                'Accept': '*/*, text/plain, application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify({
                "firstName": `${$nome.value}`,
                "lastName": `${$sobrenome.value}`,
                "email": `${$email.value}`,
                "password": `${$senha.value}`
            })
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('token', JSON.stringify(data));
            window.location.href = 'tarefas.html';

            console.log(data);
        }).catch((error) => {
            // console.log(error);
        })
    }
    else {
        console.log('alguma coisa não deu certo');
    }

}