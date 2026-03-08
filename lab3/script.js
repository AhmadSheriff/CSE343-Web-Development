// MODEL

class Task{
constructor(text){
this.text = text
this.completed = false
this.createdAt = Date.now()
}
}

class TaskManager{

constructor(){
this.tasks = []
this.load()
}

addTask(text){
const task = new Task(text)
this.tasks.push(task)
this.save()
}

deleteTask(index){
this.tasks.splice(index,1)
this.save()
}

toggleTask(index){
this.tasks[index].completed = !this.tasks[index].completed
this.save()
}

editTask(index,newText){
this.tasks[index].text = newText
this.save()
}

sortAlphabetically(){
this.tasks.sort((a,b)=>a.text.localeCompare(b.text))
}

sortByTime(){
this.tasks.sort((a,b)=>a.createdAt-b.createdAt)
}

save(){
localStorage.setItem("tasks",JSON.stringify(this.tasks))
}

load(){
const data = localStorage.getItem("tasks")

if(data){
this.tasks = JSON.parse(data)
}
}

}

// CONTROLLER + VIEW

const manager = new TaskManager()

let currentFilter = "all"

const taskList = document.getElementById("taskList")
const input = document.getElementById("taskInput")

document.getElementById("addBtn").onclick = addTask

function addTask(){

const text = input.value.trim()

if(text==="") return

manager.addTask(text)

input.value=""

render()

}

function render(){

taskList.innerHTML=""

let tasks = manager.tasks

if(currentFilter==="completed"){
tasks = tasks.filter(t=>t.completed)
}

if(currentFilter==="incomplete"){
tasks = tasks.filter(t=>!t.completed)
}

tasks.forEach((task,index)=>{

const li = document.createElement("li")

const textDiv = document.createElement("div")

textDiv.className="task-text"

if(task.completed){
textDiv.classList.add("completed")
}

textDiv.innerHTML = `
${task.text}
<div class="timestamp">
${new Date(task.createdAt).toLocaleString()}
</div>
`

textDiv.onclick=()=>{

manager.toggleTask(index)
render()

}

const icons = document.createElement("div")
icons.className="icons"

const edit = document.createElement("span")
edit.className="edit"
edit.innerHTML="✏️"

edit.onclick=(e)=>{
e.stopPropagation()

const newText = prompt("Edit task",task.text)

if(newText){
manager.editTask(index,newText)
render()
}

}

const del = document.createElement("span")
del.className="delete"
del.innerHTML="🗑"

del.onclick=(e)=>{

e.stopPropagation()

li.classList.add("removing")

setTimeout(()=>{
manager.deleteTask(index)
render()
},300)

}

icons.appendChild(edit)
icons.appendChild(del)

li.appendChild(textDiv)
li.appendChild(icons)

taskList.appendChild(li)

})

}

// FILTERS

document.querySelectorAll("[data-filter]").forEach(btn=>{

btn.onclick=()=>{

currentFilter = btn.dataset.filter

render()

}

})

// SORTING

document.getElementById("sortAlpha").onclick=()=>{

manager.sortAlphabetically()
render()

}

document.getElementById("sortTime").onclick=()=>{

manager.sortByTime()
render()

}

// INITIAL LOAD

render()