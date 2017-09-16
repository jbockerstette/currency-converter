import React from 'react';
import PropTypes from 'prop-types';
import {InputGroupAddon, InputGroup, Input} from "reactstrap";
import SelectCurrency from "./SelectCurrency";


function CurrencyConverter(props) {
  const {symbol, name, code, flag} = props.currency.toJS();
  const {value, handleOnChange, handleCurrencySelected, currencies} = props;
  return (
    <div>
      <SelectCurrency selectedCurrency={name}
                      currencies={currencies}
                      flag={flag}
                      handleCurrencySelected={handleCurrencySelected}/>
      <InputGroup className="my-input-group">
        <InputGroupAddon>{symbol}</InputGroupAddon>
        <Input value={value} placeholder="Amount" type="number" step="1"
               onChange= {(e) => handleOnChange(e.target.value)}/>
        <InputGroupAddon>{code}</InputGroupAddon>
      </InputGroup>
    </div>
  );
}

CurrencyConverter.propTypes = {
  currency: PropTypes.object,
  value: PropTypes.any,
  handleOnChange: PropTypes.func,
  handleCurrencySelected: PropTypes.func,
  currencies: PropTypes.object,
};


export default CurrencyConverter;

