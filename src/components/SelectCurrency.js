import React from 'react';
import PropTypes from 'prop-types';
import {DropdownMenu, DropdownToggle, Dropdown} from "reactstrap";


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
    const {currencies, selectedCurrency, flag} = this.props;
    return (
      <div className="row justify-content-center">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <img className="img-thumbnail flag" src={flag} alt="flag"/>
            {selectedCurrency}
          </DropdownToggle>
          <DropdownMenu>
            {currencies.valueSeq().sortBy(c => c.get('name')).map((currency) => {
                return <div key={currency.get('name')}
                            onClick={() => this.handleOnClick(currency.get('name'))}>
                  <img className="img-thumbnail flag" src={currency.get('flag')} alt="flag"/>{currency.get('name')}
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
  flag: PropTypes.string,
  handleCurrencySelected: PropTypes.func
};

export default SelectCurrency;


