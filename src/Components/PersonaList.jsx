import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


function PersonaList(props) {

    const [personasHtml, setPersonasHtml] = useState();
    const [personas, setPersonas] = useState();
    const [reload, setReload] = useState(0)


    const handleDelete = (e) => {
        e.preventDefault()

        async function deletePersona() {
            const opcion = window.confirm('¿Seguro que quieres eliminar?')
            if (opcion == true) {
                await axios({
                        method: 'delete',
                        url: `//localhost:8000/persona/` + e.target.value,
                        headers: { 'Authorization': props.state.AuthReducer[0].token },
                    })
                    .then((res) => {
                        console.log('delete exitoso')
                        setReload(reload + 1)

                    })
                    .catch((error) => {
                        console.error(error)
                        alert('No es posible borrar, la persona tiene libros prestados')
                    });
            }
        }
        deletePersona();
    }


    useEffect(() => {

        async function getPersonas() {
            await axios.get(`//localhost:8000/persona`, {
                    headers: {
                        'Authorization': props.state.AuthReducer[0].token
                    }
                })
                .then((res) => {
                    setPersonas(res.data.respuesta)
                })
                .catch((error) => {
                    console.error(error)
                });
        }
        getPersonas();

    }, [props.state.ChangeReducer, reload])

    useEffect(() => {

        if (personas != undefined) {

            const personaAux = personas.map((persona, index) => (
                <tr key={index}>
	            	<td id="indexPersona"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrePersona"><p>{persona.nombre}</p></td>
	                <td id="apellidoPersona"><p>{persona.apellido}</p></td>    
	                <td id="emailPersona"><p>{persona.email}</p></td>
	            	<td id="aliasPersona"><p>{persona.alias}</p></td>
                    <td id="idPerona"><p>{persona.id}</p></td>
	            	<td id="deleteBtt"><button onClick={handleDelete} value= {persona.id}>X</button></td>
	            </tr>
            ))
            setPersonasHtml(personaAux);
        }
    }, [personas])



    return (
        <div className='contentList'>
			<h2>Lista de Personas</h2>
			<table>
				<thead>
					<tr>
	                	<th>N°</th>
	                    <th>Nombre</th>
	                    <th>Apellido</th>
	                    <th>Email</th>
	                    <th>Alias</th>
                        <th>ID</th>
	                    <th>Borrar</th>
	                    
	                </tr>
                </thead>
	            <tbody>
	                {personasHtml}
	            </tbody>
	        </table>
		</div>
    );
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(PersonaList);