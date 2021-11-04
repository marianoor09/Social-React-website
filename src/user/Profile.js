import React, {Component} from "react"
import './css/Profile.css';
import {isAuthenticate} from "../auth"
import {Redirect,Link} from "react-router-dom"
import {read,listByUser} from "./apiUser.js"
import ava from "./css/xx.png"
import DeleteUser from "./DeleteUser.js"
import FollowButton from "./FollowButton.js"
import ProfileTabs from "./ProfileTabs.js"




class Profile extends Component{
	state={
		user:{
			following:[],
			followers:[]
		},
		redirectToSignin:false,
		 following: false,
		error:"",
		posts:[]
	}


 checkFollow = user => {
    const jwt = isAuthenticate();
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

checkFollowButton=callApi=>{
	const userId=isAuthenticate().user._id
	
	const token=isAuthenticate().token
	callApi(userId,token,this.state.user._id)
	.then(data=>{
		if(data.error){
			console.log(data.error)
				 return this.setState({error:data.error})

		}
		  this.setState({ user: data, following: !this.state.following });
	})
}

init=(userId)=>{
	const token=isAuthenticate().token
	read(userId,token)
	.then(data=>{
			if(data.error){
				 console.log(data.error)
				 return this.setState({redirectToSignin:true})
			}
			
			let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id)
	

}
)}
	loadPosts=(userId)=>{
		const token=isAuthenticate().token
		listByUser(userId,token)
		.then(data=>{
			if(data.error){
				return console.log(data.error)
			}
			console.log(data)
			this.setState({
				posts:data
			})
		})

	}






	componentDidMount(){
		const {userId}=this.props.match.params
		this.init(userId)
		
				//console.log("userId: "+this.props.match.params.userId)
	}
	componentWillReceiveProps(props){
		const {userId}=props.match.params
		this.init(userId)
		
				
	}


	render(){
		const {redirectToSignin}=this.state
		if(redirectToSignin){
			return <Redirect to="/signin"/>
		}
		const photoUrl=this.state.user._id ?`https://saif-social-api.herokuapp.com/user/photo/${this.state.user._id}?${new Date().getTime()}`:ava

		return(
		<div>
				<div className="profile-block">

			<div style={{fontFamily:'lato'}} className="profile-container">
				<h2>Profile</h2>
			


			<div className="card-top">
			<img src={photoUrl} alt={this.state.user.name}
			onError={i=>{i.target.src=`${ava}`}}/>
		</div>
		<h6 style={{fontSize:"14px",fontWeight:"100",marginTop:"12px"}}><i class="fas fa-address-card"></i>   
		.. About me   <br/>{this.state.user.about}</h6>

			</div>
			<div className="profile-button">
			<h4 style={{fontSize:"22px",marginTop:"12px",fontWeight:"100"}}>
			<i style={{color:"teal"}} class="fa fa-user" aria-hidden="true"></i>  {this.state.user.name}</h4>
			<h4 style={{fontSize:"22px",marginTop:"12px",fontWeight:"100"}}>
			<i style={{color:"teal"}} class="fa fa-envelope" aria-hidden="true"></i>
			      {this.state.user.email}</h4>
			<h5 style={{fontSize:"22px",margin:"12px",fontWeight:"100"}}><i style={{color:"teal"}} class="fa fa-calendar" aria-hidden="true"></i>
			{` Joined ${new Date(this.state.user.created).toDateString()}`}</h5>

			{isAuthenticate().user && isAuthenticate().user._id===this.state.user._id?(
				<div className="profile-buttons">
					<Link to={`/user/edit/${this.state.user._id}`}>Edit Profile </Link>
					<DeleteUser userId={this.state.user._id}/>

				</div>)
			:(<FollowButton following={this.state.following}
			onClickButton={this.checkFollowButton}

			/>)
			
		}
		<div>
    {isAuthenticate().user &&
        isAuthenticate().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">
                        Admin
                    </h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                   <div className="profile-buttons">
					<Link to={`/user/edit/${this.state.user._id}`}>Edit Profile </Link>
					<DeleteUser userId={this.state.user._id}/>

				</div>

                </div>
            </div>
        )}
</div>

			</div>




			</div>
			
		<ProfileTabs followers={this.state.user.followers} following={this.state.user.following
			} posts={this.state.posts}/>

		</div>
			)
	}
	
}
export default Profile

	