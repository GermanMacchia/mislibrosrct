import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import SignIn from './Components/SignIn';
import Home from './Components/Home';

class Router extends Component {


	render(){

		return(

			<BrowserRouter> 

				<Header />
					
					<Switch>
						<Route exact path="/" component={SignIn} />
						<Route exact path="/home" component={Home} />
									
						<Route component={Error} />
					</Switch>
			
			</BrowserRouter>
		);
	}
}

export default Router;