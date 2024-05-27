document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        addTask()
    }
})

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
    }
}


/*
Vou explicar passo a passo o que cada parte do código faz:

const taskInput = document.getElementById('task-input');: Aqui, estamos obtendo o elemento HTML com o ID 'task-input', que é provavelmente um campo de entrada de texto onde o usuário pode digitar uma nova tarefa.

const taskText = taskInput.value.trim();: Este trecho pega o valor inserido no campo de entrada, usando taskInput.value, e trim() é utilizado para remover espaços em branco extras no início e no fim do texto.

if (taskText === '') return;: Verifica se o texto da tarefa está vazio. Se estiver vazio, a função retorna, pois não faz sentido adicionar uma tarefa vazia.

const task = { text: taskText, completed: false };: Aqui, estamos criando um objeto JavaScript chamado task, que representa uma tarefa. O texto da tarefa é armazenado na propriedade text, e completed é uma propriedade que indica se a tarefa foi concluída ou não. Inicialmente, definimos completed como false, indicando que a tarefa não está concluída.

renderTask(task);: Esta linha chama uma função chamada renderTask() passando a tarefa como argumento. Essa função é responsável por adicionar visualmente a tarefa à interface do usuário.

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];: Aqui, estamos recuperando os dados de tarefas salvos anteriormente no armazenamento local do navegador. Se não houver tarefas salvas, um array vazio é utilizado como valor padrão.

tasks.push(task);: Adicionamos a nova tarefa ao array tasks que acabamos de recuperar ou criar.

localStorage.setItem('tasks', JSON.stringify(tasks));: Finalmente, atualizamos os dados de tarefas no armazenamento local. Antes de salvar, convertemos o array tasks em uma string JSON usando JSON.stringify() para que possa ser armazenado no localStorage.

taskInput.value = '';: Por fim, limpamos o campo de entrada, definindo seu valor como vazio, para que o usuário possa adicionar uma nova tarefa facilmente.


*/
function addTask() {
    const taskInput = document.getElementById('task-input')
    const taskText = taskInput.value.trim();
    if (taskText === '') return

    const task = {text: taskText, completed: false};
    renderTask(task);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))

    taskInput.value = '';
} 

/*
Obtendo a referência à lista de tarefas:

javascript
Copiar código
const taskList = document.getElementById('task-list');
Essa linha obtém a referência ao elemento HTML que possui o id "task-list", que provavelmente é uma lista <ul> onde as tarefas serão exibidas.

Criando um novo item de lista (<li>) para a tarefa:

javascript
Copiar código
const li = document.createElement('li');
li.className = 'task' + (task.completed ? ' completed' : '');
Aqui, um novo elemento de lista (<li>) é criado. Dependendo se a tarefa está completa ou não, uma classe completed é adicionada ao elemento para aplicar um estilo específico.

Criando um elemento de texto (<span>) para exibir o conteúdo da tarefa:

javascript
Copiar código
const span = document.createElement('span');
span.textContent = task.text;
span.addEventListener('click', () => toggleComplete(task, li));
Um elemento de texto (<span>) é criado para exibir o texto da tarefa. Um event listener é adicionado para escutar cliques no texto da tarefa. Quando o texto da tarefa é clicado, a função toggleComplete(task, li) é chamada para marcar a tarefa como completa ou incompleta.

Criando um botão de remoção (<button>) para remover a tarefa:

javascript
Copiar código
const removeBtn = document.createElement('button');
removeBtn.textContent = '✖';
removeBtn.addEventListener('click', () => removeTask(task, li));
Um botão de remoção (<button>) é criado com um texto "✖". Um event listener é adicionado para escutar cliques no botão. Quando o botão é clicado, a função removeTask(task, li) é chamada para remover a tarefa da lista.

Anexando o texto da tarefa e o botão de remoção ao item da lista (<li>) e adicionando-o à lista de tarefas:

javascript
Copiar código
li.appendChild(span);
li.appendChild(removeBtn);
taskList.appendChild(li);
O texto da tarefa e o botão de remoção são anexados ao elemento de lista (<li>), e então o elemento de lista é adicionado à lista de tarefas na interface do usuário.

Essa função renderTask(task) é usada para adicionar uma única tarefa à lista de tarefas na interface do usuário. Ela cria dinamicamente os elementos HTML necessários para representar uma tarefa na página e os adiciona à lista de tarefas.
*/
function renderTask(taskData) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.className = 'task' + (taskData.completed ? ' completed' : '');

    const span = document.createElement('span');
    span.textContent = taskData.text;
    span.addEventListener('click', () => toggleComplete(taskData, li));

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.addEventListener('click', () => removeTask(taskData, li));

    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
}


