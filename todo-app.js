$(function () {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let $todoList = $("#todo-list");
  let currentCategory = "all";

  function renderTodos(filter) {
    $todoList.empty();
    todos
      .filter(function (todo) {
        return filter === "all" || todo.status === filter;
      })
      .forEach(function (todo, index) {
        $todoList.append(
          `<li class="list-group-item d-flex justify-content-between align-items-center">
              ${todo.text}
              <span>
                <button class="btn btn-secondary btn-sm mx-1 move-up"><i class="fas fa-arrow-up"></i></button>
                <button class="btn btn-secondary btn-sm mx-1 move-down"><i class="fas fa-arrow-down"></i></button>
                <button class="btn btn-${
                  todo.status === "active" ? "success" : "outline-success"
                } btn-sm mx-1 status-btn" data-status="active"><i class="fas fa-play"></i></button>
                <button class="btn btn-${
                  todo.status === "inactive" ? "warning" : "outline-warning"
                } btn-sm status-btn" data-status="inactive"><i class="fas fa-pause"></i></button>
                <button class="btn btn-${
                  todo.status === "done" ? "danger" : "outline-danger"
                } btn-sm status-btn" data-status="done"><i class="fas fa-check"></i></button>
                <button class="btn btn-danger btn-sm remove"><i class="fas fa-times"></i></button>
              </span>
            </li>`
        );
      });
    updateCounters();
  }

  function updateCounters() {
    let activeCount = todos.filter((todo) => todo.status === "active").length;
    let inactiveCount = todos.filter(
      (todo) => todo.status === "inactive"
    ).length;
    let doneCount = todos.filter((todo) => todo.status === "done").length;
    let allCount = todos.length;

    $("#active-count").text(activeCount);
    $("#inactive-count").text(inactiveCount);
    $("#done-count").text(doneCount);
    $("#all-count").text(allCount);
  }

  $todoList.on("click", ".status-btn", function () {
    let index = $(this).closest("li").index();
    let newStatus = $(this).data("status");
    todos[index].status = newStatus;
    saveTodos();
    renderTodos(currentCategory);
  });

  $(".category-btn").on("click", function () {
    $(".category-btn").removeClass("active");
    $(this).addClass("active");
    currentCategory = $(this).data("filter");
    renderTodos(currentCategory);
  });

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  renderTodos(currentCategory);
});
