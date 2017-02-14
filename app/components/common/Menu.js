import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MenuItem } from './';
import { setActive } from '../../actions/MenuActions';

class _Menu extends Component {

  onMenuPress(keyValue) {
    if (this.props.onButtonPress) {
      this.props.onButtonPress(keyValue);
    }
    this.props.setActive(keyValue);
  }

  renderItems() {
    return _.map(this.props.items, (item, key) => {
      return (
        <MenuItem
          key={key}
          keyValue={key} // Needed to retreive key value from menu item.
          active={this.props.activeItem == key}
          onPress={this.onMenuPress.bind(this)}>{item.label}</MenuItem>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderItems()}
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row'
  }
};

const mapStateToProps = ({ menu }) => {
  return {
    activeItem: menu.activeItem
  }
};

const mapActionsToProps = { setActive };

export const Menu = connect(mapStateToProps, mapActionsToProps)(_Menu);
