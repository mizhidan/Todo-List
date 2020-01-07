var todoList = document.getElementsByClassName("task")[0];
var todoInput = document.getElementById("todo");
var addButton = document.getElementById("add-todo");
var statusButton = document.getElementsByClassName("status-btn-list")[0];
var dataArr = JSON.parse(localStorage.getItem("todoList"));

function TodoList() {
  todoList.innerHTML = "";
  if (!localStorage.getItem("todoList")) {
    let dataArr = [];
    localStorage.setItem("todoList", JSON.stringify(dataArr));
  }
  showContent();
}

function addTodo() {
  let index = dataArr.length;
  if(todo.value) {
    const value = {
      id: index,
      content: todo.value,
    }
    dataArr.push(value);
    localStorage.setItem("todoList",JSON.stringify(dataArr));
  }
}


function showContent() {
  var todoItem = document.createElement("li");
  item = JSON.parse(localStorage.getItem("todoList"));
  for(let index = 0; index < item.length; ++index) {
    todoItem.innerHTML = `
    <input type="checkbox" name="check-item" /><span>${item[index].content}</span>
  `
  todoList.appendChild(todoItem);
  }

  
 
}

function addItemAndShow() {
  addTodo();
  showContent();
}

statusButton.addEventListener("click", event => {
  let target = event.target;
  switch (target.name) {
    case "all-btn":
      showContent("all");
      break;
    case "active-btn":
      showContent("active");
      break;
    case "complete-btn":
      showContent("complete");
      break;
    default:
      break;
  }
});

TodoList();