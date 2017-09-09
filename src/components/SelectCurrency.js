import React from 'react';
import PropTypes from 'prop-types';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

function SelectCurrency(props) {
  const {currencies, selectedCurrency, handleCurrencySelected} = props;
  return (
    <div className="row justify-content-center">
      <UncontrolledDropdown>
        <DropdownToggle caret>
          {selectedCurrency}
        </DropdownToggle>
        <DropdownMenu>
          {currencies.map((currency) => {
              return <DropdownItem key={currency}
                 onClick={() => handleCurrencySelected(currency)}>{currency}
              </DropdownItem>
            }
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}

SelectCurrency.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.array,
  handleCurrencySelected: PropTypes.func
};

export default SelectCurrency;


