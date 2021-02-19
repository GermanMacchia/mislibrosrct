import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


function CategoriaList (props) {

    const [categoriasHtml, setCategoriasHtml] = useState();
    const [categorias, setCategorias] = useState();
    const [reload, setReload] = useState(0)


    const handleDelete = (e) => {
        e.preventDefault()

        async function deleteCategoria() {
            const opcion = window.confirm('¿Seguro que quieres eliminar?')
            if (opcion == true) {
                await axios({
                        method: 'delete',
                        url: `//localhost:8000/categoria/` + e.target.value,
                        headers: { 'Authorization': props.state.AuthReducer[0].token },
                    })
                    .then((res) => {
                        console.log('delete exitoso')
                        setReload(reload + 1)

                    })
                    .catch((error) => {
                        console.error(error)
                    });
            }
        }
        deleteCategoria();
    }


    useEffect(() => {

        async function getCategorias() {
            await axios.get(`//localhost:8000/categoria`, {
                    headers: {
                        'Authorization': props.state.AuthReducer[0].token
                    }
                })
                .then((res) => {
                    setCategorias(res.data.respuesta)
                })
                .catch((error) => {
                    console.error(error)
                });
        }
        getCategorias();

    }, [props.state.ChangeReducer, reload])

    useEffect(() => {

        if (categorias != undefined) {

            const categoriaAux = categorias.map((categoria, index) => (
                <tr key={index}>
	            	<td id="indexcategoria"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrecategoria"><p>{categoria.nombre}</p></td>
	            	<td id="aliascategoria"><p>{categoria.id}</p></td>
	            	<td id="deleteBtt"><button onClick={handleDelete} value= {categoria.id}>X</button></td>
	            </tr>
            ))
            setCategoriasHtml(categoriaAux);
        }
    }, [categorias])



    return (
        <div className='contentList'>
			<h2>Lista de categorias</h2>
			<table>
				<thead>
					<tr>
	                	<th>N°</th>
	                    <th>Nombre</th>
	                    <th>ID</th>
	                    <th>Borrar</th>
	                </tr>
                </thead>
	            <tbody>
	                {categoriasHtml}
	            </tbody>
	        </table>
		</div>
    );
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(CategoriaList);