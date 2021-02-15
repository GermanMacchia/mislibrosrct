import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LoginForm from './LoginForm'


function Login (props) {


	const handleRequest = (auth, token) => {
		const keep = token;
		
		while(keep === undefined){
			console.log('awaiting auhorization')
			props.onSave({ token: token });
		}
		
		window.location = '/home';
		
  	}


	return(
		<>
			<LoginForm handleRequest={handleRequest} />
		</>
		);

}

const mapActionsToProps = (dispatch) => {
	return {onSave: (token) => dispatch({type:'AUTH', data: token})}
}

export default connect(null, mapActionsToProps)(Login);
