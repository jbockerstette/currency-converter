import React from 'react';
import {Map} from 'immutable';
import logo from '../src/images/cash-calculator.svg';
import usd_flag from '../src/images/usd.png';
import aud_flag from '../src/images/aud.png';
import './App.css';
import SelectCurrency from "./SelectCurrency";
import CurrencyConverter from "./CurrencyConverter";
import {forOwn} from 'lodash';


const currencies = {
  'USD': {
    symbol: '$',
    name: 'US Dollars',
    code: 'USD',
    flag: usd_flag,
    rate: 1
  }
};

const longToShortName = {
  'US Dollars': 'USD'
};

const BASE_CURRENCY = {
  symbol: '$',
  name: 'US Dollars',
  code: 'USD',
  flag: usd_flag,
  rate: 1
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currenyNames: [],
      leftCurrencyName: 'US Dollars',
      rightCurrencyName: 'US Dollars',
      conversionRate: 1,
      leftValue: 1,
      rightValue: 1,
      selectedCurrency: 'US Dollars',
      isLoading: false,
    }
  }

  componentWillMount() {
    this.fetchCountryData();
  }


  fetchCountryData() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.forEach((country) => {
        const currency = country['currencies'][0];
        currencies[currency.code] = {};
        Object.assign(currencies[currency.code], currency);
        longToShortName[currency.name] = currency.code;
      })).then(() => {
        this.setState({
          currenyNames: Object.keys(longToShortName),
          isLoading: false
        });
    })
      .catch(error => console.log('parsing failed', error));
  }

  fetchRate(fromCurrencyName, toCurrencyName) {
    const { leftValue } = this.state;
    const fromCurrency = this.getCurrency(fromCurrencyName);
    const toCurrency = this.getCurrency(toCurrencyName);

    // fetch('http://api.fixer.io/latest?base=USD&symbols=USD,EUR')
    fetch(`http://api.fixer.io/latest?base=${fromCurrency.code}&symbols=${toCurrency.code}`)
      .then(response => response.json())
      .then(parsedJSON => {
        let rate = 0;
        if (toCurrencyName !== fromCurrencyName) {
          rate = parsedJSON.rates[toCurrency.code];
        }
        console.log(rate);
        this.setState({
          rightValue: leftValue * rate,
          conversionRate: rate
        });
      }).catch(error => console.log('parsing failed', error));
  }

  handleCurrencySelected(currencyName) {
    const { leftCurrencyName } = this.state;
    this.fetchRate(leftCurrencyName, currencyName);
    this.setState({
      selectedCurrency: currencyName,
      rightCurrencyName: currencyName
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

  getCurrency(longName) {
    return currencies[longToShortName[longName]];
  }


  render() {
    const {
      currenyNames, leftCurrencyName, rightCurrencyName, conversionRate, leftValue, rightValue,
      selectedCurrency
    } = this.state;

    const leftCurrency = this.getCurrency(leftCurrencyName);
    const rightCurrency = this.getCurrency(rightCurrencyName);

    console.log(leftCurrency);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Currency Converter</h2>
        </div>
        <div className="row justify-content-center">
          <h3 className="my-card-title">Select Currency</h3>
        </div>
        <SelectCurrency selectedCurrency={selectedCurrency} currencies={currenyNames}
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
              Rate </b> {`${leftCurrency.symbol} 1 ${leftCurrency.code} = ${rightCurrency.symbol} ${conversionRate} ${rightCurrency.code}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
