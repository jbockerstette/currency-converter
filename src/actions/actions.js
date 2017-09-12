export const ACTION = {
  SET_CURRENCY_NAMES: 'ACTION_SET_CURRENCY_NAMES',
  CHANGE_RIGHT_CURRENCY: 'ACTION_CHANGE_RIGHT_CURRENCY',
  CHANGE_LEFT_CURRENCY: 'ACTION_CHANGE_LEFT_CURRENCY',
  CHANGE_CONVERSION_RATE: 'ACTION_CHANGE_CONVERSION_RATE',
  CHANGE_VALUES: 'ACTION_CHANGE_LEFT_VALUE',
  CHANGE_SELECTED_CURRENCY: 'ACTION_CHANGE_SELECTED_CURRENCY',
};

export function setCurrencyNames(names) {
  return {
    type: ACTION.SET_CURRENCY_NAMES,
    currencyNames: names
  }
}

export function setCurrencySelected(code, rate) {
  return {
    type: ACTION.CHANGE_SELECTED_CURRENCY,
    code,
    rate
  }
}

export function setValues(leftValue, rightValue) {
  return {
    type: ACTION.CHANGE_VALUES,
    leftValue,
    rightValue
  }
}

export function setRightCurrency(code) {
  return {
    type: ACTION.CHANGE_RIGHT_CURRENCY,
    code
  }
}