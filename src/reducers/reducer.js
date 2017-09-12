import {ACTION} from "../actions/actions";
import {DEFAULT_STATE} from "../App";


export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ACTION.SET_CURRENCY_NAMES: {
      return Object.assign({}, state, {currencyNames: action.currencyNames});
    }
    case ACTION.CHANGE_RIGHT_CURRENCY: {
      return Object.assign({}, state, {rightCurrencyCode: action.code});
    }
    case ACTION.CHANGE_LEFT_CURRENCY: {
      return Object.assign({}, state, {leftCurrencyCode: action.code});
    }
    case ACTION.CHANGE_CONVERSION_RATE: {
      return Object.assign({}, state, {conversionRate: action.rate});
    }
    case ACTION.CHANGE_VALUES: {
      return Object.assign({}, state, {leftValue: action.leftValue, rightValue: action.rightValue});
    }
    case ACTION.CHANGE_SELECTED_CURRENCY: {
      return Object.assign({}, state, {selectedCurrencyCode: action.code,
        conversionRate: action.rate});
    }
    default:
      return state;
  }
}