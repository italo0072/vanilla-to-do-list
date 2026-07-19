/*
 * captura la entrada del usuario para crear una tarea, mediante el botón
 * o la tecla Enter
 */
export class TaskFormView {
  #input;
  #submitButton;
  #onSubmit;

  constructor(input, submitButton, onSubmit) {
    this.#input = input;
    this.#submitButton = submitButton;
    this.#onSubmit = onSubmit;

    this.#submitButton.addEventListener('click', () => this.#handleSubmit());
    this.#input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.#handleSubmit();
      }
    });
  }

  #handleSubmit() {
    this.#onSubmit(this.#input.value);
    this.#input.value = '';
  }
}
