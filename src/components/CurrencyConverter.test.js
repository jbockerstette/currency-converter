import React from 'react';
import {shallow} from 'enzyme';
import CurrencyConverter from './CurrencyConverter';

const currency = {
  symbol: '$',
  name: 'US Dollars',
  code: 'USD',
  flag: 'flag.png'
};



test('CurrencyConverter renders the props correctly', () => {
  const handleOnChange = (value) => {
    expect(value).toEqual(1);
  };
  // Render a CurrencyConverter
  const curConverter = shallow(
    <CurrencyConverter value="1" currency={currency} handleOnChange={handleOnChange} />
  );

  expect(curConverter.find('h5').text()).toEqual('US Dollars');
  expect(curConverter.find('InputGroupAddon').at(0).children().text()).toEqual('$');
  expect(curConverter.find('InputGroupAddon').at(1).children().text()).toEqual('USD');
  curConverter.find('Input').simulate('change', {target:{value:1}});

});