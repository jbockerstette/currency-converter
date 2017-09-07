import React, {Component} from 'react';
import logo from '../src/images/cash-calculator.svg';
import usd_flag from '../src/images/usd.png';
import aud_flag from '../src/images/aud.png';
import './App.css';
import {
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Card,
  CardTitle, InputGroupAddon, InputGroup, Input
} from "reactstrap";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">

        <Card className="my-card">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Currency Converter</h2>
          </div>
          <div className="row justify-content-center">
            <CardTitle className="my-card-title">Select Currency</CardTitle>
          </div>
          <div className="row justify-content-center">
            <UncontrolledDropdown>
              <DropdownToggle caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="row">
            <div className="col-6 my-col">
              <h5 className="float-left"><img className="flag" src={aud_flag} alt="flag"/>
                Aus Dollars</h5>
              <InputGroup className="my-input-group">
                <InputGroupAddon>$</InputGroupAddon>
                <Input placeholder="Dolla dolla billz yo!"/>
                <InputGroupAddon>AUD</InputGroupAddon>
              </InputGroup>
            </div>
            <div className="col-6 my-col">
              <h5 className="float-left"><img className="flag" src={usd_flag} alt="flag"/>
                United States Dollars</h5>
              <InputGroup className="my-input-group">
                <InputGroupAddon>$</InputGroupAddon>
                <Input placeholder="Dolla dolla billz yo!"/>
                <InputGroupAddon>USD</InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div className="row text-left">
            <div className="col-12 my-col-exchange-rate">
              <b>Exchange Rate</b>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default App;
