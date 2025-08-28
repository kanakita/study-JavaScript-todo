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
const todos = JSON.parse(localStorage.getItem("todosArray"));

// もしtodosArrayが空でなければ処理を実行
if (todos) {
  todos.forEach(todo => {
    add(todo);
    // console.log(todo);
  });
}

function add(todo) {

  // 入力内容を取得する
  let todoText = input.value;

  // 完了状況の変数
  let isCompleted = false;

  // todoがある場合はtodoTextとisCompletedに値を入れる
  if (todo) {
    todoText = todo.text;
    isCompleted = todo.completed;
  }

  // console.log(todoText);

  if (todoText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = todoText;
    li.appendChild(span);
    li.classList.add("list-group-item","d-flex", "align-items-center", "gap-3");

    ul.appendChild(li);

    // 削除ボタンを用意する
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.setAttribute("style", "margin-left: auto");
    deleteButton.innerText = "削除";
    li.appendChild(deleteButton);

    // 削除ボタンが押された時の処理
    deleteButton.addEventListener("click", function(event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    // 完了のチェックボックスを用意する
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "complete";
    checkbox.checked = isCompleted;
    if (isCompleted) {
      li.classList.add("bg-info");
    }
    li.prepend(checkbox);

    checkbox.addEventListener("click", function(event) {
      console.log('完了！');
      li.classList.toggle("bg-info");
      isCompleted = !isCompleted;
      saveData();
    });

    input.value = "";
    saveData();
  }
}

function saveData() {
  //li spanタグの全ての情報を配列で取得
  const lists = document.querySelectorAll("li span");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  // 空の配列を用意
  const todos = [];

  lists.forEach((list, index) => {
      // 空のオブジェクトを用意
      const todoItem = {};

      todoItem["text"] = list.innerText;
      // 対応するcheckboxをindexで取得する
      todoItem["completed"] = checkboxes[index].checked;
      todos.push(todoItem);
  });

  //データをJSON形式に変換
  // localStorageは文字列形式で保存するため、文字列形式であるJSON形式で保存する必要がある
  localStorage.setItem("todosArray", JSON.stringify(todos));
}
