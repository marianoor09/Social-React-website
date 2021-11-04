import React, {Component} from "react"
import "./Signup.css"
import log from "./mm.gif"
import {Link} from "react-router-dom"
import {signUser} from "../auth"


class Signup extends Component{
	state={
		name:"",
		email:"",
		password:"",
		error:"",
		open:false
	}
	handleChange=(name)=>(event)=>{
		this.setState({
			[name]:event.target.value
		})
		this.setState({
				error:"",
				open:false
			})

	}
	handleSubmit=(event)=>{
		event.preventDefault()
		const {name,email,password}=this.state
		const user={
			name,
			email,
			password
		}

		console.log(user)
		signUser(user)
		.then(data=>{
			if (data.error){
				console.log(data.error)
				return this.setState({
					error:data.error
				})
			}

			this.setState({
		name:"",
		email:"",
		password:"",
		error:"",
		open:true

			})
		})
	}

		signupForm=(name,email,password)=>{
		return(
			<form  onSubmit={this.handleSubmit}>
				<h2>Get Started</h2>
			<div className="signup-field">
				<input type="text" placeholder="name"
				onChange={this.handleChange("name")}
				value={name}

				/>
			</div>
			<div className="signup-field">
				<input placeholder="email" type="email"
				onChange={this.handleChange("email")}
				value={email}/>
			</div>
			<div className="signup-field">
				<input placeholder="password" type="password"
				onChange={this.handleChange("password")}
				value={password}/>
			</div>
			<button className="btn-signup"
			>Signup</button>
				</form>
			)
	}

	render(){
		const {error,name,email,password}=this.state
		return(
			<div className="form-signup">
			<div className="form2-signup">
			<div className="form-sidebar">
					<h3>.......</h3>
					<img   alt=""/>
				</div>

				<div className="forms-signup">
				<div className="alert" style ={{display:error ? "" :"none"}}>
				{error}
					
				</div>
				<div className="alertt" style ={{display:this.state.open ? "" :"none"}}>
				HEY!! WELCOME to best SOCIAL NETWORK SIGNIN AND ENJOY..
				<Link to="/SIGNIN">SIGNIN</Link>
					
				</div>
					{this.signupForm(name,email,password)}
				</div>
				
				
			</div>

			</div>
			)
	}
}
export default Signup