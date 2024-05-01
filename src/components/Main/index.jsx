import styles from "./styles.modules.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { BsFillTelephoneFill, BsLinkedin, BsEnvelope, BsFileEarmarkPdf } from "react-icons/bs";

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
			<div className="upc">
				<div className="gradient"></div>
				<div className="profile-down">
					<img src={data.image}/>
					<div className="profile-title">{data.name}</div>
					<div className="profile-description">
						<BsFillTelephoneFill /> {data.phoneNo}
						<br/>
						<BsEnvelope/> {data.email}
						<br/>
						<BsLinkedin /> <a href={data.linkedIn} target="_blank">{data.linkedIn}</a>
						<br/>
						<BsFileEarmarkPdf/> <Link to={data.resume} target="_blank">{data.resume}</Link>
						<br/><br/>
						{data.Bio}
					</div>
					<div className="profile-button"><a className="connection-link" href={'/connections'}>Connections</a></div>
				</div>
				{/* <Container className="box">
					<img width={200} height={200} src={data.image}/>
					<h1>{data.name}</h1>
					<BsFillTelephoneFill /> {data.phoneNo}
					<br></br>
					<BsEnvelope/> {data.email}
					<br/>
					<BsLinkedin /> <a href={data.linkedIn} target="_blank">{data.linkedIn}</a>
					<br/>
					<BsFileEarmarkPdf/> <Link to={data.resume} target="_blank">{data.resume}</Link>
					<br/>
					<h3>{data.Bio}</h3>
					<Link to={'/connections'}>Click Here to see people you interacted with.</Link>
				</Container> */}
			</div>
		</div>
	);
};

export default Main;
