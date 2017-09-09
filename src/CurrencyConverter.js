import React from 'react';
import PropTypes from 'prop-types';
import {InputGroupAddon, InputGroup, Input} from "reactstrap";


class CurrencyConverter extends React.Component {
  render() {
    const {symbol, name, code, flag} = this.props.currency;
    const {value, handleOnChange} = this.props;
    return (
      <div>
        <h5 className="float-left"><img className="flag" src={flag} alt="flag"/>
          {name}</h5>
        <InputGroup className="my-input-group">
          <InputGroupAddon>{symbol}</InputGroupAddon>
          <Input value={value} placeholder="Amount" type="number" step="1"
                 onChange={(e) => handleOnChange(e.target.value)}/>
          <InputGroupAddon>{code}</InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

CurrencyConverter.propTypes = {
  currency: PropTypes.object,
  value: PropTypes.number,
  handleOnChange: PropTypes.func
};


export default CurrencyConverter;

