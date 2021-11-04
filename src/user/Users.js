import React, {Component} from "react"
import {Link} from "react-router-dom"

import {list} from "./apiUser.js"
import "./css/users.css"
import ava from "./css/xx.png"
class Users extends Component{
	state={
		users:[]
		
	}

	componentDidMount(){
		// const {userId}=this.props.match.params
		list().then(data=>{
			if(data.error){
				 return console.log(data.error)
				 // return this.setState({redirectToSignin:true})
			}
			this.setState({users:data})
		
				
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
				</div>
			
		</div>

			)
	})}

				
</div>
)
	render(){
		const {users}=this.state
		return(
			<div className="users-class">
				<div className="users-class1">
			<h1>Users</h1>
			{this.tt(users)}
		
			
			
			
			</div>
			</div>
			)
	}
}
export default Users