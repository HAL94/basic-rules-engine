function createSelectField(parentIndex, currIndex) {
    const selectField = document.createElement('select');
    selectField.setAttribute('name', `field_${parentIndex}_${currIndex}`);
    selectField.classList.add('border', 'rounded', 'w-full', 'bg-white', 'p-2');

    getFields().forEach((f) => {
        const opt = document.createElement('option');
        const name = f.getAttribute('name');
        const label = f.getAttribute('data-input-label');
  
        opt.value = name;
        opt.innerText = label;
  
        selectField.appendChild(opt);
    });

    return selectField;
}