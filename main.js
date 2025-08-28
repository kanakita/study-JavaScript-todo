// inputを取得する
const input = document.getElementById("input");

// formを取得する
const form = document.getElementById("form");

const ul = document.getElementById("ul");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  add();
});

// ローカルストレージからデータを取り出す
// JSON.parseすることで文字列形式から元の配列として扱うことができる
const todos = JSON.parse(localStorage.getItem("todos"));
// console.log(todos);

// もしtodosが空でなければ処理を実行
if (todos) {
  todos.forEach(todo => {
    add(todo);
  });
}

function add(todo) {

  // 入力内容を取得する
  let todoText = input.value;

  // todoがある場合はtodoTextにテキストを入れる
  if (todo) {
    todoText = todo;
  }

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

  //データをJSON形式に変換
  // localStorageは文字列形式で保存するため、文字列形式であるJSON形式で保存する必要がある
  localStorage.setItem("todos", JSON.stringify(todos));
}
