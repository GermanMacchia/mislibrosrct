import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './Components/Nav';
import Biblioteca from './Components/Biblioteca';
import SignIn from './Components/SignIn';
import Home from './Components/Home';

class Router extends Component {

	render(){

		return(

			<BrowserRouter> 

				<Nav />
					
					<Switch>
						<Route exact path="/" component={SignIn} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/biblioteca" component={Biblioteca} />
						<Route component={Error} />
					</Switch>
			
			</BrowserRouter>
		);
	}
}

export default Router;