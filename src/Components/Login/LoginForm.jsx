import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import axios from 'axios';
import Home from '../Home/Home'


function LoginForm (props) {

	const history = useHistory();
	const alert = useAlert()
	
	const [form, setForm] = useState({
								user:'',
								pass:''
							});

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

    const handleSubmit = (e) => {
    	e.preventDefault();

    	async function postLogin () { 
			await axios.post(`//localhost:8000/login`, form)
				.then( (res) => {

					if(res.data.token != null || undefined){
						const token = res.data.token;
						props.onSave({token});
						alert.success(`¡Bienvenido ${form.user}!`);
						history.push('/home');
					
					}else{
						console.log('Error de Login')
					}
				} )
				.catch( (error) => {
				    alert.error('Error de Datos');
				});
		}

		postLogin();
	}

	const irReg = ()=>{		
        const reg = document.querySelector("#reg");
		reg.style = "display: block;"; 
		const log = document.querySelector("#log");
		log.style = "display: none;";
	}

	return(
		<div className= "Logform">
			<h2>Ingresa a tu biblioteca</h2>
			<form action="Login">
				<label>User </label>
				<input type="text" name='user' placeholder="Usuario" onChange={handleForm} /><br/>
				<label>Pass </label>
				<input type="password" name='pass'placeholder="Contraseña" onChange={handleForm}/><br/><br/>
				<input className="button" type= "submit" onClick={handleSubmit} value= "Ingresa" />
			</form>
			<a href="#/" onClick={irReg}>Registrate</a>
		</div>
	);

}

const mapActionsToProps = (dispatch) => {
	return {onSave: (token) => dispatch({type:'TOKEN', data: token})}
}

export default connect(null, mapActionsToProps)(LoginForm);



