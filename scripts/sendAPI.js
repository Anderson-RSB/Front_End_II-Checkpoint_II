const $name = document.getElementById('nome');
const $lastname = document.getElementById('sobrenome');
const $inpemail = document.getElementById('email');
const $inpsenha = document.getElementById('senha');
const $form = document.getElementById('form');





function fetchAPI() {
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/', {

        method: 'POST',
        headers: {
            'Accept': '*/*, application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstName": `${$name.value}`,
            "lastName": `${$lastname.value}`,
            "email": `${$inpemail.value}`,
            "password": `${$inpsenha.value}`
        })

    })
        .then((response) => response.json())
        .then(data => console.log(data))
}



