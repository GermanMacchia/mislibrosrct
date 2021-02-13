import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function LoginForm (props) {

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

    	async function conexion () { 

			return await axios.post(`//localhost:8000/login`, 
				{
				    user: form.user,
				    pass: form.pass
				})
					.then( (res) => {
						if(res.data.token != null || undefined){
							console.log('conexion exitosa')
							props.onSave({token:res.data.token});
						}else{
							console.log('Error de Login')
						}
					})
					.catch( (error) => {
					    console.log('Error de datos');
					    alert('Error de Datos');
					});
				}
		conexion();

		
    }


	return(
			<div className= "Logform">
				<h2>Ingresa a tu biblioteca</h2>
				<form action="Login">
					<label>User </label>
					<input type="text" name='user' placeholder="Usuario" onChange={handleForm} /><br/>
					<label>Pass </label>
					<input type="password" name='pass'placeholder="Contraseña" onChange={handleForm}/><br/><br/>
					<input type= "submit" onClick={handleSubmit} value= "Ingresa" />
				</form>
			</div>
	);
}

const mapActionsToProps = (dispatch) => {
	return {onSave: (auth) => dispatch({type: 'AUTH', data: auth})}
}
export default connect(null, mapActionsToProps)(LoginForm);