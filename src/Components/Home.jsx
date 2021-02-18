import React from 'react';
import { connect } from 'react-redux';

import Biblioteca from './Biblioteca';
import Nav from './Nav';



export default function Home (props) {

		return(
			<>
				<Nav />
				<Biblioteca />
			</>

		);
	}

