document.addEventListener("DOMContentLoaded", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let editId = null;

  const modal = document.getElementById("modal");
  const form = document.getElementById("form");

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("desc");
  const dateInput = document.getElementById("date");
  const priorityInput = document.getElementById("priority");

  const todoContainer = document.getElementById("to-do-cards");
  const inProgressContainer = document.getElementById("inprogress-cards");
  const completedContainer = document.getElementById("completed-cards");

  const formHeading = document.getElementById("form-heading");

  const filterSelect = document.getElementById("priorityFilter");
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", render);
  filterSelect.addEventListener("change", render);

  // open close
  document.getElementById("addBtn").onclick = () => {
    formHeading.innerText = "Create Task";
    modal.classList.remove("hidden");
  };

  // close
  document.getElementById("closeBtn").onclick = closeModal;
  function closeModal() {
    modal.classList.add("hidden");
    form.reset();
    editId = null;
  }

  // clear form
  document.getElementById("clearBtn").onclick = () => {
    form.reset();
  };
  //  save details 
  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //  create task card
  function createCard(task) {
    // document.getElementById("form-heading").innerText = "Create task";
    const div = document.createElement("div");
    div.className = "card";
    div.draggable = true;
    div.id = task.id;
    
    // creating the card
    div.innerHTML = `
      <div class="priority-div">
        <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
      </div>
      <p class="cad-heading"><b>${task.title}</b></p>
      <p class="card-description">${task.desc}</p>
    

      <div class="card-date-profile">
        <p>${task.date}</p>
        <div>
          <button onclick="editTask(${task.id})"><i class="fa-regular fa-pen-to-square fa-lg"></i></button>
          <button onclick="deleteTask(${task.id})"><i class="fa-regular fa-trash-can fa-lg"></i></button>
        </div>
      </div>
    `;
    div.ondragstart = drag;
    
    return div;
  }

  // render when page load
  function render() {
    todoContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    completedContainer.innerHTML = "";
    let todoCount = 0;
    let inprogressConut = 0;
    let completedConut = 0;
    const selectedFilter = filterSelect.value;
    const searchText = searchInput.value.toLowerCase();
    
    
    tasks.forEach((task) => {
      
      // filter priorty
      if (selectedFilter !== "all" && task.priority !== selectedFilter) {
        return;
      }
      //  search box
      if (!task.title.toLowerCase().includes(searchText)) {
        return;
      }
      const card = createCard(task);
      // count and append
      if (task.status === "todo") {
        todoCount++;
        todoContainer.appendChild(card);
      } else if (task.status === "inprogress") {
        inprogressConut++;
        inProgressContainer.appendChild(card);
      } else {
        completedConut++;
        completedContainer.appendChild(card);
      }
      
    });

    document.getElementById("todoCount").innerHTML = todoCount;
    document.getElementById("inprogressCount").innerHTML = inprogressConut;
    document.getElementById("completedCount").innerHTML = completedConut;
  }

  // form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const desc = descInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;
    
    if (editId) {
      const task = tasks.find((t) => t.id === editId);
      task.title = title;
      task.desc = desc;
      task.priority = priority;
    } else {
      tasks.push({
        id: Date.now(),
        title,
        desc,
        priority,
        status: "todo",
        date: date,
      });
    }
    
    save();
    render();
    closeModal();
  });

  //  delet the task
  window.deleteTask = (id) => {
    tasks = tasks.filter((t) => t.id !== id);
    save();
    render();
  };

  //  edit the task
  window.editTask = (id) => {
    const task = tasks.find((t) => t.id === id);

    document.getElementById("form-heading").innerText = "Edit Task";

    titleInput.value = task.title;
    descInput.value = task.desc;
    dateInput.value = task.date;
    priorityInput.value = task.priority;
    editId = id;
    modal.classList.remove("hidden");
    
  };
  // drag and drop
  window.drag = (e) => {
    e.dataTransfer.setData("id", e.target.id);
  };

  document.querySelectorAll(".to-do, .in-progress, .completed").forEach((col) => {
      col.ondragover = (e) => e.preventDefault();
      col.ondrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const task = tasks.find((t) => t.id == id);
        task.status = col.id;
        save();
        render();
      };
    });
    
  render();
});


// i have created the todo management system in these if i click on edit task then heading name is change to edit task and when click on create the task then heading change to create task but in js i get the problem when click after edit task then click add ask then i get the edit task heading i need to change that heading to add task
