import React from 'react';
import logo from '../src/images/cash-calculator.svg';
import usd_flag from '../src/images/usd.png';
import aud_flag from '../src/images/aud.png';
import './App.css';
import SelectCurrency from "./SelectCurrency";
import CurrencyConverter from "./CurrencyConverter";
import {Map} from 'immutable';

const CURRENCIES = Map({
  'Aus Dollars': {
    symbol: '$',
    longName: 'Aus Dollars',
    shortName: 'AUD',
    flag: aud_flag
  },
  'US Dollars': {
    symbol: '$',
    longName: 'US Dollars',
    shortName: 'USD',
    flag: usd_flag
  }

});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: CURRENCIES.keySeq().toArray(),
      leftCurrencyName: 'Aus Dollars',
      rightCurrencyName: 'US Dollars',
      conversionRate: 1.5,
      leftValue: 1,
      rightValue: 1.5,
      selectedCurrency: CURRENCIES.keySeq().toArray()[0]
    }
  }

  handleCurrencySelected(currencyName) {
    const {leftValue} = this.state;
    //TODO: Get the new conversion rate.
    const newConversionRate = 5;
    const newRightValue = leftValue * newConversionRate;
    this.setState({
      selectedCurrency: currencyName,
      rightCurrencyName: currencyName,
      conversionRate: newConversionRate,
      rightValue: newRightValue
    });
  }

  handleOnChangeRight(newValue) {
    const newLeftValue = newValue / this.state.conversionRate;
    this.setState({
      leftValue: newLeftValue,
      rightValue: newValue
    });
  }

  handleOnChangeLeft(newValue) {
    const newRightValue = newValue * this.state.conversionRate;
    this.setState({
      leftValue: newValue,
      rightValue: newRightValue
    });
  }


  render() {
    const {
      currencies, leftCurrencyName, rightCurrencyName, conversionRate, leftValue, rightValue,
      selectedCurrency
    } = this.state;

    const leftCurrency = CURRENCIES.get(leftCurrencyName);
    const rightCurrency = CURRENCIES.get(rightCurrencyName);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Currency Converter</h2>
        </div>
        <div className="row justify-content-center">
          <h3 className="my-card-title">Select Currency</h3>
        </div>
        <SelectCurrency selectedCurrency={selectedCurrency} currencies={currencies}
                        handleCurrencySelected={this.handleCurrencySelected.bind(this)}/>
        <div className="row">
          <div className="col-sm-6 col-md-auto my-col">
            <CurrencyConverter currency={leftCurrency} value={leftValue}
                               handleOnChange={this.handleOnChangeLeft.bind(this)}/>
          </div>
          <div className="col-sm-6 col-md-auto my-col">
            <CurrencyConverter currency={rightCurrency} value={rightValue}
                               handleOnChange={this.handleOnChangeRight.bind(this)}/>
          </div>
        </div>
        <div className="row text-left">
          <div className="col-12 my-col-exchange-rate">
            <b>Exchange
              Rate </b> {`${leftCurrency.symbol} 1 ${leftCurrency.shortName} = ${rightCurrency.symbol} ${conversionRate} ${rightCurrency.shortName}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
