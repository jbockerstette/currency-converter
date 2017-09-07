import React from 'react';
import logo from '../src/images/cash-calculator.svg';
import usd_flag from '../src/images/usd.png';
import aud_flag from '../src/images/aud.png';
import './App.css';
import { Card,  CardTitle } from "reactstrap";
import SelectCurrency from "./SelectCurrency";
import CurrencyConverter from "./CurrencyConverter";
import { Map } from 'immutable';

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
      currencies: ['testing'],
      leftCurrencyName: 'Aus Dollars',
      rightCurrencyName: 'US Dollars',
      conversionRate: 1.5,
      leftValue: 1,
      rightValue: 1.5
    }
  }

  handleSelectCurrency() {
    console.log('handleSelectCurrency')
  }

  render() {
    const {
      currencies, leftCurrencyName, rightCurrencyName, conversionRate, leftValue, rightValue
    } = this.state;

    const leftCurrency = CURRENCIES.get(leftCurrencyName);
    const rightCurrency = CURRENCIES.get(rightCurrencyName);

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
          <SelectCurrency currencies={currencies}/>
          <div className="row">
            <div className="col-6 my-col">
              <CurrencyConverter currency={leftCurrency} value={leftValue}/>
            </div>
            <div className="col-6 my-col">
              <CurrencyConverter currency={rightCurrency} value={rightValue}/>
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
