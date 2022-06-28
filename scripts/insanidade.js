//capturando os elementos do HTML
const $form = document.getElementById('form');
const $nome = document.getElementById('nome');
const $sobrenome = document.getElementById('sobrenome');
const $email = document.getElementById('email');
const $senha = document.getElementById('senha');
const $confirm = document.getElementById('confirmSenha');

//variaveis para validação geral
var validName = false;
var validLastName = false;
var validEmail = false;
var validSenha = false;
// export var confirm2 = null;


//============ evento para validação
$form.addEventListener('submit', async function formSubmit(e) {

    //=========funções para validação
    checkName();
    checkLastName();
    checkEmail();
    checkSenha();
    
    function checkName () {
        
        if ($nome.value === '' || $nome.value == null){
            e.preventDefault()
            validName = false;

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao inseriu o nome')
        }

        else{
            console.log('inseriu o nome corretamente')
            validName = true;
        }
    }

    function checkLastName(){

        if($sobrenome.value === '' || $sobrenome.value == null){
            e.preventDefault()
            validLastName = false;

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao inseriu o sobrenome')
        }

        else{
            console.log('inseriu o sobrenome corretamente')
            validLastName = true;
        }
    }

    function checkEmail(){

        if($email.value === '' || $email.value == null){
            e.preventDefault()


//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao inseriu email')
        }

        else if(!isEmail($email.value)){
            e.preventDefault()

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao inseriu o email corretamente')
        }

        else {
            console.log('email inserido corretamente');
            validEmail = true;
        }

        function isEmail(email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
    }

    function checkSenha(){

        if($senha.value === '' || $senha.value == null){
            e.preventDefault()


//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao inseriu a senha')
        }

        else if($senha.value.length < 8){
            e.preventDefault()

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('inseriu a senha com menos de 8 digitos')
        }

        else if ($senha.value.length > 15 ){
            e.preventDefault();

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('inseriu senha maior que 15 digitos');
        }

        else if(!/[A-Z]/.test($senha.value)){
            e.preventDefault()

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('não colocou letra MAISCULA')
        }

        else if(!/[0-9]/.test($senha.value)){
            e.preventDefault()

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao colocou numeros')
        }

        else if(!/[^A-Za-z0-9]/.test($senha.value)){
            e.preventDefault()

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('nao colocou caracteres especiais')
        }

        else{
            console.log('tudo OK')
        }

        if($senha.value != $confirm.value || $confirm.value === '' || $confirm.value == null){
            e.preventDefault();

//============= parte visual para o usuario identificar em qual campo ele errou =============
            console.log('As senhas não são iguais')
        }

        else{
            console.log('senhas iguais, tudo certo')
            validSenha = true;    
        }

    }
    

    return validName, validLastName, validEmail, validSenha;
    
    
    
})


function cadastrar(){
   
    if( validName && validLastName && validEmail && validSenha){
        console.log('tudo ok para mandar para API')
        fetchAPI();
    }
    else{
        console.log('alguma coisa não deu certo')
    }
}


cadastrar();




