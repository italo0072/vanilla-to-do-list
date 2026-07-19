/*
 * Muestra estadísticas simples del listado de tareas
 */
export class StatsView {
  #container;

  constructor(container) {
    this.#container = container;
  }

  render({ total, completed, active }) {
    this.#container.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }
}
