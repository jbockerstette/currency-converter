import React from 'react';
import PropTypes from 'prop-types';
import {InputGroupAddon, InputGroup, Input} from "reactstrap";
import ImageListDropDown from "./ImageListDropDown";
import {List} from "immutable";


function CurrencyConverter(props) {
  const {symbol, name, code, flag} = props.currency.toJS();
  const {value, handleOnChange, handleCurrencySelected, currencies} = props;
  const items = List(currencies.valueSeq().map(currency => Object.assign({}, {
    name: currency.get('name'),
    imageSrc: currency.get('flag')
  })));
  return (
    <div>
      <ImageListDropDown selectedItem={{name, imageSrc: flag}}
                         items={items}
                         handleSelection={handleCurrencySelected}/>
      <InputGroup className="my-input-group">
        <InputGroupAddon>{symbol}</InputGroupAddon>
        <Input value={value} placeholder="Amount" type="number" step="1"
               onChange={(e) => handleOnChange(e.target.value)}/>
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

