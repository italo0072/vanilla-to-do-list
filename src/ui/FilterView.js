/*
 * Maneja la interacción con los botones de filtro: marca el activo y
 * notifica cuando cambia el filtro
 */
export class FilterView {
  #buttons;
  #onFilterChange;

  constructor(buttons, onFilterChange) {
    this.#buttons = Array.from(buttons);
    this.#onFilterChange = onFilterChange;

    this.#buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.setActive(filter);
        this.#onFilterChange(filter);
      });
    });
  }

  setActive(filter) {
    this.#buttons.forEach((button) => {
      const isActive = button.getAttribute('data-filter') === filter;
      button.classList.toggle('active', isActive);
    });
  }
}
