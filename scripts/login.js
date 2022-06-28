const $inpEmail = document.getElementById('inputEmail');
const $inpSenha = document.getElementById('inputPassword');
const $formLogin = document.getElementById('form2')
const $btnAccess = document.getElementById('btnLogin');

// function loginAPI() {

//     console.log("entrou no evento")

//     fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
//         method: 'POST',
//         headers: {
//             'Accept': '*/* , application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             {
//                 email: `${$inpEmail.value}`,
//                 password: `${$inpSenha.value}`
//             }
//         )
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         localStorage.setItem("token2", JSON.stringify(data));
//         window.location.href = 'tarefas.html';

//         console.log(data);
//     });
// }

// $btnAccess.addEventListener('onclick', () => {

//     console.log("entrou no evento")

//     fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
//         method: 'POST',
//         headers: {
//             'Accept': '*/* , application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//             {
//                 email: `${$inpEmail.value}`,
//                 password: `${$inpSenha.value}`
//             }
//         )
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         localStorage.setItem("token2", JSON.stringify(data));
//         window.location.href = 'tarefas.html';

//         console.log(data);
//     });

// });

$formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    function fetchAPI() {
        fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
          method: 'POST',
          headers: {
            'Accept': '*/* , application/json, text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": `${$inpEmail.value}`,
            "password": `${$inpSenha.value}`
          })
        })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("token", data.jwt);
            window.location.href = 'tarefas.html';
        });
      }
      
    fetchAPI();
});




//     console.log("entrou no evento")



//     function loginAPI() {
//         fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
//         fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
            //     method: 'POST',
//                 method: 'POST',
//                 headers: {
//                 headers: {
    //                 'Accept': '*/* , application/json, text/plain',
//                     'Accept': '*/* , application/json',
//                     'Content-Type': 'application/json'
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                 body: JSON.stringify({
    //                 "email": `${$inpEmail.value}`,
//                     email: `${$inpEmail.value}`,
//                     "password": `${$inpSenha.value}`
//                     password: `${$inpSenha.value}`
//                 })
//             })
//             .then((res) => res.json())
//             .then((response) => response.json())
    //         .then((data) => {
//             .then((data) => {
        //         localStorage.setItem("token2", JSON.stringify(data));
//                 localStorage.setItem("token2", JSON.stringify(data));
    //             window.location.href = 'tarefas.html';
//                 window.location.href = 'tarefas.html';

//                 console.log(data);
//             });
//     }

//     loginAPI();

// });