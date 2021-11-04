import React, {Component} from "react"
import {Link} from "react-router-dom"
import {isAuthenticate} from "../auth"

import {findPeople,follow} from "./apiUser.js"
import "./css/users.css"
import ava from "./css/xx.png"
class FindPeople extends Component{
	state={
		users:[],
		error:"",
		open:false,
		messageText:""


		
	}

	componentDidMount(){
		 const userId=isAuthenticate().user._id
	
	const token=isAuthenticate().token
		findPeople(userId,token).then(data=>{
			if(data.error){
				 return console.log(data.error)
				 // return this.setState({redirectToSignin:true})
			}
			this.setState({users:data})
		
				
	})
}
clickFollow=(user,i)=>{
	const userId=isAuthenticate().user._id
	
	const token=isAuthenticate().token
	follow(userId,token,user._id)
	.then(data=>{
			if(data.error){
				 return this.setState({error:data.error})
			}
			let toFollow=this.state.users
			toFollow.splice(i, 1)
			this.setState({
				users:toFollow,
				open:true,
				messageText:`Following ${user.name}`
			})


})
}


tt=(users)=>(
<div className="card">
			{users.map((user,i)=>{
				
		return(
		<div className="card-col">
		<div className="card-top">
			<img src={`https://saif-social-api.herokuapp.com/user/photo/${user._id}`} alt={user.name}
			onError={i=>{i.target.src=`${ava}`}}/>
		</div>
			<div className="card-body" key={i} >
					<p className="card-title">{user.name}</p>
					<hr/>
					<p className="card-text">{user.email}</p>
					<Link to={`user/${user._id}`} className="users-bttn">View Profile</Link>
					<button onClick={()=>this.clickFollow(user,i)} className="follow-user
					">Follow</button>
				</div>
			
		</div>

			)
	})}

				
</div>
)
	render(){
		const {users,open,messageText}=this.state
		return(
			<div className="users-class">
				<div className="users-class1">
			<h1>People To Know</h1>
			{open &&<div className="bbbbb"><p>{messageText}</p></div>}

			{this.tt(users)}
			
		
			
		
			
			</div>
			</div>
			)
	}
}
export default FindPeople