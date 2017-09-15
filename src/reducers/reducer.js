import {Map} from 'immutable';
import {ACTION} from "../actions/actions";
import {DEFAULT_STATE} from "../App";


export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ACTION.SET_CURRENCIES: {
      return state.merge({currencies: Map(action.currencies)});
    }
    case ACTION.CHANGE_RIGHT_CURRENCY: {
      return state.merge({rightCurrencyCode: action.code});
    }
    case ACTION.CHANGE_LEFT_CURRENCY: {
      return state.merge({leftCurrencyCode: action.code});
    }
    case ACTION.CHANGE_CONVERSION_RATE: {
      return state.merge({conversionRate: action.rate});
    }
    case ACTION.CHANGE_VALUES: {
      return state.merge({leftValue: action.leftValue, rightValue: action.rightValue});
    }
    case ACTION.CHANGE_SELECTED_CURRENCY: {
      return state.merge({selectedCurrencyCode: action.code,
        conversionRate: action.rate});
    }
    default:
      return state;
  }
}