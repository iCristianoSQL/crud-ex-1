import { taskApi } from "../service/taskApi"
const taskModal: HTMLDialogElement = document.querySelector("#task-modal")!;
const taskTitle: HTMLInputElement = document.querySelector("#title-task")!;
const taskDescrition: HTMLTextAreaElement = document.querySelector("#description")!;
const closeModal: HTMLButtonElement = document.querySelector("#close-modal")!;
const buttonSubmit: HTMLButtonElement  = document.querySelector("#button-submit")!;

let idForUpdate = 0;
const userData = JSON.parse(localStorage.getItem('@userData') ?? '');

buttonSubmit.addEventListener("click", () => {
  console.log(idForUpdate);
  taskApi.updateTask(idForUpdate, {
    title: taskTitle.value,
    description: taskDescrition.value
  })
});

closeModal.addEventListener("click", () => {
  taskModal.close();
});

async function fetchData() {
  try {
    const response = await taskApi.getAllTasks();
    
    const taskList = document.querySelector(".flex.flex-col.gap-2");
    if (taskList) {
      response?.forEach((task) => {
        const li = document.createElement("li");
        li.classList.add("bg-black", "flex", "items-center", "p-2", "w-full", "h-16", "rounded-lg");
        li.style.justifyContent = "space-between"
        
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("relative", "w-[6.5rem]", "flex", "items-center", "justify-between");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("custom-checkbox", "absolute");
        checkbox.id = `task-checkbox-${task.id}`;
        checkbox.checked = task?.finished ?? false;
        checkbox.onclick = function() {
          taskApi.patchTaskEnd(task?.id ?? 0, !task?.finished);
        };

        const label = document.createElement("label");
        label.htmlFor = `task-checkbox-${task.id}`;

        const span = document.createElement("span");
        span.id = `task-name-${task.id}`;
        span.textContent = task.title ?? '';

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        taskDiv.appendChild(span);

        const userDiv = document.createElement("div");
        userDiv.classList.add("flex", "items-center", "gap-2");

        const img = document.createElement("img");
        img.src = task.photo || "https://placehold.it/50";
        img.alt = "Imagem de perfil";
        img.classList.add("profile-picture");
        img.id = `user-image-${task.id}`;

        const strong = document.createElement("strong");
        strong.id = `user-name-${task.id}`;
        strong.textContent = task.user ?? '';

        userDiv.appendChild(img);
        userDiv.appendChild(strong);

        const svgDiv = document.createElement("div");
        svgDiv.classList.add("flex", "items-center", "gap-1");

        const svgStar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgStar.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgStar.setAttribute("viewBox", "0 0 24 24");
        svgStar.setAttribute("fill", "yellow");
        svgStar.classList.add("w-6", "h-6", "cursor-pointer");
        svgStar.onclick = function() {
          taskModal.showModal();
          idForUpdate = task?.id ?? 0
        };

        const pathStar1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathStar1.setAttribute("d", "M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z");

        const pathStar2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathStar2.setAttribute("d", "M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z");

        svgStar.appendChild(pathStar1);
        svgStar.appendChild(pathStar2);

        const svgTrash = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgTrash.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgTrash.setAttribute("fill", "none");
        svgTrash.setAttribute("viewBox", "0 0 24 24");
        svgTrash.setAttribute("stroke-width", "1.5");
        svgTrash.setAttribute("stroke", "red");
        svgTrash.classList.add("w-6", "h-6", "cursor-pointer");
        svgTrash.onclick = function() {
          taskApi.deleteTask(task?.id ?? 0);
          li.style.display = "none";
        };

        const pathTrash = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathTrash.setAttribute("stroke-linecap", "round");
        pathTrash.setAttribute("stroke-linejoin", "round");
        pathTrash.setAttribute("d", "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z");

        svgTrash.appendChild(pathTrash);

        svgDiv.appendChild(svgStar);
        svgDiv.appendChild(svgTrash);

        li.appendChild(taskDiv);
        li.appendChild(userDiv);
        li.appendChild(svgDiv);

        taskList.appendChild(li);
      });
    }
  } catch (error) {
    console.log('Não foi possivel concluir sua solicitação no momento!');
  }
}

fetchData();


