import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function CategoriaForm (props) {

	const [newPost, setNewPost] = useState(0);

	const [categoria, setCategoria] = useState({
		    nombre: " "
			})

	const handleNuevacategoria = (e) => {
		setCategoria({
			nombre: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		async function postCategoria () { 
				await axios({
				    method: 'post',
				    url: `//localhost:8000/categoria`,
				    data: categoria,
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
		postCategoria ();
		document.getElementById("Cregistro").reset();
	}

	return(
			<div className= "homeform">
				<h2>Ingresar una categoria</h2>
					<form id="Cregistro">
						<label>Categoria</label><br/><br/>
						<input type="text" onChange={handleNuevacategoria} placeholder="Nombre categoria"/><br/><br/>
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

export default connect(mapStateToProps, mapActionsToProps)(CategoriaForm);

