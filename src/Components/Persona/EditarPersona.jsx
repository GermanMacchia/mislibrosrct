import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function EditarPersona (props) {
	
	const alert = useAlert();

	const [newPost, setNewPost] = useState(0);	
	const [editado, setEditados] = useState("");	
	const [edit, setEdit] = useState({
			nombre: " ",
		    apellido: " ",
		    email: " ",
		    alias: " "
		});

	
	
	
    useEffect(() => {
		
		async function getPersonas () { 
			await axios.get(`//localhost:8000/persona/`+props.id, {
				  headers: {
				    'Authorization': props.state.AuthReducer[0].token
				  }
				})
				.then((res) => {
				  setEditados(res.data.respuesta[0])
				  
				})
				.catch((error) => {
				  console.error(error)
				});

				
			}
			
		getPersonas ();

		document.querySelector("#Pregistro").reset();
		
    }, [props.id])
	
	

	const handleEditarPersona = (e) => {
		setEdit({
			...edit,
			[e.target.name]: e.target.value
			
		});
		
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();			
		async function putPersonas () { 
				await axios({
				    method: 'put',
				    url: `//localhost:8000/persona/`+props.id,
				    data: edit,
				    headers: {'Authorization': props.state.AuthReducer[0].token}
				    })
				.then((res) => {
					alert.success(`Persona Editada`)
					setNewPost(newPost + 1);
					props.onSave(newPost);
					cerrarModal();
				})
				.catch((error) => {
				  console.error(error)
				});
		}
		putPersonas ();
		const modal = document.querySelector(".modal");
		modal.style = "display: none;";
	}
	
	useEffect(() => {
		
		if(editado != undefined){
	        setEdit({
				nombre: editado.nombre,
				apellido: editado.apellido,
				email: editado.email,
				alias: editado.alias
			})
		}
		
	
	}, [editado])
	
	function cerrarModal(){
		const modal = document.querySelector(".modal");
		modal.style = "display: none;";		
	}

	return(		
			<div className = "homeform">
				<a href="#" onClick={cerrarModal}>X</a>
				<h2>Editar Persona</h2>
					<form id="Pregistro">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleEditarPersona} placeholder={editado.nombre} /><br/>
						<label>Apellido</label><br/>
						<input type="text" name="apellido" onChange={handleEditarPersona} placeholder={editado.apellido} /><br/>
						<label>Email</label><br/>
						<input type="email" name="email" onChange={handleEditarPersona} placeholder={editado.email} disabled/><br/>
						<label>Alias</label><br/>
						<input type="text" name="alias" onChange={handleEditarPersona} placeholder={editado.alias}/><br/><br/>
						<input type= "submit" id='editar_button' onClick= {handleSubmit} value= "Editar" />
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
	
	export default connect(mapStateToProps, mapActionsToProps)(EditarPersona);
