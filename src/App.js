import React from 'react';
import {Map} from 'immutable';
import logo from '../src/images/cash-calculator.svg';
import usd_flag from '../src/images/usd.png';
import aud_flag from '../src/images/aud.png';
import './App.css';
import SelectCurrency from "./SelectCurrency";
import CurrencyConverter from "./CurrencyConverter";
import {forOwn} from 'lodash';


const currencies = {};
const longToShortName = {};
const shortToLongName = {};

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
      leftCurrencyCode: 'USD',
      rightCurrencyCode: 'USD',
      conversionRate: 1,
      leftValue: 1,
      rightValue: 1,
      selectedCurrencyCode: 'USD',
      isLoading: false,
    }
  }

  componentWillMount() {
    this.fetchCountryData();
  }

  toShortName(longName) {
    return longToShortName[longName];
  }

  toLongName(shortName) {
    return shortToLongName[shortName];
  }


  fetchCountryData() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.forEach((country) => {
        const currency = country['currencies'][0];
        if (currency) {
          currencies[currency.code] = {};
          Object.assign(currencies[currency.code], currency, {flag: country.flag});
          longToShortName[currency.name] = currency.code;
          shortToLongName[currency.code] = currency.name;
        }
      })).then(() => {
        this.setState({
          currenyNames: Object.keys(longToShortName),
          isLoading: false
        });
    })
      .catch(error => console.log('parsing failed', error));
  }

  fetchRate(fromCurrencyCode, toCurrencyCode) {
    const { leftValue } = this.state;

    // fetch('http://api.fixer.io/latest?base=USD&symbols=USD,EUR')
    fetch(`http://api.fixer.io/latest?base=${fromCurrencyCode}&symbols=${toCurrencyCode}`)
      .then(response => response.json())
      .then(parsedJSON => {
        let rate = 1;
        if (toCurrencyCode !== fromCurrencyCode && parsedJSON.rates) {
          rate = parsedJSON.rates[toCurrencyCode];
        }
        console.log(rate);
        this.setState({
          rightValue: leftValue * rate,
          conversionRate: rate
        });
      }).catch(error => console.log('parsing failed', error));
  }

  handleCurrencySelected(longCurrencyName) {
    const { leftCurrencyCode } = this.state;
    const selectedCode = this.toShortName(longCurrencyName);
    this.fetchRate(leftCurrencyCode, selectedCode);
    this.setState({
      selectedCurrencyCode: selectedCode,
      rightCurrencyCode: selectedCode
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
      currenyNames, leftCurrencyCode, rightCurrencyCode, conversionRate, leftValue, rightValue
    } = this.state;

    const leftCurrency = currencies[leftCurrencyCode];
    const rightCurrency = currencies[rightCurrencyCode];

    console.log(leftCurrency);

    if (!leftCurrency || !rightCurrency) { return null; }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Currency Converter</h2>
        </div>
        <div className="row justify-content-center">
          <h3 className="my-card-title">Select Currency</h3>
        </div>
        <SelectCurrency selectedCurrency={leftCurrency.name} currencies={currenyNames}
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
              Rate </b> {`${leftCurrency.symbol} 1 ${leftCurrency.code} = ${rightCurrency.symbol}
              ${conversionRate} ${rightCurrency.code}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
