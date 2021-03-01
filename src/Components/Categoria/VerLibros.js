import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


function VerLibros (props) {
	
	
	const [libros, setLibros] = useState([]);	
	
	
	
    useEffect(() => {
		
		async function getLibros () { 
			await axios.get(`//localhost:8000/libro/`, {
				  headers: {
				    'Authorization': props.state.AuthReducer[0].token
				  }
				})
				.then((res) => {
				  setLibros(res.data.respuesta)
				})
				.catch((error) => {
				  console.error(error)
				});

				
			}
			
		getLibros ();
		
    }, [props.id])
	

		
	return(		
			<div id="Clibros" className = "homeform">
				<a href="#" onClick={cerrarModalVerLibros}>X</a>
				<h2>Libros de la categoria</h2>
                
                {libros.filter(libro => libro.categoria_id == props.id).map(libro => {
                    return  <span key={libro.id}>
                                <strong style={{"color": "white"}}>-{libro.nombre}</strong><br/>
                            </span>
                             
                })} 
					
			</div>	
		)

	
    }
	
	function cerrarModalVerLibros(){
		const modalVerLibros = document.querySelector(".modalVerLibros");
		modalVerLibros.style = "display: none;";		
	}


	const mapStateToProps = (state) =>{
		return {state}
	}
	const mapActionsToProps = (dispatch) => {
		return {onSave: (newPost) => dispatch({type:'CHANGE', data: newPost})}
	}
	
	export default connect(mapStateToProps, mapActionsToProps)(VerLibros);
