import React from 'react';
import {InputGroupAddon, InputGroup, Input} from "reactstrap";


class CurrencyConverter extends React.Component {
  render() {
    const {symbol, longName, shortName, flag} = this.props.currency;
    return (
      <div>
        <h5 className="float-left"><img className="flag" src={flag} alt="flag"/>
          {longName}</h5>
        <InputGroup className="my-input-group">
          <InputGroupAddon>{symbol}</InputGroupAddon>
          <Input placeholder="Dolla dolla billz yo!"/>
          <InputGroupAddon>{shortName}</InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default CurrencyConverter;

