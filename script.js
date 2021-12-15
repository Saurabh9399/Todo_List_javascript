
// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');



// add eventlistener to element

// after clicking on todo(add button) task should be added
todoButton.addEventListener('click', addToDo);

// after clicking on check btn task should be check or uncheck
// after clicking on delete btn task should be deleted 
todoList.addEventListener('click', deleteCheck); 

// after reloading window every task should be remain
document.addEventListener('DOMContentLoaded', getToDoItems);

// after clicking on clear btn all tasks should be clear from everywhere
document.querySelector('.clear-btn').addEventListener('click', clearLocalStorage)




// count number of tasks prensent in th list
var count = 0;

// functions
// Add todo to list
function addToDo(event){

    // prevent from form submitting
    event.preventDefault();

    // creating todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;

    // if task is empty then not add to the list
    if (newTodo.innerText == "") {
        alert('Please enter task todo');
        return;
    }

    // to count no of task (increase by 1)
    count = count + 1;
    document.getElementById('count').innerText = count + " ";   // update inner text of count

    todoDiv.appendChild(newTodo);   // append li to todo div

    // add todo to local storage
    saveToLocalStorage(todoInput.value);

    // completed button
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    todoDiv.appendChild(completeButton);   // append complete button to tododiv

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    todoDiv.appendChild(deleteButton);     // append delete button to tododiv

    // append tododiv to todolist
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = "";

}





// delete check functiom
function deleteCheck(event){

    event.preventDefault();
    const item = event.target;     // target item (anything on window)

    // delete perticular item
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;

        // delete this element from local storage also
        let todo_list = localStorage.getItem("todos");  // get localstorage list array eg. "[]"
        let lis = JSON.parse(todo_list);  // convert "[]" to [] and store in lis
        
        for(let i = 0; i < lis.length; i++){
            if(lis[i] == todo.innerText){
                lis.splice(i, 1);
                
                // save remaining elemets in lis to localstorage
                localStorage.setItem("todos", JSON.stringify(lis)); 
            }
        }

        // remove from front end
        todo.remove();

        // decreament count also if click on delete button
        if(count > 0){
            count = count - 1;
        }else{
            count = 0;
        }
        
        // update inner text count
        document.getElementById('count').innerText = count + " ";
    } 

    // check box
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");   // toggle class for check / uncheck
    }

}




// function save local todo
function saveToLocalStorage(todo){
    
    let todos;
    
    // if todos has no element
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); 

}




// function for getTodo Items
function getToDoItems(){

    let todos;

    // if todos has no element
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    todos.forEach(function (todos) {

        count += 1;
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // create li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todos;

        // if task is empty then not add to the list
        if(newTodo.innerText == ""){
            return;
        }

        todoDiv.appendChild(newTodo);

        // completed button
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        // completeButton.innerHTML = '<i class="fas fa-square"></i>';

        todoDiv.appendChild(completeButton);

        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        todoDiv.appendChild(deleteButton);

        // append this to todolist
        todoList.appendChild(todoDiv);
    });

    // update count also
    document.getElementById('count').innerText = count + " ";

}




// clear local storage
function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}




