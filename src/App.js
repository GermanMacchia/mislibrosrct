import Router from './Router';
import axios from 'axios';

import { Provider } from 'react-redux';
import { createStore, combineReducers  } from 'redux';
import MisLibrosReducer from './MisLibrosReducer';


var store = createStore(MisLibrosReducer);

function App() {


  return (
  	<Provider store = {store}>
	    <div className="App">
	        <Router />
	    </div>
    </Provider>
  );
}

export default App;
