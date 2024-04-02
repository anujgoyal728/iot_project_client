import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.modules.css";

const Signup = () => {
	const [data, setData] = useState({
		name: "",
		phoneNo: "",
		email: "",
		linkedIn: "",
		password: "",
		Bio: "",
		resume: "", 
		user_id: ""
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://iot-project-server.onrender.com/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left_signup">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sign in
						</button>
					</Link>
				</div>
				<div className="right_signup">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className="input"
						/>
						<input
							type="Number"
							placeholder="Phone No"
							name="phoneNo"
							onChange={handleChange}
							value={data.phoneNo}
							required
							className="input"
							minLength={10}
							maxLength={10}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Linkedin Link"
							name="linkedIn"
							onChange={handleChange}
							value={data.linkedIn}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Bio in less than 100 characters."
							name="Bio"
							onChange={handleChange}
							value={data.Bio}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Resume Link"
							name="resume"
							onChange={handleChange}
							value={data.resume}
							required
							className="input"
						/>
						<input
							type="Number"
							placeholder="8 digit User ID"
							name="user_id"
							onChange={handleChange}
							value={data.user_id}
							required
							className="input"
							minLength={8}
							maxLength={8}
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;