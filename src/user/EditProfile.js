import React, {Component} from "react"
import {read} from "./apiUser.js"
import {Redirect,Link} from "react-router-dom"
import {isAuthenticate} from "../auth"
import {update,updatedUser} from "./apiUser.js"
import ava from "./css/xx.png"

class EditProfile extends Component{



state={
		id:"",
		email:"",
		name:"",
		password:"",
		redirectToSignin:false,
		error:"",
		redirectToProfile:false,
		 fileSize: 0,
		 loading:false,
		 about:""
	}


init=(userId)=>{
	const token=isAuthenticate().token
	read(userId,token)
	.then(data=>{
			if(data.error){
				 console.log(data.error)
				 return this.setState({redirectToSignin:true})
			}
			this.setState({
				id:data._id,
				email:data.email,
				name:data.name,
				error:"",
				about:data.about})
	

}
)}






	componentDidMount(){
		this.userData= new FormData()
		const {userId}=this.props.match.params
		this.init(userId)
		
				//console.log("userId: "+this.props.match.params.userId)
	}
	handleChange=name=>(event)=>{
		const value=name==="photo"?event.target.files[0]:event.target.value
		const fileSize=name==="photo"?event.target.files[0]:0
		this.userData.set(name,value)
		this.setState({
			[name]:value,fileSize
		})

	}


 isValid = () => {
 	  const { name, email, password, fileSize } = this.state;
 	if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }


    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
     if (name.length < 4) {
      this.setState({ error: "Name should be at least 4 character", loading: false });
      return false;
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false;
    }
    return true;
  }



handleSubmit=(event)=>{
	const {name,email,password}=this.state
	event.preventDefault()
	const user=JSON.stringify({
		
		name,
		email,
		password:password || undefined

	})
	if(this.isValid()){
	const {userId}=this.props.match.params
	const token=isAuthenticate().token
// console.log(user)
	 update(userId,token,this.userData)

	.then(data=>{
		console.log(data)
			if(data.error){
				 console.log(data.error)
				 return this.setState({error:data.error})
			}
			updatedUser(data,()=>{
					this.setState({redirectToProfile:true})

			})
		
	

}

)}
}


		signupForm=(name,email,password,about)=>{
		return(
			<form  onSubmit={this.handleSubmit}>
			<div className="signup-field">
				<label style={{display:"block",fontSize:"23px",fontWeight:"bolder"
				,textShadow:"0px 2px 15px rgba(0,0,0,0.7)"}}
				htmlFor="">Profile Photo</label>
				<input className="file" type="file"  accept="image/*"
				onChange={this.handleChange("photo")}
				

				/>
			</div>
			
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
				value=""/>
			</div>
			<div className="signup-fieldd">

				<textarea type="text" placeholder="about"
				onChange={this.handleChange("about")}
				value={about}

				/>
			</div>
			<button className="btn-signup"
			>Update</button>
				</form>
			)
	}




	render(){

		const {redirectToSignin,error,id,redirectToProfile,name,email,password,about}=this.state
		if(redirectToSignin){
			return <Redirect to="/signin"/>
		}
		if(redirectToProfile){
			return <Redirect to={`/user/${id}`}/>
		}

const photoUrl=id ?`https://saif-social-api.herokuapp.com/user/photo/${id}?${new Date().getTime()}`:ava
		return (
			<div className="container">
			<h2 style={{marginTop:"63px"}}>Edit  Profile</h2>
			<div 
          className="alert"
          style={{width:"50%",textAlign:"center", display: error ? "" : "none" }}
        >
          {error}
        </div>
       <div className="card-topp">
       	 <img src={photoUrl} alt={name}
       	 onError={i=>{i.target.src=`${ava}`}}/>
       </div>

			

				{this.signupForm(name,email,password,about)}
			

			</div>


			)
	}
}
export default EditProfile