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
  initList();
}

function addTodo() {
  let index = dataArr.length;
  if(todoInput.value === "") {
    return;
  }
  if(todoInput.value) {
    const value = {
      id: index,
      content: todoInput.value,
      isFin: false
    }
    dataArr.push(value);
    localStorage.setItem("todoList",JSON.stringify(dataArr));
  }
}

function initList() {
  let item = JSON.parse(localStorage.getItem("todoList"));
  todoList.innerHTML = "";
  for(let index = 0; index < item.length; ++index) {
    var todoItem = document.createElement("li");
    todoItem.innerHTML = `
    <input type="checkbox" name="check-item" ${item[index].isFin ? 'checked' : ""} onclick = changeState(${item[index].id}) /><span>${item[index].content}</span>
  `
  todoList.appendChild(todoItem);
  }
}

function showContent(status) {
  if(todoInput.value === "") {
    return;
  }
  todoList.innerHTML = "";
  let item = JSON.parse(localStorage.getItem("todoList"));
  if(status === 'active') {
    showActive()
  } else if(status === 'complete') {
    showComplete();
  } else {
    initList();
  }
  // for(let index = 0; index < item.length; ++index) {
  //   if(item[index].status === status) {
  //     var todoItem = document.createElement("li");
  //     todoItem.innerHTML = `
  //     <input type="checkbox" name="check-item" /><span>${item[index].content}</span>
  //   `
  //   todoList.appendChild(todoItem);
  //   }
  // }
}

function showActive() {
  let item = JSON.parse(localStorage.getItem("todoList"));
  todoList.innerHTML = "";
  for(let index = 0; index < item.length; ++index) {
    if(!item[index].isFin) {
      var todoItem = document.createElement("li");
      todoItem.innerHTML = `
      <input type="checkbox" name="check-item" onclick = changeState(${item[index].id}) /><span>${item[index].content}</span>
    `
    todoList.appendChild(todoItem);
    }
  }
}

function showComplete() {
  let item = JSON.parse(localStorage.getItem("todoList"));
  todoList.innerHTML = "";
  for(let index = 0; index < item.length; ++index) {
    if(item[index].isFin) {
      var todoItem = document.createElement("li");
      todoItem.innerHTML = `
      <input type="checkbox" name="check-item" ${item[index].isFin ? 'checked' : ""} onclick = changeState(${item[index].id}) /><span>${item[index].content}</span>
    `
    todoList.appendChild(todoItem);
    }
  }
}

function addItemAndShow() {
  addTodo();
  showContent();
}

function changeState(index) {
  let dataArr = JSON.parse(localStorage.getItem("todoList"));
  let item = 0;
  while(index !== dataArr[item].id) {
      item++;
  }
  dataArr[item].isFin = !dataArr[item].isFin;
  localStorage.setItem("todoList", JSON.stringify(dataArr));
}

statusButton.addEventListener("click", event => {
  let target = event.target;
  let item = JSON.parse(localStorage.getItem("todoList"));
  switch (target.name) {
    case "check-item":
      changeState(target);
      break;
    case "all-btn":
      initList();
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