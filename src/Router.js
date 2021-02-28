import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './Components/Home/Header';
import SignIn from './Components/Login/SignIn';
import Home from './Components/Home/Home';
import Categorias from './Components/Categoria/Categorias';
import Personas from './Components/Persona/Personas';


export default function Router (props){

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

