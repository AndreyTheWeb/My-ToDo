const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');


let todoList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', addNewTask);
addMessage.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    addNewTask();
  }
});

function addNewTask() {

  const newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
    id: todoList.length
  };

  todoList.push(newTodo);
  console.log(todoList);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
}



function deleteElem(i) {
  console.log(i);
  todoList.splice(i, 1);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));

}

function displayMessages() {
  let displayMessage = '';
  todoList.forEach(function(item, i) {
    displayMessage += `
    <li>
      <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
      <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
      <button onclick='deleteElem(todoList[${i}])' class="deleteBtn" id='button_${i}'>Удалить</button>
    </li>
    `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function(e) {
  let idInput = e.target.getAttribute('id');
  // console.log(idInput);
  let forLabel = todo.querySelector('[for=' + idInput + ']');
  // console.log(forLabel);
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function(item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));

    }
  });
});

todo.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  todoList.forEach(function(item) {
    if (item.todo === e.target.innerHTML) {
      item.important = !item.important;
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});




// let delBtns = document.querySelectorAll('.deleteBtn');
// let arrDeleteBtns = Array.from(delBtns);

// todo.addEventListener('click', function(e) {
//   let idButton = e.target.getAttribute('id');
//   let delButton = document.querySelector(`#${idButton}`);

//   console.log(idButton);
//   console.log(delButton);

//   delButton.addEventListener('click', function(i) {
//     todoList.splice(i, 1);
//     localStorage.setItem('todo', JSON.stringify(todoList));
//     displayMessages();
//   });

// });

// todoList.forEach(function(item) {
//   if (item.todo === e.target.innerHTML) {

//     displayMessages();
//     localStorage.setItem('todo', JSON.stringify(todoList));
//   }
// });

/////////////////////////////
// const delBtns = todo.querySelectorAll('button');

// function delTask() {
//   delBtns.forEach(function(item, i) {
//     item.addEventListener('click', function() {
//       todoList.splice(i, 1);
//       localStorage.setItem('todo', JSON.stringify(todoList));
//       displayMessages();
//       if (localStorage.length == 0) {
//         todo.style.display = 'none';
//       }
//     });
//   });
// }

// delTask();

// delBtns.forEach(function(item, i) {

//   console.log(item);
//   // console.log(i);
//   if (typeof delBtns.item != 'undefined') {
//     item.addEventListener('click', delTask);
//   }

// });