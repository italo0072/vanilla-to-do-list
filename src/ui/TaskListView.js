/*
 * Se encarga de mostrar la lista de tareas en el DOM Recibe las tareas
 * ya preparadas y avisa de las acciones del usuario mediante callbacks
 */
export class TaskListView {
  #container;
  #onToggle;
  #onDelete;

  constructor(container, { onToggle, onDelete }) {
    this.#container = container;
    this.#onToggle = onToggle;
    this.#onDelete = onDelete;
  }

  render(tasks) {
    this.#container.innerHTML = '';

    if (tasks.length === 0) {
      this.#container.appendChild(this.#createEmptyState());
      return;
    }

    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => fragment.appendChild(this.#createTaskElement(task)));
    this.#container.appendChild(fragment);
  }

  #createEmptyState() {
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No hay tareas para mostrar';
    return emptyState;
  }

  #createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = task.completed ? 'task-item completed' : 'task-item';

    const label = document.createElement('span');
    label.textContent = task.text;

    const buttons = this.#createTaskButtons(task);

    taskItem.append(label, buttons);
    return taskItem;
  }

  #createTaskButtons(task) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'task-buttons';

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn';
    completeButton.textContent = task.completed ? 'Reactivar' : 'Completar';
    completeButton.addEventListener('click', () => this.#onToggle(task.id));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => this.#onDelete(task.id));

    buttonsContainer.append(completeButton, deleteButton);
    return buttonsContainer;
  }
}
