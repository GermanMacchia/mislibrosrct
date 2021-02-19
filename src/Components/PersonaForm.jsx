import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function PersonaForm (props) {

	const [newPost, setNewPost] = useState(0);

	const [persona, setPersona] = useState({
		    nombre: " ",
		    apellido: " ",
		    email: " ",
		    alias: " "
			})

	const handleNuevaPersona = (e) => {
		setPersona({
			...persona,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		async function postPersona () { 
				await axios({
				    method: 'post',
				    url: `//localhost:8000/persona`,
				    data: persona,
				    headers: {'Authorization': props.state.AuthReducer[0].token}
				    })
				.then((res) => {
					console.log('post exitoso')
					setNewPost(newPost + 1);
					props.onSave(newPost);
				})
				.catch((error) => {
				  console.error(error)
				});
			}
		postPersona ();
		document.getElementById("Pregistro").reset();
	}

	return(
			<div className= "homeform">
				<h2>Ingresar una Persona</h2>
					<form id="Pregistro">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleNuevaPersona} placeholder="Nombre" /><br/>
						<label>Apellido</label><br/>
						<input type="text" name="apellido" onChange={handleNuevaPersona} placeholder="Apellido" /><br/>
						<label>Email</label><br/>
						<input type="email" name="email" onChange={handleNuevaPersona} placeholder="Email"/><br/>
						<label>Alias</label><br/>
						<input type="text" name="alias" onChange={handleNuevaPersona} placeholder="Prestado a..."/><br/><br/>
						<input type= "submit" id='guardar_button' onClick= {handleSubmit} value= "Guardar" />
					</form>
			</div>
		)

}

const mapStateToProps = (state) =>{
	return {state}
}
const mapActionsToProps = (dispatch) => {
	return {onSave: (newPost) => dispatch({type:'CHANGE', data: newPost})}
}

export default connect(mapStateToProps, mapActionsToProps)(PersonaForm);

