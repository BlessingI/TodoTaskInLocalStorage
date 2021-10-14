const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const taskUl = document.querySelector('ul.collection')
const clearUl = document.querySelector('.clear-tasks')
const fil = document.querySelector('#filter')


loadAllEventListeners()

function loadAllEventListeners(){
    //show Local storage in DOM
    document.addEventListener('DOMContentLoaded', getTasks)

    //Add newTask
    form.addEventListener('submit', addTask)

    //Delete tasks
    taskUl.addEventListener('click', taskDelete)

    //Clear all tasks
    clearUl.addEventListener('click', clearAllUl)

    //filter through tasks
    fil.addEventListener('keyup', filterthrough)
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        const li = document.createElement('li')
        li.className = 'collection-item'
    
        li.appendChild(document.createTextNode(task))
    
        //adding the fontawesome x 
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove " ></i>'
        li.appendChild(link)
    
        taskUl.appendChild(li)
    })
}

function addTask(e){
    if(taskInput.value === ''){
        alert('add task')
    }

    const li = document.createElement('li')
    li.className = 'collection-item'

    li.appendChild(document.createTextNode(taskInput.value))

    //adding the fontawesome x 
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove " ></i>'
    li.appendChild(link)

    taskUl.appendChild(li)

    //Store to Local Storage
    storeTaskInLocalStorage(taskInput.value)

    taskInput.value = ''


    e.preventDefault()
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function taskDelete(e){
    // console.log(e.target.parentElement)
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')) {
        e.target.parentElement.parentElement.remove()
        }
    }

    //Delete from Local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }


    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}



function clearAllUl() {
    //first way
    // taskUl.innerHTML = '';

    //second way
    while(taskUl.firstChild) {
        taskUl.removeChild(taskUl.firstChild)
    }
    //to clearTask from local storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear()
}


function filterthrough(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) !== -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })

}