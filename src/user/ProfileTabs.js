import React, {Component} from "react"
import {Redirect,Link} from "react-router-dom"
import {read} from "./apiUser.js"
import ava from "./css/xx.png"

class ProfileTabs extends Component{
	
	render(){
		const {followers,following,posts}=this.props

		return(
			<div>
			<div className="follow">
			<div className="follow-col1">
				<h3>followers : {followers.length}</h3>
				
				<hr/>
		<div className="follow-grid">
			
					{followers.map((follower,i)=>{
					return(
						<div key={i}>
						<div className="follow-array">
							<Link className="follow-link" to={`/user/${follower._id}`}>
							<img src={`https://saif-social-api.herokuapp.com/user/photo/${follower._id}?${new Date().getTime()}`} alt={follower.name}
								onError={i=>{i.target.src=`${ava}`}}/>
								<h3>{follower.name}</h3>
													</Link>
	

						</div>
							
						</div>
						)
				})}
		</div>
			</div>
			<div className="follow-col2">
			<h3>following : {following.length}</h3>
			<hr/>


			<div className="follow-grid">
			
					{following.map((follower,i)=>{
					return(
						<div key={i}>
						<div className="follow-array">
							<Link className="follow-link" to={`/user/${follower._id}`}>
							<img src={`https://saif-social-api.herokuapp.com/user/photo/${follower._id}?${new Date().getTime()}`} alt={follower.name}
								onError={i=>{i.target.src=`${ava}`}}/>
								<h3>{follower.name}</h3>
													</Link>
								

						</div>
							
						</div>
						)
				})}
		</div>







			
				
			</div>
			<div className="follow-col3">
			<h3>Posts</h3>
			<hr/>
			{posts.map((post,i)=>{
					return(
						<div key={i}>
						<div className="follow-array">
							<Link className="follow-link" to={`/post/${post._id}`}>
						
								<h3>{post.title}</h3>
													</Link>
	

						</div>
							
						</div>
						)
				})}
				
			</div>
				
			</div>
			

			</div>			)
	}
}
export default ProfileTabs