/*
Essa função toggleComplete(task, li) é responsável por alternar o estado de conclusão de uma tarefa e atualizar essa informação no armazenamento local do navegador. Vou explicar passo a passo o que cada parte do código faz:

Alternar o estado de conclusão da tarefa:

javascript
Copiar código
task.completed = !task.completed;
Esta linha altera o estado de conclusão da tarefa. Se task.completed for true, ele se tornará false, e vice-versa.

Alternar a classe CSS "completed" no elemento <li>:

javascript
Copiar código
li.classList.toggle('completed');
Esta linha adiciona a classe CSS "completed" ao elemento <li> se a tarefa estiver concluída, e a remove se a tarefa não estiver concluída. Isso permite que o estilo da tarefa na interface do usuário seja atualizado para refletir seu estado de conclusão.

Atualizar o armazenamento local das tarefas:

javascript
Copiar código
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskIndex = tasks.findIndex(t => t.text === task.text);
tasks[taskIndex] = task;
localStorage.setItem('tasks', JSON.stringify(tasks));
Essas linhas recuperam a lista de tarefas armazenadas no localStorage do navegador. Se não houver nenhuma tarefa armazenada, uma lista vazia é criada. Em seguida, encontra-se o índice da tarefa atual na lista de tarefas. A tarefa atualizada é então substituída na lista de tarefas pelo índice encontrado. Por fim, a lista de tarefas atualizada é armazenada de volta no localStorage, substituindo a versão anterior.

Portanto, essa função não só atualiza visualmente o estado de conclusão da tarefa na interface do usuário, mas também mantém a lista de tarefas atualizada no armazenamento local do navegador para que as alterações persistam entre as sessões.
*/
function toggleComplete(task, li) {
    task.completed = !task.completed

    li.classList.toggle('completed')

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(t => t.text === task.text);
    tasks[taskIndex] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

/*
Essa função `removeTask(task, li)` é responsável por remover uma tarefa da interface do usuário e do armazenamento local do navegador. Vou explicar cada parte do código:

1. **Remover o elemento da lista (`<li>`) da interface do usuário:**
   ```javascript
   li.remove();
   ```
   Esta linha remove o elemento `<li>` da interface do usuário, ou seja, a tarefa é removida da lista de tarefas exibida na página.

2. **Atualizar o armazenamento local das tarefas:**
   ```javascript
   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   tasks = tasks.filter(t => t.text !== task.text);
   localStorage.setItem('tasks', JSON.stringify(tasks));
   ```
   Primeiro, esta função recupera a lista de tarefas armazenadas no localStorage do navegador. Se não houver nenhuma tarefa armazenada, uma lista vazia é criada. Em seguida, a função `filter` é usada para criar uma nova lista de tarefas que exclui a tarefa que está sendo removida. Essa nova lista de tarefas é então armazenada de volta no localStorage, substituindo a versão anterior.

Portanto, essa função não só remove visualmente a tarefa da interface do usuário, mas também atualiza a lista de tarefas no armazenamento local do navegador para refletir essa alteração, garantindo que a remoção da tarefa seja persistente entre as sessões.
*/
function removeTask(task, li) {
    li.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
