import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LoginForm from './LoginForm'

function Login (props) {


	const token = props.auth[0]

	const [auth, setAuth] = useState({
		auth: false,
		token: token})


	useEffect( () => {
		if(token != undefined ){
			setAuth({
				auth: true
			})		
		}
		return () => {
			window.location = '/home'
		};
	}, [token])


	return(
			<LoginForm />
		);

}

const mapStateToProps = (state) =>{
	return {auth: state}
}

export default connect(mapStateToProps, null)(Login);