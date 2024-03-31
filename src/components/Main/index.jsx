import styles from "./styles.modules.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const user = localStorage.getItem("token");
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('https://iot-project-server.onrender.com/api/fetchData', {
			headers: {
				'Authorization': `Bearer ${user}`
			}
		})
		.then(response => {
			setData(response.data);
			console.log(data);
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
	}, []);

	return (
		<div className="main_container">
			<div className="main_container"></div>
			<nav className="navbar">
				<h1>Welcome {data.name}!</h1>
				<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div>
				<Container className="box">
					<Row>
						<Col sm={4} className="row_title">Name:</Col>
						<Col sm={8}>{data.name}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">Phone No:</Col>
						<Col sm={8}>{data.phoneNo}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">Email:</Col>
						<Col sm={8}>{data.email}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">LinkedIn Link:</Col>
						<Col sm={8}>{data.linkedIn}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">Bio:</Col>
						<Col sm={8}>{data.Bio}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">Resume Link:</Col>
						<Col sm={8}>{data.resume}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">User ID:</Col>
						<Col sm={8}>{data.user_id}</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} className="row_title">My Connections:</Col>
						<Col sm={8}><Link to={'/connections'}>Click Here to see people you interacted with.</Link></Col>
					</Row>
					<hr/>
				</Container>
			</div>
		</div>
	);
};

export default Main;