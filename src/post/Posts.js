import React, {Component} from "react"
import {Link} from "react-router-dom"

import {list} from "./apiPost.js"
// import "./css/users.css"
import ava from "./def.jpg"
import './Posts.css';
class Posts extends Component{
	state={
		posts:[]
		
	}

	componentDidMount(){
		
		list().then(data=>{
			if(data.error){
				 return console.log(data.error)
				 // return this.setState({redirectToSignin:true})
			}
			this.setState({posts:data})
		
				
	})
}
tt=(posts)=>(
<div className="card">
			{posts.map((post,i)=>{
				const posterId=post.postedBy ? `/user/${post.postedBy._id}` :""
				const postername=post.postedBy? post.postedBy.name : " UNKOWN"
				
		return(
		<div className="card-col">
		<div className="card-top">
			<img src={`https://saif-social-api.herokuapp.com/post/photo/${post._id}?${new Date().getTime()}`} alt={post.title}
			onError={i=>{i.target.src=`${ava}`}}/>
		</div>
			<div className="card-body" key={i} >
					<p className="card-title">{post.title}</p>
					<hr/>
					<p className="card-text">{post.body.substring(0,100)+"...."}</p>
					<Link to={`post/${post._id}`} className="users-bttn">View Post</Link>
				</div>
				<p className="poster"><Link  to={`${posterId}`}>{postername}      </Link>

				on { new Date(post.created).toDateString()}
				</p>
				
			
		</div>

			)
	})}

				
</div>
)
	render(){
		const {posts}=this.state
		return(
			<div className="users-class">
				<div className="users-class1">
			<h1>Recents Posts</h1>
			{this.tt(posts)}
		
			
			
			
			</div>
			</div>
			)
	}
}
export default Posts