import React from 'react';

export default function Nav () {


	return(
		<>
			<nav id="nav">
				<ul>
					<li><a href="/biblioteca"><h1>Biblioteca</h1></a></li>
					<li><a href="categoria"><h1>Categoria</h1></a></li>
					<li><a href="personas"><h1>Personas</h1></a></li>
				</ul>
			</nav> 
			<div clasName='clear' />
		</>
		);
}
