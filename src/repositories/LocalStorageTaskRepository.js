import { TaskRepository } from './TaskRepository.js';
import { Task } from '../models/Task.js';

const STORAGE_KEY = 'tasks';

/* implementación de TaskRepository que guarda las tareas en
 * el localStorage del navegador
 */
export class LocalStorageTaskRepository extends TaskRepository {
  load() {
    const rawTasks = localStorage.getItem(STORAGE_KEY);

    if (!rawTasks) {
      return [];
    }

    try {
      const parsedTasks = JSON.parse(rawTasks);
      return parsedTasks.map(Task.fromJSON);
    } catch (error) {
      console.error('No se pudieron leer las tareas guardadas:', error);
      return [];
    }
  }

  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}
