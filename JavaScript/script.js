// Shift + Alt = v (seta pra baixo) você cria varias vezes
// Quando voce clica em alguma coisa ele te mostra quantos daquele tem, se aperta Ctrl + D pra selecionar eles 

// SEÇÃO DE ELEMENTOS
const todoForm = document.querySelector('#todo-form') 
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn') 

let oldInputValue

// FUNÇÕES 
const saveTodo = (text) => { //diz pro java que estou esperando um texto
    const todo = document.createElement("div") //essa variavel serve para guardar a criação da tag html aqui no js 
    todo.classList.add("todo") //qual a classe da div que vai ser guardada na variavel "todo"

    const todoTitle = document.createElement("h3") //essa variavel serve para guardar a criação dos elementos html aqui no js 
    todoTitle.innerText = text //vai inserir o texto que vem da função saveTodo que tem o paramentro de Text
    todo.appendChild(todoTitle) //vai inserir o texto que esta dentro da variavel todoTitle
    //console.log(todo) //para testar, vai mostrar no cosole a div com o texto dentro

    const div = document.createElement("section")
    todo.appendChild(div)

    const doneBtn = document.createElement("button") //cria a tag html dentro da variavel 
    doneBtn.classList.add("finish-todo") //diz qual é a classe do button 
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //adiciona o icone. tem que usar ASPAS SIMPLES
    div.appendChild(doneBtn) //adiciona a variavel doneBtn a variavel todo
    
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    div.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    div.appendChild(removeBtn)

    todoList.appendChild(todo) //colocou todo a variavel "todo" dentro da variavel "todoList"

    todoInput.value = "" // vai limpar o Input apos adicionar a tarefa
    todoInput.focus() //vai focar o cursor na caixa do input
}

const toggleForms = () => { // Arroy Function 
    editForm.classList.toggle("hide") // a função toggleForm vai mostrar o que esta econdido  
    todoForm.classList.toggle("hide") // e esconder o que está a mostra
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => { // Arroy Function   
    const todos = document.querySelectorAll(".todo") // a variavel "todos" vai receber das as tarefas com classe "todo"

    todos.forEach((todo) => { // vai chamar cada "todo" de "todo"
        let todoTitle = todo.querySelector("h3") //jogou o titulo do h3 pra dentro da variavel todoTitle 

        if(todoTitle.innerText === oldInputValue)//seleciona o elemento depois seleciona a propriedade que a gente quer 
        //aqui ele vai comparar se o titulo que estamos alterando é identico ao titulo já alterado
        todoTitle.innerText = text // se o valor for igual, ele vai enviar o mesmo texto que está no parametro 
    })
}


// Eventos
todoForm.addEventListener('submit', (e) => { //serve para testar eventos do <button type = "submit">
    e.preventDefault() //não deixa o formulario ser enviado para o back end.
    //console.log('Enviou form')  //para testar no console do navegador 

    const inputValue = todoInput.value //essa variavel quarda o valor do todo Input 
    
    if(inputValue) { // VALIDAÇÃO, para que o usuario não crie a tarefa sem titulo 
        //console.log(inputValue) //para testar se o valor do input está indo para o console 
        saveTodo(inputValue) //função que salva o valor do Input value
    }


})

document.addEventListener("click", (e) =>{
    const targetEl = e.target
    const parentEl = targetEl.closest("div") //a variavel targetEl vai receber a tag <div> mais proxima
    let todoTitle // let tem escopo de BLOCO 

    if (parentEl && parentEl.querySelector("h3")) { //se a variavel parentEl tiver uma tag <h3> dentro dela então...
        todoTitle = parentEl.querySelector("h3").innerText//a varivel todoTitle recebera o innerText que esta no h3 do parentEl 
    }

    if (targetEl.classList.contains("finish-todo")) { //verifica a div que esta dentro da variavel targetEl tem a classe de "finish-todo"
        parentEl.classList.toggle("done") // vai adicionar a classe "done" para a tag <div> mais proxima 
    } 

    if (targetEl.classList.contains("remove-todo")) { // verifica se a div que esta dentro tem a classe "remove-todo"
        parentEl.remove() //esse é um METODO para remover o que está dentro da variavel
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms() //vai esconder um formulario e mostrar outro 

        editInput.value = todoTitle // a caixa de texto do edit input vai receber o que esta escrito na variavel parentEl
        oldInputValue = todoTitle //vai identificar qual é a tarefa pra fazer a alteração, a tarefa alterada ficara-
        //armazenada dentro da variavel oldInputValue
    }
})

cancelEditBtn.addEventListener('click' , (e) => {
    e.preventDefault() //não deixa o formulario ser enviado para o back-end 
    toggleForms() //vai mostrar o que está oculto 
}) 

editForm.addEventListener("submit", (e) => {

    e.preventDefault()//vai impedir que o formulario seja enviado

    const editInputValue = editInput.value //pegar o valor digitado pelo usuario, e coloca dentro da variavel editInputValue

    if(editInputValue) {
        updateTodo(editInputValue) //vai mandar o valor do input
    }

    toggleForms()
})