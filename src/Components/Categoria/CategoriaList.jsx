import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function CategoriaList (props) {

    const alert = useAlert()

    const [categoriasHtml, setCategoriasHtml] = useState();
    const [categorias, setCategorias] = useState();
    const [reload, setReload] = useState(0);

    const handleReset = (e) => {
        e.preventDefault();

        async function resetCategoria() {
            await axios ({
                method: 'put',
                url: `//localhost:8000/c.reset`,
                headers: { 'Authorization': props.state.AuthReducer[0].token }
            })
            .then((res) => {
                alert.success('Se han reseteado los parametros');
                setReload(reload + 1);
            })
            .catch((error) => {
                console.error(error)
            });
        }

        resetCategoria();
    } 

    const handleDelete = (e) => {
        e.preventDefault()

        async function deleteCategoria() {
            const opcion = window.confirm('¿Seguro que quieres eliminar?')
            if (opcion == true) {
                await axios({
                        method: 'delete',
                        url: `//localhost:8000/categoria/` + e.target.value,
                        headers: { 'Authorization': props.state.AuthReducer[0].token }
                    })
                    .then((res) => {
                        alert.success('Se ha borrado correctamente')
                        setReload(reload + 1)

                    })
                    .catch((error) => {
                        console.error(error)
                        alert.error('¡No se puede borrar! Esta categoria tiene libros asociados!')
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
            <button className="reset" onClick= {handleReset}>Reset ID</button> 
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