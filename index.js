
// const customizeForm = document.querySelector('[id="conditionForm"]');
const testForm = document.querySelector('#citizenForm');

function applyLogicShow(e) {
  const affectedField = document.querySelector(`[name="nationalId"]`);
  const controllers = getControllers();  

  Array.from(controllers).forEach((field) =>
    field.addEventListener('change', (_e) => {
      const result = compute();
      if (result) {
        affectedField.removeAttribute('hidden');
      } else {
        affectedField.setAttribute('hidden', '');
      }
    }),
  );
}

function getFields() {
  return Array.from(testForm.elements);
}

function showFieldCustomizationPanel(fieldName) {
  const customizePanel = document.querySelector('[data-customize-panel=""]');
  const field = document.querySelector(`[name=${fieldName}]`);
  const propsContainer = customizePanel.querySelector('[data-proprties-list=""]');

  propsContainer.removeAttribute('hidden');
  propsContainer.classList.add('flex');

  const span = customizePanel.querySelector('[data-clicked-field=""]');
  span.innerText = `(${field.getAttribute('data-input-label')})`;
}

window.onload = () => {
  console.log('ready');
};
