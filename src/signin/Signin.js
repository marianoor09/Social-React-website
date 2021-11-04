import React, {Component} from "react"
import "./Signin.css"
import {Link ,Redirect} from "react-router-dom"
import {signinUser} from "../auth"
import SocialLogin from "../user/SocialLogin";



class Signin extends Component{
	state={
		
		email:"",
		password:"",
		error:"",
		redirectToRef:false
		
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
	authenticate(jwt,next){
		if(typeof window !=="undefined"){
			localStorage.setItem("jwt",JSON.stringify(jwt))
			next()
		}

	}
	handleSubmit=(event)=>{
		event.preventDefault()
		const {email,password}=this.state
		const user={
			
			email,
			password
		}

		console.log(user)
		signinUser(user)
		.then(data=>{
			if (data.error){
				console.log(data.error)
				return this.setState({
					error:data.error
				})
			}

			this.authenticate(data,()=>{
				this.setState({
					redirectToRef:true
				})
			})
		})
	}

	
	signupForm=(email,password)=>{
		return(
			<form  onSubmit={this.handleSubmit}>
				<h2>Get Signin</h2>
								
		
			
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
			>Signin</button>
			
 {  <SocialLogin />}


				</form>
			)
	}

	render(){
		const {error,email,password,redirectToRef}=this.state
		if(redirectToRef){
			return <Redirect to="/"/>
		}
		return(
			<div className="form-signup">
			<div className="form2-signup">
			<div className="formz-sidebar">
					<h3>.......</h3>
					<img   alt=""/>
				</div>

				<div className="forms-signup">
				<div className="alert" style ={{display:error ? "" :"none"}}>
				{error}
					
				</div>
				
					{this.signupForm(email,password)}
					<p >
   <Link to="/forgot-password" className="vvb">
       {" "}
       Forgot Password
   </Link>
</p>
			</div>
				
				
			</div>

			</div>
			)
	}
}
export default Signin