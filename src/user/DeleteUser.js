import React, {Component} from "react"
import './css/Profile.css';
import {isAuthenticate} from "../auth"
import {Redirect,Link} from "react-router-dom"
import {remove} from "./apiUser.js"
import ava from "./css/xx.png"

import {signout} from "../auth"

class DeleteUser extends Component{
	state={
		Redirectto:false
	}
	
	deleteAccount=()=>{
		const token=isAuthenticate().token
		const userId=this.props.userId
		remove(userId,token)
		.then(data=>{
			if(data.error){
				return console.log(data.error)
			}
			signout(()=>console.log("deleted"))
			this.setState({
				Redirectto:true
			})

		})
		
	}
	deleteConfirm=()=>{
		let answer=window.confirm(
			"Are you sure you wanna delete..")
	
	if(answer){
		this.deleteAccount()
		
	}
}
	render(){
		if(this.state.Redirectto){
			return(<Redirect to="/"/>
				)
		}
		return(
		<button onClick={this.deleteConfirm} className="delete-profile">Delete</button>
			)
	}
		


	}
	export default DeleteUser