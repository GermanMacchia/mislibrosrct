import React from 'react';
import axios from 'axios';
import Login from './Login';
import Registro from './Registro';


export default function SignIn () {



	return(
		<>
			<div id="log">
				<Login />
				<Registro />
			</div>
		</>
	);
}

