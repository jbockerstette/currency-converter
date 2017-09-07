import React, { Component } from 'react';
import logo from '../src/images/cash-calculator.svg';
import './App.css';
import {UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Currency Converter</h2>
        </div>
        <div className="panel panel-default">
          <h2>Select Currency</h2>
          <UncontrolledDropdown>
            <DropdownToggle caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}

export default App;
