document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
            saveTasksToLocalStorage();
        }
    });

    taskList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('edit-button')) {
            const span = target.previousElementSibling;
            const newText = prompt('Edit task:', span.textContent);
            if (newText !== null) {
                span.textContent = newText;
                saveTasksToLocalStorage();
            }
        } else if (target.classList.contains('delete-button')) {
            const li = target.parentElement;
            taskList.removeChild(li);
            saveTasksToLocalStorage();
        }
    });

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll('li span');
        taskElements.forEach((task) => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((taskText) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    loadTasksFromLocalStorage();
});
