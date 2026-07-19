/*
 * Interfaz para persistir tareas implementaciones pueden usar
 * localStorage o via API remota deben exponer los
 * métodos load y save
 */
export class TaskRepository {
  load() {
    throw new Error('load() debe ser implementado por la subclase');
  }

  save(tasks) {
    throw new Error('save() debe ser implementado por la subclase');
  }
}
