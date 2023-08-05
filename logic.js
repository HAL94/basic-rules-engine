const conditions = {
  'ConditionOperation|IsFilledOut': {
    label: 'Is Filled Out',
    call: (fieldName, _extraParam) => {
      const field = document.querySelector(`[name="${fieldName}"]`);
      //   console.log('fieldExtracted', fieldExtracted);
      return Boolean(field.value);
    },
  },
  'ConditionOperation|IsNotFilledOut': {
    label: 'Is Not Filled Out',
    call: (field, extraParam) => {
      console.log('should perform IsNotFilledOut');
    },
  },
  'ConditionOperation|StringEquals': {
    label: 'Is',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|StringEquals');
    },
  },
  'ConditionOperation|StringDoesNotEqual': {
    label: 'Is not',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|StringDoesNotEqual');
    },
  },
  'ConditionOperation|Contains': {
    label: 'Contains',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|Contains');
    },
  },
  'ConditionOperation|DoesNotContain': {
    label: 'Not Contains',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|DoesNotContain');
    },
  },
  'ConditionOperation|EndsWith': {
    label: 'Ends With',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|EndsWith');
    },
  },
  'ConditionOperation|DoesNotEndWith': {
    label: 'Not End With',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|DoesNotEndWith');
    },
  },
  'ConditionOperation|StartsWith': {
    label: 'Starts With',
    call: (field, extraParam) => {
      console.log('should perform ConditionOperation|StartsWith');
    },
  },
  'ConditionOperation|DoesNotStartWith': {
    label: 'Not Start With',
    call: (fieldValue) => {
      console.log('should perform ConditionOperation|DoesNotStartWith');
    },
  },
};

function addAndCondition(e, containerDataAttr) {
  const parentIndex = containerDataAttr.split('_')[1];
  const list = document.querySelector(
    `[data-conds-list="${containerDataAttr}"]`,
  );
  if (list) {
    const index = list.children.length;

    const conditionContainer = document.createElement('div');
    conditionContainer.classList.add(
      'flex',
      'flex-col',
      'gap-3',
      'items-start',
      'justify-center',
    );
    conditionContainer.setAttribute('data-conds-index', index);

    // const selectField = document.createElement('select');
    // selectField.setAttribute('name', `field_${parentIndex}_${index}`);
    // selectField.classList.add('border', 'rounded', 'w-full', 'bg-white', 'p-2');
    const selectField = createSelectField(parentIndex, index);

    const selectCond = document.createElement('select');
    selectCond.setAttribute('name', `cond_${parentIndex}_${index}`);
    selectCond.classList.add('border', 'rounded', 'w-full', 'bg-white', 'p-2');

    const fieldCondValue = document.createElement('input');
    fieldCondValue.setAttribute('name', `value_${parentIndex}_${index}`);
    fieldCondValue.classList.add(
      'border',
      'rounded',
      'w-full',
      'bg-white',
      'p-2',
      'hidden',
    );

    const extraCondBtn = document.createElement('button');
    extraCondBtn.setAttribute('type', 'button');
    extraCondBtn.classList.add(
      'bg-white',
      'hover:bg-[#333]',
      'cursor-pointer',
      'p-3',
      'hover:text-white',
      'rounded',
    );
    extraCondBtn.innerText = 'AND+';
    extraCondBtn.onclick = (e) => addAndCondition(e, containerDataAttr);

    Object.keys(conditions).forEach((key) => {
      const opt = document.createElement('option');
      opt.setAttribute('value', key);
      opt.innerText = conditions[key].label;
      selectCond.appendChild(opt);
    });

    e.target.setAttribute('disabled', '');
    e.target.classList.remove(
      'hover:bg-[#333]',
      'cursor-pointer',
      'bg-white',
      'hover:text-white',
      'rounded',
    );

    conditionContainer.appendChild(selectField);
    conditionContainer.appendChild(selectCond);
    conditionContainer.appendChild(fieldCondValue);
    conditionContainer.appendChild(extraCondBtn);

    list.appendChild(conditionContainer);
  }
}

