import { IGetAllTask, ITaskField } from "../interface/taskInterface";

export const baseURL = 'http://127.0.0.1:3000' as const;

export const taskApi = {
  deleteTask: (id: number) => {
    fetch(`${baseURL}/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
            console.log('Tarefa excluida com sucesso!');
          } else {
            console.log('Ocorreu um erro ao atualizar o campo "finished".');
          }
      })
      .catch(error => {
        console.error(error)
      });
  },

  patchTaskEnd: (id: number, finishedValue: boolean) => {
    fetch(`${baseURL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finished: finishedValue }),
      })
        .then(response => {
          if (response.ok) {
            console.log('Campo "finished" atualizado com sucesso!');
          } else {
            console.log('Ocorreu um erro ao atualizar o campo "finished".');
          }
        })
        .catch(error => {
          console.log('Ocorreu um erro na requisição:', error);
        });      
  },
  updateTask: (id: number, dataToUpdate: ITaskField) => {
    fetch(`${baseURL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      })
        .then(response => {
          if (response.ok) {
            console.log('Tarefa atualizado com sucesso!');
          } else {
            console.log('Ocorreu um erro ao atualizar a tarefa.');
          }
        })
        .catch(error => {
          console.log('Ocorreu um erro na requisição:', error);
        });      
  },
  getAllTasks: async () => {
    try {
      const response = await fetch(`${baseURL}/tasks`);
      const { data }: IGetAllTask = await response.json();
      return data
    } catch (error) {
      console.log("Ocorreu um erro na requisição", error)
   }
  },
  createTask: async (dataToCreate: ITaskField) => {
    try {  
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToCreate)
      });
  
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
  }
}

