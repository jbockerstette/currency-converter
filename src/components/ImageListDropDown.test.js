import React from 'react';
import {shallow} from 'enzyme';
import {Map} from 'immutable';
import ImageListDropDown from './ImageListDropDown';

const currencies = Map({
  USD: Map({
    name: 'US Dollars',
    code: 'USD',
    flag: '',
    symbol: '$'
  }),
  CAD: Map({
    name: 'Canadian Dollars',
    code: 'CAD',
    flag: '',
    symbol: '$'
  }),
});

test('ImageListDropDown renders the props correctly', () => {
  const handleCurrencySelected = (value) => {
    expect(value).toEqual('Canadian Dollars');
  };
  // Render a ImageListDropDown
  const wrapper = shallow(
    <ImageListDropDown selectedCurrency="US Dollars" currencies={currencies} handleCurrencySelected={handleCurrencySelected} />
  );

  expect(wrapper.find('DropdownToggle').children().at(1).text()).toEqual('US Dollars');
  expect(wrapper.find('DropdownMenu').children().at(0).children().at(1).text()).toEqual('Canadian Dollars');
  expect(wrapper.find('DropdownMenu').children().at(1).children().at(1).text()).toEqual('US Dollars');
  wrapper.find('DropdownMenu').children().at(0).simulate('click');
});