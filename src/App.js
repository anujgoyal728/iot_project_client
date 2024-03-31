import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Connection from "./components/Connections";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/iot_project_client/" exact element={<Main />} />}
			<Route path="/iot_project_client/signup" exact element={<Signup />} />
			<Route path="/iot_project_client/login" exact element={<Login />} />
			<Route path="/iot_project_client/" element={<Navigate replace to="/iot_project_client/login" />} />
			<Route path="/iot_project_client/connections" exact element={<Connection />}/>
		</Routes>
	);
}

export default App;