export const baseURL = 'http://127.0.0.1:3000' as const;

export const taskApi = {
    deleteTask: (id: number) => {
    fetch(`${baseURL}/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
            console.log('Tarefa excluida com sucesso!');
            location.reload();
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
}

