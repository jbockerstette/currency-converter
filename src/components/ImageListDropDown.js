import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {DropdownMenu, DropdownToggle, Dropdown} from "reactstrap";


class ImageListDropDown extends React.Component {
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

  handleOnClick(item) {
    this.toggle();
    this.props.handleSelection(item);
  };

  render() {
    const {items, selectedItem} = this.props;
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <img className="img-thumbnail flag" src={selectedItem.imageSrc} alt="flag"/>
            {selectedItem.name}
          </DropdownToggle>
          <DropdownMenu>
            {items.sortBy(item => item.name).map((item) => {
                return <div key={item.name}
                            onClick={() => this.handleOnClick(item.name)}>
                  <img className="img-thumbnail flag" src={item.imageSrc} alt="flag"/>{item.name}
                </div>
              }
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

ImageListDropDown.propTypes = {
  selectedItem: PropTypes.shape({name: PropTypes.string, imageSrc: PropTypes.string}),
  items: PropTypes.instanceOf(List),
  handleSelection: PropTypes.func
};

export default ImageListDropDown;


