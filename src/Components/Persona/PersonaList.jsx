import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function PersonaList(props) {

    const alert = useAlert()

    const [personasHtml, setPersonasHtml] = useState();
    const [personas, setPersonas] = useState();
    const [reload, setReload] = useState(0)




    const handleReset = (e) => {
        e.preventDefault();

        async function resetPersona() {
            await axios ({
                method: 'put',
                url: `//localhost:8000/p.reset`,
                headers: { 'Authorization': props.state.AuthReducer[0].token }
            })
            .then((res) => {
                setReload(reload + 1);
                alert.success('Se han reseteado los parametros')
            })
            .catch((error) => {
                console.error(error)
            });
        }

        resetPersona();
    } 

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
                        alert.success('Se ha borrado correctamente')
                        setReload(reload + 1)

                    })
                    .catch((error) => {
                        console.error(error)
                        alert.error('¡La persona tiene libros asociados!')
                    });
            }
        }
        deletePersona();
    }

    const handleLista = (e) => {
            e.preventDefault()

            async function getLibrosPrestados (id){
                await axios.get(`//localhost:8000/persona/libro/` + id, {
                    headers: {
                        'Authorization': props.state.AuthReducer[0].token
                    }
                })
                .then((res) => {
                    const lista = res.data.respuesta;
                    const listaAux = lista.map((libro, index)=>(
                            ` ${index + 1} ${JSON.stringify(libro.nombre)}`
                        ))
                listaAux.map((libro) => {alert.success(libro)})
                                       
                })
                .catch((error) => {
                    console.error(error)
                   alert.show('No tiene libros prestados')
                });
            }

            getLibrosPrestados(e.target.value)

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
                    <td id="idPersona"><p>{persona.id}</p></td>
                    <td id="librosPrestados"><button onClick={handleLista} value= {persona.id}>O</button></td>
	            	<td id="deleteBtt"><button onClick={handleDelete} value= {persona.id}>X</button></td>
	            </tr>
            ))
            setPersonasHtml(personaAux);


        }
    }, [personas])



    return (
        <div className='contentList'>
			<h2>Lista de Personas</h2>
            <button className="reset" onClick= { handleReset }>Reset ID</button> 
			<table>
				<thead>
					<tr>
	                	<th>N°</th>
	                    <th>Nombre</th>
	                    <th>Apellido</th>
	                    <th>Email</th>
	                    <th>Alias</th>
                        <th>ID</th>
                        <th>Prestados</th>
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