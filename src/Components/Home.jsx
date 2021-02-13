import React, {Component, useState, useEffect} from 'react'
import axios from 'axios';
import Aside from './Aside';
import { connect } from 'react-redux';


function Home (props) {

	console.log(props.auth)


		return(
			<>
				<Aside />

			</>
		);
}

const mapStateToProps = (state) =>{
	return {auth: state}
}

export default connect(mapStateToProps, null)(Home);