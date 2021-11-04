import React, {Component} from "react"
import {Redirect,Link} from "react-router-dom"
import {isAuthenticate} from "../auth"
import {create} from "./apiPost.js"


class NewPost extends Component{



state={
		title:"",
		body:"",
		photo:"",
		error:"",
		redirectToProfile:false,
		 fileSize: 0,
		 loading:false,
		 user:{

		 }	
	}






	componentDidMount(){
		this.postData= new FormData()
		this.setState({
			user:isAuthenticate().user
		})
		
		
				//console.log("userId: "+this.props.match.params.userId)
	}
	handleChange=name=>(event)=>{
		const value=name==="photo"?event.target.files[0]:event.target.value
		const fileSize=name==="photo"?event.target.files[0]:0
		this.postData.set(name,value)
		this.setState({
			[name]:value,fileSize
		})

	}


 isValid = () => {
 	  const { title,body,fileSize } = this.state;
 	if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }


    if (title.length === 0) {
      this.setState({ error: "title is required", loading: false });
      return false;
    }
     if (title.length < 4) {
      this.setState({ error: "title should be at least 4 character", loading: false });
      return false;
    }
    if (title.length > 60) {
      this.setState({ error: "title should be greater than 60  character", loading: false });
      return false;
    }
      if (body.length === 0) {
      this.setState({ error: "body is required", loading: false });
      return false;
    }
     
 
   
    return true;
  }



handleSubmit=(event)=>{
	const {title,body}=this.state
	event.preventDefault()
	
	if(this.isValid()){
	const userId=isAuthenticate().user._id
	const token=isAuthenticate().token
	 console.log(userId)
	 create(userId,token,this.postData)


	.then(data=>{
		console.log(data)
			if(data.error){
				 console.log(data.error)
				 return this.setState({error:data.error})
			}
			console.log(data)
					this.setState({title:"",body:"",redirectToProfile:true})
		
	

}

)}
}


		createForm=(title,body)=>{
		return(
			<form  onSubmit={this.handleSubmit}>
			<div className="signup-field">
				<label style={{display:"block",fontSize:"23px",fontWeight:"bolder"
				,textShadow:"0px 2px 15px rgba(0,0,0,0.7)"}}
				htmlFor=""> Photo</label>
				<input className="file" type="file"  accept="image/*"
				onChange={this.handleChange("photo")}
				

				/>
			</div>
			
			<div className="signup-field">

				<input type="text" placeholder="title"
				onChange={this.handleChange("title")}
				value={title}

				/>
			</div>

				<div className="signup-fieldd">

				<textarea type="text" placeholder="body"
				onChange={this.handleChange("body")}
				value={body}

				/>
			</div>
			<button className="btn-signup"
			>Create</button>
				</form>
			)
	}




	render(){

		const {redirectToProfile,title,body,error,user}=this.state
		
		if(redirectToProfile){
			return <Redirect to={`/user/${user._id}`}/>
		}


		return (
			<div className="container">
			<h2 style={{marginTop:"63px"}}>Create A Post </h2>
			<div 
          className="alert"
          style={{width:"50%",textAlign:"center", display: error ? "" : "none" }}
        >
          {error}
        </div>
      
				{this.createForm(title,body)}
			

			</div>


			)
	}
}
export default NewPost