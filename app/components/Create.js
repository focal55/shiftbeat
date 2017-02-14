import React, { Component } from 'react';
import {
	Text,
	View,
	ListView,
	Modal,
	TouchableHighlight
} from 'react-native';

class Create extends Component {
	constructor(props) {
		super(props);

		let dataBlob = [];
		for (let i = 0; i < 2; i++) {
			let rowInfo = {
				id: i,
				title: 'Row ' + i
			};
			dataBlob.push(rowInfo);
		}

		dataBlob.push({id:dataBlob.length, title: "+ Add"})

		if (this.refs.listView) {
			this.refs.listView.scrollTo({x:_scrollToBottomX - 80, animated:true});
		}

		this.state = {
			dataValues: dataBlob,
			dataSource: ds.cloneWithRows(dataBlob),
			modalVisible: false
		};
	}

	handleAddItem() {
		let newDataValues = this.state.dataValues;
		newDataValues.pop();
		newDataValues.push({id: this.state.dataValues.length, title: "Row " + this.state.dataValues.length});
		newDataValues.push({id:newDataValues.length, title: "+ Add"});

		// Open model.
		this.setState({
			dataValues: newDataValues,
			dataSource: ds.cloneWithRows(newDataValues),
			modalVisible: true
		})
	}

	setModalVisible(visible) {
		this.refs.listView.scrollTo({x:_scrollToBottomX - 120, animated:true});
		this.setState({modalVisible: visible});
	}
	
	render() {
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
					dataSource={this.state.dataSource}
					renderRow={(data) => <Row {...data} onPress={this.handleAddItem.bind(this)} />}
					horizontal={true}
					onContentSizeChange={(contentWidth, contentHeight)=>{
						_scrollToBottomX = contentWidth
					}}
					snapToAlignment={"center"}
					ref="listView"
				/>
			</View>
		)
	}
}

export default Create;