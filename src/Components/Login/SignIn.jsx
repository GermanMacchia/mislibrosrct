import React from 'react';
import axios from 'axios';
import Registro from '../Registro/Registro';
import LoginForm from './LoginForm'

export default function SignIn () {

	return(
		<>
		<div className="login">
			<div id="log">
				<LoginForm />
			</div>
			<div id="reg">
				<Registro />
			</div>
		</div>			
		</>
	);
}

