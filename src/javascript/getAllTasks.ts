import { IGetAllTask } from '../interface/taskInterface';

const userField = document.querySelector("#user-name")
const userImage = document.querySelector("#user-image")
const taskName = document.querySelector("#task-name")
const taskCheckbox = document.querySelector("#task-checkbox")
const taskContainer = document.querySelector("#task-container")

async function fetchData() {
  try {
    const response = await fetch('http://127.0.0.1:3000/tasks');
    const data: IGetAllTask = await response.json();
    console.log(data.data[0].user)
    
    data.data.map((e) => {
        if (taskName != null) {
            taskName.textContent = e.user;
        }
    });
    
  } catch (error) {
    // Manipule erros de requisição aqui
  }
}

fetchData();
