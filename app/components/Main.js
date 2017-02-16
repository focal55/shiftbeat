import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { Menu } from './common';
import Featured from './Featured';
import MyPlaylists from './MyPlaylists';
import Create from './Create';
import More from './More';

class _Main extends Component {

	constructor(props) {
		super(props);
		this.menuItems = {
			'featured': {label: 'Featured'},
			'myplaylists': {label: 'My Playlists'},
			'create': {label: 'Create'},
			'more': {label: 'More'}
		};
	}

  renderContent() {
    switch (this.props.activeItem) {
      case 'featured':
        return <Featured />;
        break;

      case 'myplaylists':
        return <MyPlaylists />;
        break;

			case 'create':
				return <Create />;
				break;

			case 'more':
				return <More />;
				break;

      default:
        return <Featured />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {this.renderContent()}
        </View>
				<View style={styles.menuContainer}>
					<Menu items={this.menuItems}/>
				</View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 30
  },
  contentContainer: {
    flex: 10,
    backgroundColor: '#ffffff'
  },
	menuContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: 'black',
	}
};

const mapStateToProps = ({ menu }) => {
  return {
    activeItem: menu.activeItem,
  }
};

export default Main = connect(mapStateToProps)(_Main);
