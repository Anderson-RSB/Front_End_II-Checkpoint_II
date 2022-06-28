const $logout = document.getElementById("closeApp");
const $formTasks = document.querySelector(".nova-tarefa");
const $inputTasks = document.getElementById("novaTarefa");
const $pendingTasks = document.querySelector(".tarefas-pendentes");
const $completedTasks = document.querySelector(".tarefas-terminadas");


if (
    localStorage.getItem("token") == null ||
    localStorage.getItem("token") == ""
) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "index.html";
};

$logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Deslogado com sucesso");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});


$formTasks.addEventListener("submit", (e) => {

    if ($inputTasks.value != null && $inputTasks.value.length > 5) {

        function newTask() {
            fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
                method: "POST",
                // mode: "cors",
                headers: {
                    //   "Access-Control-Allow-Origin": "*",
                    "Accept": "*/* , application/json, text/plain",
                    "Content-Type": "application/json",
                    "authorization": `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    description: `${$inputTasks.value}`,
                    completed: false,
                }),

            }).then((response) => {
                if (!response.ok) {
                    throw Error(response);
                } else {
                    response.json().then(data => console.log(data));
                }
            });

        }

        newTask();
        e.preventDefault();

    } else {
        alert("O campo precisa ser preenchido");
        e.preventDefault();
    }

});


function showTask() {

    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "GET",
        // mode: "cors",
        headers: {
            //   "Access-Control-Allow-Origin": "*",
            "Accept": "*/*, application/json, text/plain",
            "Content-Type": "application/json",
            "authorization": `${localStorage.getItem("token")}`,
        },

    }).then((response) => {
        if (!response.ok) {
            throw Error(response);
        } else {
            response.json().then((data) => {

                console.log(data);

                data.forEach(item => {

                    let $containerTask = document.createElement("div");

                    let $taskList = document.createElement("li");
                    $taskList.classList.add("tarefa");

                    let $btnCompleted = document.createElement("button");
                    $btnCompleted.setAttribute("type", "submit");
                    $btnCompleted.classList.add("not-done");
                    $btnCompleted.id = item.id;

                    let $containerDescription = document.createElement("div");
                    $containerDescription.classList.add("descricao");

                    let $dataName = document.createElement("p");
                    $dataName.classList.add("nome");
                    $dataName.innerHTML = item.description;

                    let $dataTime = document.createElement("p");
                    $dataTime.classList.add("timestamp");
                    $dataTime.innerHTML = `Criada em: ${dayjs(item.createAt).format("DD/MM/YY")}`;

                    let $btnUndo = document.createElement('button');
                    $btnUndo.setAttribute("type", "click");
                    $btnUndo.classList.add("btnUndo");
                    $btnUndo.innerHTML =
                        `
                            <i class="fa-solid fa-rotate-left"></i>
                        `
                    ;

                    let $btnDelete = document.createElement('button');
                    $btnDelete.setAttribute("type", "click");
                    $btnDelete.classList.add("btnDelete");
                    $btnDelete.innerHTML =
                        `
                            <i class="fa-solid fa-trash-can"></i>
                        `
                    ;

                    if (item.completed == false) {

                        $pendingTasks.insertAdjacentElement("beforeend", $containerTask);

                        $containerTask.appendChild($taskList);

                        $taskList.insertAdjacentElement("beforeend", $btnCompleted);

                        $taskList.insertAdjacentElement("beforeend", $containerDescription);

                        $containerDescription.insertAdjacentElement("beforeend", $dataName);

                        $containerDescription.insertAdjacentElement("beforeend", $dataTime);

                    } else {
                        $inputTasks.setAttribute("placeholder", "Parabéns, você completou todas as suas tarefas!");
                    }
                    
                    if (item.completed == true) {

                        $completedTasks.insertAdjacentElement("beforeend", $containerTask);

                        $containerTask.appendChild($taskList);

                        $taskList.insertAdjacentElement("beforeend", $btnCompleted);

                        $taskList.insertAdjacentElement("beforeend", $containerDescription);

                        $containerDescription.insertAdjacentElement("beforeend", $dataName);

                        $containerDescription.insertAdjacentElement("beforeend", $btnUndo);

                        $containerDescription.insertAdjacentElement("beforeend", $btnDelete);

                    }

                    $btnCompleted.addEventListener('click', (e) => {

                        function completedTask() {

                            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${item.id}`, {
                                method: "PUT",
                                //   mode: "cors",
                                headers: {
                                    // "Access-Control-Allow-Origin": "*",
                                    "Accept": "*/* , application/json, text/plain ",
                                    "Content-Type": "application/json",
                                    "authorization": `${localStorage.getItem("token")}`,
                                },
                                body: JSON.stringify({
                                    description: `${item.description}`,
                                    completed: true,
                                }),
                            })

                        }

                        completedTask();

                    });

                    $btnUndo.addEventListener('click', (e) => {

                        function undoTask() {

                            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${item.id}`, {
                                method: "PUT",
                                //   mode: "cors",
                                headers: {
                                    // "Access-Control-Allow-Origin": "*",
                                    "Accept": "*/* , application/json, text/plain ",
                                    "Content-Type": "application/json",
                                    "authorization": `${localStorage.getItem("token")}`,
                                },
                                body: JSON.stringify({
                                    description: `${item.description}`,
                                    completed: false,
                                }),
                            })
                        }

                        undoTask();

                    });

                    $btnDelete.addEventListener('click', (e) => {

                        function deleteTask() {

                            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${item.id}`, {
                                method: "DELETE",
                                //   mode: "cors",
                                headers: {
                                    // "Access-Control-Allow-Origin": "*",
                                    "Accept": "*/* , application/json, text/plain ",
                                    "Content-Type": "application/json",
                                    "authorization": `${localStorage.getItem("token")}`,
                                },
                            })
                        }

                        deleteTask();

                    });

                });
            })
        }
    });
};


showTask();