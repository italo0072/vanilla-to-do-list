import './style.css';
import { LocalStorageTaskRepository } from './repositories/LocalStorageTaskRepository.js';
import { TaskService } from './services/TaskService.js';
import { TaskListView } from './ui/TaskListView.js';
import { FilterView } from './ui/FilterView.js';
import { StatsView } from './ui/StatsView.js';
import { TaskFormView } from './ui/TaskFormView.js';
import { TaskController } from './controllers/TaskController.js';

/*
 * Punto de arranque: aquí creamos y conectamos las instancias
 * (inyeccion de dependencias). El resto de la aplicación solo usa
 * las abstracciones.
 */
function bootstrap() {
  const repository = new LocalStorageTaskRepository();
  const taskService = new TaskService(repository);

  const taskListView = new TaskListView(document.getElementById('taskList'), {
    onToggle: (id) => controller.handleToggleTask(id),
    onDelete: (id) => controller.handleDeleteTask(id),
  });

  const statsView = new StatsView(document.getElementById('stats'));

  const controller = new TaskController({
    taskService,
    taskListView,
    statsView,
  });

  // FilterView y TaskFormView solo necesitan registrar sus listeners al
  // instanciarse; no se consultan directamente desde el composition root.
  new FilterView(document.querySelectorAll('.filter-btn'), (filter) =>
    controller.handleFilterChange(filter)
  );

  new TaskFormView(document.getElementById('taskInput'), document.getElementById('addBtn'), (text) =>
    controller.handleAddTask(text)
  );

  controller.init();
}

window.addEventListener('DOMContentLoaded', bootstrap);
