import React from 'react';
import PropTypes from 'prop-types';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

class SelectCurrency extends React.Component {
  render() {
    const {currencies} = this.props || ['testing'];
    return (
      <div className="row justify-content-center">
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            {currencies.map((currency) => {
                return <DropdownItem>{currency}</DropdownItem>
              }
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

export default SelectCurrency;


