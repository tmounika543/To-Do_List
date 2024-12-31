document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="complete-button">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            taskItem.querySelector('.complete-button').addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            taskItem.querySelector('.edit-button').addEventListener('click', () => {
                const newText = prompt('Edit your task', task.text);
                if (newText) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            taskItem.querySelector('.delete-button').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
        }
    });

    renderTasks();
});
