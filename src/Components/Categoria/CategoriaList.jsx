import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import EditarCategoria from './EditarCategoria';
import VerLibros from './VerLibros';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import MenuBookIcon from '@material-ui/icons/MenuBook';

function CategoriaList (props) {

    const alert = useAlert()

    const [categoriasHtml, setCategoriasHtml] = useState();
    const [categorias, setCategorias] = useState();
    const [reload, setReload] = useState(0);
    const [editar, setEditar] = useState("");
    const [verLibros, setVerLibros] = useState("");

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

    const handleEditar = (e) => {
		e.preventDefault()
		
			async function editarCategoria (e) {
				setEditar(<EditarCategoria id={e.target.value} />);
			}
		editarCategoria(e);
        const modal = document.querySelector(".modal");
		modal.style = "display: block;"; 
        const modalVerLibros = document.querySelector(".modalVerLibros");
		modalVerLibros.style = "display: none;";    
                
	}

    const handleVerLibros = (e) => {
        e.preventDefault();

        const verLibros = e => {
            setVerLibros(<VerLibros id={e.target.value} />);
        }
        verLibros(e);
        const modalVerLibros = document.querySelector(".modalVerLibros");
		modalVerLibros.style = "display: block;";
        const modal = document.querySelector(".modal");
		modal.style = "display: none;";
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
                    <td id="mostrarLibrosBtt"><button className="funcionBtt" onClick={handleVerLibros} value= {categoria.id}>V</button></td>
	            	<td id="deleteBtt"><button className="funcionBtt" onClick={handleDelete} value= {categoria.id}>X</button></td>
                    <td id="editadoBtt"><button className="funcionBtt"  onClick={handleEditar} value= {categoria.id}>E</button></td>
	            </tr>
            ))
            setCategoriasHtml(categoriaAux);
        }
    }, [categorias])



    return (
        <div className='contentList'>
			<h2>Lista de categorias</h2>
            <Tooltip title= "Reset ID +">
                <button className="reset" onClick= { handleReset }><AutorenewIcon /></button>
            </Tooltip> 
			<table>
				<thead>
					<tr>
                        <th>
                            <Tooltip title= "Numero">
                                <FormatList />
                            </Tooltip>
                        </th>
	                    <th>Nombre</th>
                        <th>
                            <Tooltip title= "Categoria ID">
                                <ClassIcon />
                            </Tooltip>                          
                        </th>
                        <th className="funcion">
                        <Tooltip title= "Ver Libros">
	                    		<MenuBookIcon />
	                    	</Tooltip>
                        </th>  
                        <th className="funcion">
                            <Tooltip title= "Borrar">
                                <DeleteIcon />
                            </Tooltip>
                        </th>
                        <th className="funcion">
                            <Tooltip title= "Editar">
                                <EditIcon />
                            </Tooltip>
                        </th>  
	                </tr>
                </thead>
	            <tbody>
	                {categoriasHtml}
	            </tbody>
	        </table>
            <div className="modal">
				{editar}               
			</div>
            <div className="modalVerLibros">			
                {verLibros}
			</div>
		</div>
    );
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(CategoriaList);