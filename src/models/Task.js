/*
 * representa una tarea del listado
 * no tiene conocimientos sobre almacenamiento ni de la UI solo contiene
 * los datos y su comportamiento básico
 */
export class Task {
  constructor(id, text, completed = false, createdAt = new Date().toISOString()) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toggle() {
    this.completed = !this.completed;
  }

  /* Reconstruye una Task a partir de un objeto plano
   * (por ejemplo, datos de localStorage o de una API).
   */
  static fromJSON(data) {
    return new Task(data.id, data.text, data.completed, data.createdAt);
  }
}
