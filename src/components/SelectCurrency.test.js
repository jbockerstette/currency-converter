import React from 'react';
import {shallow} from 'enzyme';
import SelectCurrency from './SelectCurrency';

const currencies = ['US Dollars','Canadian Dollars'];

test('SelectCurrency renders the props correctly', () => {
  const handleCurrencySelected = (value) => {
    expect(value).toEqual('Canadian Dollars');
  };
  // Render a SelectCurrency
  const wrapper = shallow(
    <SelectCurrency selectedCurrency="US Dollars" currencies={currencies} handleCurrencySelected={handleCurrencySelected} />
  );

  expect(wrapper.find('DropdownToggle').children().text()).toEqual('US Dollars');
  expect(wrapper.find('DropdownItem').at(0).children().text()).toEqual('US Dollars');
  expect(wrapper.find('DropdownItem').at(1).children().text()).toEqual('Canadian Dollars');
  wrapper.find('DropdownItem').at(1).simulate('click');
});