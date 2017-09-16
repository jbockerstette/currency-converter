export const ACTION = {
  SET_CURRENCIES: 'ACTION_SET_CURRENCIES',
  CHANGE_RIGHT_CURRENCY: 'ACTION_CHANGE_RIGHT_CURRENCY',
  CHANGE_LEFT_CURRENCY: 'ACTION_CHANGE_LEFT_CURRENCY',
  CHANGE_CONVERSION_RATE: 'ACTION_CHANGE_CONVERSION_RATE',
  CHANGE_VALUES: 'ACTION_CHANGE_VALUES',
  CHANGE_SELECTED_CURRENCY: 'ACTION_CHANGE_SELECTED_CURRENCY',
};

export function setCurrencies(currencies) {
  return {
    type: ACTION.SET_CURRENCIES,
    currencies: currencies
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

export function setLeftCurrency(code) {
  return {
    type: ACTION.CHANGE_LEFT_CURRENCY,
    code
  }
}