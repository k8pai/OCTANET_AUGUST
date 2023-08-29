const taskInput = document.getElementById('task');
const priorityInput = document.getElementById('priority');
const deadlineInput = document.getElementById('deadline');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');

// Store tasks in an array
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tasks = [...storedTasks];

addTaskButton.addEventListener('click', () => {
	const taskText = taskInput.value;
	const priority = priorityInput.value;
	const deadline = deadlineInput.value;

	if (taskText.trim() === '') {
		alert('Task name cannot be empty');
		return;
	}

	const task = {
		text: taskText,
		priority: priority,
		deadline: deadline,
	};

	tasks.push(task);

	// Sort tasks based on priority
	tasks.sort((a, b) => {
		const priorityOrder = { high: 3, medium: 2, low: 1 };
		return priorityOrder[b.priority] - priorityOrder[a.priority];
	});

	// Store tasks in localStorage
	localStorage.setItem('tasks', JSON.stringify(tasks));

	// Clear current list
	tasksList.innerHTML = '';

	// Add tasks to the list
	tasks.forEach((task, ind) => {
		const taskElement = document.createElement('li');
		taskElement.className = 'task';
		taskElement.innerHTML = `
		<label class="details" for="task${ind}">
			<div class="details">
				<input type="checkbox" class="checkbox" name="task${ind}" id="task${ind}" ${
			task.completed ? 'checked' : ''
		}>
				<span class="text ${task.completed ? 'completed' : ''}">${task.text}</span>
			</div>
			<div class="meta">
				<span>${task.priority}</span>
				<span>${task.deadline}</span>
			</div>
			<div class="actions">
				<button class="delete">Delete</button>
			</div>
		</label>
        `;

		const deleteButton = taskElement.querySelector('.delete');
		deleteButton.addEventListener('click', () => {
			const index = tasks.indexOf(task);
			tasks.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			tasksList.removeChild(taskElement);
		});

		const checkbox = taskElement.querySelector('.checkbox');
		checkbox.addEventListener('change', () => {
			task.completed = checkbox.checked;
			taskText.classList.toggle('completed', task.completed);
			updateTasksInLocalStorage();
		});
		tasksList.appendChild(taskElement);
	});

	// Clear input fields
	taskInput.value = '';
	priorityInput.value = 'high';
	deadlineInput.value = '';
});

// Add tasks to the list
tasks.forEach((task, ind) => {
	const taskElement = document.createElement('li');
	taskElement.className = 'task';
	taskElement.innerHTML = `
		<label class="details" for="task${ind}">
			<div class="details">
				<input type="checkbox" class="checkbox" name="task${ind}" id="task${ind}" ${
		task.completed ? 'checked' : ''
	}>
				<span class="text ${task.completed ? 'completed' : ''}">${task.text}</span>
			</div>
			<div class="meta">
				<span>${task.priority}</span>
				<span>${task.deadline}</span>
			</div>
			<div class="actions">
				<button class="delete">Delete</button>
			</div>
		</label>
        `;

	const deleteButton = taskElement.querySelector('.delete');
	deleteButton.addEventListener('click', () => {
		const index = tasks.indexOf(task);
		tasks.splice(index, 1);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		tasksList.removeChild(taskElement);
	});

	tasksList.appendChild(taskElement);
});
