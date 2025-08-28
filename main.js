// inputを取得する
const input = document.getElementById("input");

// formを取得する
const form = document.getElementById("form");

const ul = document.getElementById("ul");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  add();
});

function add() {

  // 入力内容を取得する
  let todoText = input.value;

  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    ul.appendChild(li);

    input.value = "";
    saveData();
  }
}

function saveData() {
  //liタグの全ての情報を配列で取得
  const lists = document.querySelectorAll("li");

  // 空の配列を用意
  const todos = [];

  // liタグすべての要素に対して処理を行う
  // lists.forEach(function(list) {
  //     todos.push(list.innerText);
  // });

  // functionではなくアロー関数にする
  lists.forEach(list => {
      todos.push(list.innerText);
  });
  // console.log(todos);
}
