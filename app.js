window.onload = function () {
  //Defining UI Vars
  const form = document.querySelector("#task-form");
  const taskList = document.querySelector(".collection");
  const clearBtn = document.querySelector(".clear-tasks");
  const filter = document.querySelector("#filter");
  const taskInput = document.querySelector("#task");

  // Loading all event listeners

  loadEventListeners();

  function loadEventListeners() {
    //DOM load event
    getTasks();

    //add tasks event
    form.addEventListener("submit", addTask);

    //remove task event
    taskList.addEventListener("click", removeTask);

    //Clear all tasks event
    clearBtn.addEventListener("click", clearTasks);

    //Filter task event

    filter.addEventListener("keyup", filterTasks);
  }

  //Get tasks from LS
  function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));

      //Create new link element

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";

      //Add icon html

      link.innerHTML = "<i>&#10006;</i>";

      link.style = "cursor:pointer";

      //Append the link to li
      li.appendChild(link);

      //Append li to ul
      taskList.appendChild(li);
    });
  }

  //Add Task
  function addTask(e) {
    if (taskInput.value === "") {
      alert("Add a task");
      return;
    }

    //Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    //Add icon html

    link.innerHTML = '<i class="fas fa-trash-alt"></i>';

    link.style = "cursor:pointer";

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //save to localstorage
    saveToLocalStorage(taskInput.value);

    //clear input

    taskInput.value = "";

    e.preventDefault();
  }

  // Store task to localstorage
  function saveToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove Tasks
  function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are you sure"))
        e.target.parentElement.parentElement.remove();
      removeTaskFromLS(e.target.parentElement.parentElement);
    }

    //Remove task from LS
  }

  function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function clearTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
      //taskList.innerHTML = "";
      //optimized
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
      localStorage.removeItem("tasks");
    }
  }

  function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach((task) => {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  }
};
