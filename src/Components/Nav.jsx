import React from 'react';
import { Link } from "react-router-dom";

export default function Nav () {


	return(
		<>
			<nav id="nav">
				<ul>
					<li><Link to ={"/home"}><h1>Biblioteca</h1></Link></li>
					<li><Link to ={"/categoria"}><h1>Categoria</h1></Link></li>
					<li><Link to ={"/personas"}><h1>Personas</h1></Link></li>
				</ul>
			</nav> 
			<div className='clear' />
			
		</>
	);

}