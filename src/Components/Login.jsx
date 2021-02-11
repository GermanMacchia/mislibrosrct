import React, {useState} from 'react';
import axios from 'axios';

export default function Login () {

	const [pass, setPass] = useState('');
	const [user, setUser] = useState('');

	const handlePassChange = (e) => {
		setPass(e.target.value);
	}

	const handleUserChange = (e) => {
		setUser(e.target.value);

	}
	
	const API = "https://localhost:8000/login";

	async function makeRequest () {

	    const params = {
		        user: user,
		        pass: pass
		      }

    	
    	const respuesta = await axios.post(API, params).then(res => {
        console.log(respuesta.respuesta)
		})
		.catch(err => {
		    if (err.response) {
		      alert('Problema')
		    } else if (err.request) {
		      alert('Problema');
		  }
		})

    }

    const handleSubmit = (e) => {
    	e.preventDefault();
    	makeRequest();
    }


	return(
			<div className= "Logform">
				<h2>Ingresa a tu biblioteca</h2>
				<form action="Login">
					<label>User </label>
					<input type="text" onChange={handleUserChange} /><br/>
					<label>Pass </label>
					<input type="text" onChange={handlePassChange}/><br/><br/>
					<input type= "submit" onClick={handleSubmit} value= "Ingresa" />
				</form>
			</div>
		);

}