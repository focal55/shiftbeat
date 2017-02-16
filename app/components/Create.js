import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
	View,
	ListView,
	Modal,
	TouchableHighlight
} from 'react-native';
import PlaylistItemRow from './playlist/PlaylistItemRow';
import Search from './songs/Search';
import Row from './playlist/PlaylistItemRow';
import { playlistCreate } from '../actions';

const renderModal = (props) => {
	if (props.playlist.selected && props.playlist.modalVisible) {
		return (
			<Modal
				animationType={"slide"}
				transparent={false}
				visible={props.modalVisible}
				onRequestClose={() => {alert("Modal has been closed.")}}>
				<Search />
			</Modal>
		)
	}
};

class Create extends Component {
	componentDidMount() {
		this.props.playlistCreate();
	}

	handleAddItem() {
		let newDataValues = this.state.dataValues;
		newDataValues.pop();
		newDataValues.push({id: this.state.dataValues.length, title: "Row " + this.state.dataValues.length});
		newDataValues.push({id:newDataValues.length, title: "+ Add"});
	}

	render() {
		return (
			<View style={styles.container}>
				{renderModal(this.props)}
				<ListView
					dataSource={this.props.playlist.list}
					renderRow={(data) => <Row {...data} onPress={this.handleAddItem.bind(this)} />}
					horizontal={true}
					snapToAlignment={"center"}
					ref="listView"
				/>
			</View>
		)
	}
}

const styles = {
	container: {
		flex:1,
		marginTop: 30
	}
};

const mapStateToProps = ({ playlist }) => {
	return {
		playlist: playlist,
	}
};

const mapActionsToProps = {
	playlistCreate
};

export default connect(mapStateToProps, mapActionsToProps)(Create);