import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function LibrosForm (props) {

	const alert = useAlert();

	const [newPost, setNewPost] = useState(0);
	const [libro, setLibro] = useState({
		    nombre: " ",
		    descripcion: " ",
		    categoria_id: " ",
		    persona_id: null
			})


	const handleNuevoLibro = (e) => {
		setLibro({
			...libro,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(libro.persona_id);

		async function postLibros () { 
				await axios({
				    method: 'post',
				    url: `//localhost:8000/libro`,
				    data: libro,
				    headers: {'Authorization': props.state.AuthReducer[0].token}
				    })
				.then((res) => {
					alert.success(`Libro agregado`)
					setNewPost(newPost + 1);
					props.onSave(newPost);
				})
				.catch((error) => {
				  console.error(error)
				});
			}
		postLibros ();
		document.getElementById("Lregistro").reset();
		document.getElementById("Tregistro").reset();
	}

	return(
			<div className= "homeform">
				<h2>Ingresar un libro</h2>
				<div className="floatLeft">
					<form id="Lregistro">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleNuevoLibro} placeholder="Nombre del libro" /><br/>
						<label>Categoria </label><br/>
						<input type="text" name="categoria_id" onChange={handleNuevoLibro} placeholder="Categoria" /><br/>
						<label>Persona</label><br/>
						<input type="text" name="persona_id" onChange={handleNuevoLibro} placeholder="Prestado a..."/><br/>
					</form>
				</div>
				<div className="bigtext">
					<form id= "Tregistro">
						<label className="descripcion" >Descripcion </label><br/>
						<textarea type="textarea" name="descripcion" onChange={handleNuevoLibro} placeholder="Descripcion" /><br/><br/>
						<input type= "submit" id='guardar_button' onClick= {handleSubmit} value= "Guardar" />
					</form>
				</div>
			</div>
		)

}

const mapStateToProps = (state) =>{
	return {state}
}
const mapActionsToProps = (dispatch) => {
	return {onSave: (newPost) => dispatch({type:'CHANGE', data: newPost})}
}

export default connect(mapStateToProps, mapActionsToProps)(LibrosForm);



