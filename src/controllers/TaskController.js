import { TaskFilter } from '../services/TaskService.js';

/*
 * controla la comunicación entre el servicio de tareas y las vistas
 * responde a las acciones del usuario, actualiza el estado y pide
 * re-render cuando hace falta
 */
export class TaskController {
  #taskService;
  #taskListView;
  #statsView;
  #currentFilter = TaskFilter.ALL;

  constructor({ taskService, taskListView, statsView }) {
    this.#taskService = taskService;
    this.#taskListView = taskListView;
    this.#statsView = statsView;
  }

  init() {
    this.#render();
  }

  handleAddTask(text) {
    try {
      this.#taskService.add(text);
      this.#render();
    } catch (error) {
      alert(error.message);
    }
  }

  handleToggleTask(id) {
    this.#taskService.toggle(id);
    this.#render();
  }

  handleDeleteTask(id) {
    this.#taskService.delete(id);
    this.#render();
  }

  handleFilterChange(filter) {
    this.#currentFilter = filter;
    this.#render();
  }

  #render() {
    const tasks = this.#taskService.getFiltered(this.#currentFilter);
    this.#taskListView.render(tasks);
    this.#statsView.render(this.#taskService.getStats());
  }
}
