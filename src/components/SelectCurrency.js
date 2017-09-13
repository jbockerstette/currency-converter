import React from 'react';
import PropTypes from 'prop-types';
import {DropdownMenu, DropdownToggle, Dropdown} from "reactstrap";

// const {currencies, selectedCurrency, handleCurrencySelected} = props;

class SelectCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleOnClick(currencyName) {
    this.toggle();
    this.props.handleCurrencySelected(currencyName);
  };

  render() {
    const {currencies, selectedCurrency} = this.props;
    return (
      <div className="row justify-content-center">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {selectedCurrency}
          </DropdownToggle>
          <DropdownMenu>
            {currencies.valueSeq().map((currency) => {
                return <div key={currency.name}
                            onClick={() => this.handleOnClick(currency.name)}>
                  <img className="img-thumbnail flag" src={currency.flag} alt="flag"/>{currency.name}
                </div>
              }
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

SelectCurrency.propTypes = {
  selectedCurrency: PropTypes.string,
  currencies: PropTypes.object,
  handleCurrencySelected: PropTypes.func
};

export default SelectCurrency;


