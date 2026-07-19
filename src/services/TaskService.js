import { Task } from '../models/Task.js';

export const TaskFilter = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
});

/*
 * Logica de tareas: crear, filtrar, cambiar estado y calcular estadisticas
 * esta capa no manipula el DOM ni decide cómo se muestran las cosas
 * usa un repositorio para leer/guardar tareas
 */
export class TaskService {
  #repository;
  #tasks;
  #nextId;

  constructor(repository) {
    this.#repository = repository;
    this.#tasks = this.#repository.load();
    this.#nextId = this.#calculateNextId();
  }

  #calculateNextId() {
    if (this.#tasks.length === 0) {
      return 1;
    }
    return Math.max(...this.#tasks.map((task) => task.id)) + 1;
  }

  #persist() {
    this.#repository.save(this.#tasks);
  }

  getAll() {
    return [...this.#tasks];
  }

  getFiltered(filter) {
    switch (filter) {
      case TaskFilter.ACTIVE:
        return this.#tasks.filter((task) => !task.completed);
      case TaskFilter.COMPLETED:
        return this.#tasks.filter((task) => task.completed);
      case TaskFilter.ALL:
      default:
        return this.getAll();
    }
  }

  add(text) {
    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      throw new Error('Por favor escribe una tarea');
    }

    const task = new Task(this.#nextId, trimmedText);
    this.#nextId += 1;
    this.#tasks.push(task);
    this.#persist();

    return task;
  }

  toggle(id) {
    const task = this.#tasks.find((currentTask) => currentTask.id === id);

    if (!task) {
      throw new Error(`No existe una tarea con id ${id}`);
    }

    task.toggle();
    this.#persist();
  }

  delete(id) {
    this.#tasks = this.#tasks.filter((task) => task.id !== id);
    this.#persist();
  }

  getStats() {
    const total = this.#tasks.length;
    const completed = this.#tasks.filter((task) => task.completed).length;

    return {
      total,
      completed,
      active: total - completed,
    };
  }
}