function addOrCondition() {
  const allConditions = customizeForm.querySelectorAll('[data-conds-list]');
  console.log('allConditions', allConditions);

  const nextIndex = allConditions.length;

  const div = document.createElement('div');
  div.setAttribute('data-conds-list', `cond_${nextIndex}`);
  // div.setAttribute('data-conds-index', `${nextIndex}`);

  const container = document.createElement('div');

  const selectField = createSelectField(nextIndex, 0);

  const selectCond = document.createElement('select');
  selectCond.setAttribute('name', `cond_${nextIndex}_0`);

  Object.keys(conditions).forEach((key) => {
    const opt = document.createElement('option');
    opt.setAttribute('value', key);
    opt.innerText = conditions[key].label;
    selectCond.appendChild(opt);
  });

  const selectFieldInput = document.createElement('input');
  selectFieldInput.setAttribute('name', `value_${nextIndex}_0`);

  const btn = document.createElement('button');

  btn.setAttribute('type', 'button');
  btn.onclick = (e) => addAndCondition(e, `cond_${nextIndex}`);
  btn.innerText = 'AND+';

  const containerClasses = 'flex flex-col gap-3 items-start justify-center';
  const selectClasses = 'border rounded w-full bg-white p-2';
  const inputClasses = 'border rounded w-full bg-white p-2 hidden';
  const btnClasses =
    'bg-white hover:bg-[#333] cursor-pointer p-3 hover:text-white rounded';

  containerClasses.split(' ').forEach((cl) => container.classList.add(cl));
  selectClasses.split(' ').forEach((cl) => selectCond.classList.add(cl));
  selectClasses.split(' ').forEach((cl) => selectField.classList.add(cl));
  inputClasses.split(' ').forEach((cl) => selectFieldInput.classList.add(cl));
  btnClasses.split(' ').forEach((cl) => btn.classList.add(cl));

  container.setAttribute('data-conds-index', `0`);
  container.appendChild(selectField);
  container.appendChild(selectCond);
  container.appendChild(selectFieldInput);
  container.appendChild(btn);

  div.appendChild(container);

  allConditions[nextIndex - 1].parentNode.insertBefore(
    div,
    allConditions[nextIndex - 1].nextSibling,
  );
}

function extractFieldAndCondition(sublogicDiv, parentIndex, childIndex) {
  const field = sublogicDiv.querySelector(
    `[name="field_${parentIndex}_${childIndex}"]`,
  ).value;
  const logic = sublogicDiv.querySelector(
    `[name="cond_${parentIndex}_${childIndex}"]`,
  ).value;
  const extraConditionParam = sublogicDiv.querySelector(
    `[name="value_${parentIndex}_${childIndex}"]`,
  ).value;

  return {
    field,
    condition: conditions[logic],
    extraValue: extraConditionParam,
  };
}

function collectAndLogic(conditionDiv) {
  const parentIndex = conditionDiv
    .getAttribute('data-conds-list')
    .split('_')[1];
  const allAndComputations = [];
  Array.from(conditionDiv.children).forEach((sublogicDiv) => {
    const childIndex = sublogicDiv.getAttribute('data-conds-index');
    allAndComputations.push(
      extractFieldAndCondition(sublogicDiv, parentIndex, childIndex),
    );
  });
  // console.log(allAndComputations);
  return allAndComputations;
}

function getControllers() {
  const allConditions = customizeForm.querySelectorAll('[data-conds-list]');
  let controllers = new Set();
  allConditions.forEach((conditionDiv) => {
    const parentIndex = conditionDiv
      .getAttribute('data-conds-list')
      .split('_')[1];
    Array.from(conditionDiv.children).forEach((sublogicDiv) => {
      const childIndex = sublogicDiv.getAttribute('data-conds-index');
      const fieldName = sublogicDiv.querySelector(
        `[name="field_${parentIndex}_${childIndex}"]`,
      ).value;
      const field = document.querySelector(`[name="${fieldName}"]`);

      controllers.add(field);
    });
  });
  return Array.from(controllers);
}

function compute(logIt = true) {
  const allConditions = customizeForm.querySelectorAll('[data-conds-list]');
  if (logIt) console.log('allConditions', allConditions);
  
  const orConditions = [];

  allConditions.forEach((condition) =>
    orConditions.push(collectAndLogic(condition)),
  );
  // console.log(orConditions);
  const finalResult = orConditions
    .map((andArr) => {
      return andArr
        .map((logicObj) => {
          // const field = document.querySelector(`[name="${logicObj.field}"]`);
          // controllers.add(field);
          return Boolean(
            logicObj.condition.call(logicObj.field, logicObj.extraValue),
          );
        })
        .reduce((acc, curr) => {
          return acc && curr;
        }, true);
    })
    .reduce((acc, curr) => {
      return acc || curr;
    }, false);

  if (logIt) console.log('finalResult', finalResult);

  return finalResult;
}
