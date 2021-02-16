import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Components/Header';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import Categorias from './Components/Categorias';
import Personas from './Components/Personas';


export default function Router (){


	return(

		<BrowserRouter> 

			<Header />
				
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/home" component={Home} />
					
					<Route exact path="/categoria" component={Categorias} />
					<Route exact path="/personas" component={Personas} />
					<Route component={Error} />
				</Switch>
		
		</BrowserRouter>
	);	
}

