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
import { playlistFetch } from '../actions';


class Create extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false
		};
	}

	componentDidMount() {
		this.props.playlistFetch();
	}

	handleAddItem() {
		let newDataValues = this.state.dataValues;
		newDataValues.pop();
		newDataValues.push({id: this.state.dataValues.length, title: "Row " + this.state.dataValues.length});
		newDataValues.push({id:newDataValues.length, title: "+ Add"});

		// Open model.
		this.setState({
			modalVisible: true
		})
	}

	setModalVisible(visible) {
		this.refs.listView.scrollTo({x:_scrollToBottomX - 120, animated:true});
		this.setState({modalVisible: visible});
	}

	render() {
		if (this.props.playlist.loading) {
			return (
				<View style={styles.container}>
					<Text>Loading...</Text>
				</View>
			)
		}
		else {
			return (
				<View style={styles.container}>
					<Modal
						animationType={"slide"}
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {alert("Modal has been closed.")}}>
						<View style={{marginTop: 22}}>
							<View>
								<Text>Hello World!</Text>

								<TouchableHighlight onPress={() => {
								this.setModalVisible(!this.state.modalVisible)
							}}>
									<Text>Hide Modal</Text>
								</TouchableHighlight>

							</View>
						</View>
					</Modal>

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
	playlistFetch
};

export default connect(mapStateToProps, mapActionsToProps)(Create);