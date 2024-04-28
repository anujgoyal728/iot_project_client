import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';


const Connection = () => {
    
    const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const user = localStorage.getItem("token");
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        const fetchAllUserData = async () => {
            try{ 
                const dataResponse = await axios.get('https://iot-project-server.onrender.com/api/fetchData', {
                    headers: {
                        'Authorization': `Bearer ${user}`
                    }
                });
                const data = await dataResponse.data;
                console.log(data);

                console.log(data.connection);
                const promises = data.connection.map(async user => {
                    console.log(user)
                    console.log(user.user_id)
                    const userResponse = await axios.get(`https://iot-project-server.onrender.com/api/fetchData/getuserData/${user.user_id}`)
                    console.log(userResponse.data)
                    const date = new Date(user.connected_at);
                    const beautifiedDate = date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    // Beautify the time using the toLocaleTimeString() method
                    const beautifiedTime = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    });
                    userResponse.data.connected_at = beautifiedDate + " " + beautifiedTime;
                    console.log(userResponse.data)
                    return userResponse.data;
                });
                const userDataArray = await Promise.all(promises);
                setConnections(userDataArray.filter(data => data !== null));

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
          
        // Call the function to fetch data for all users
        fetchAllUserData();
        console.log(connections)
		
	}, []);

	return (
		<div className="main_container">
			<div className="main_container"></div>
			<nav className="navbar">
				<h1>Your Connection List:</h1>
				<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
			</nav>
            <div>
                {connections.map(connection => (
                    <Container className="box">
                        <img width={200} height={200} src={connection.image}/>
					    <hr/>
                        <Row>
                            <Col sm={4} className="row_title">Name:</Col>
                            <Col sm={8}>{connection.name}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4} className="row_title">Phone No:</Col>
                            <Col sm={8}>{connection.phoneNo}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4} className="row_title">Email:</Col>
                            <Col sm={8}>{connection.email}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4} className="row_title">LinkedIn Link:</Col>
                            <Col sm={8}>{connection.linkedIn}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4} className="row_title">Bio:</Col>
                            <Col sm={8}>{connection.Bio}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4} className="row_title">Resume Link:</Col>
                            <Col sm={8}>{connection.resume}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4} className="row_title">Connected On:</Col>
                            <Col sm={8}>{connection.connected_at}</Col>
                        </Row>
                        <hr/>
                    </Container>
                ))}
            </div>
		</div>
	);
};

export default Connection;
