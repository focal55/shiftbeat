import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import Main from './components/Main';

class App extends Component {

	render() {
		const store = createStore(
			reducers,
			applyMiddleware(ReduxThunk),
		);
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		);
	}
}

const styles = {
	container: {
		flex:1,
		paddingTop: 30,
		backgroundColor: '#000',
	}
};

export default App;