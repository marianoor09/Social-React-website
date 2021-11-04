import React, {Component} from "react"
import {post,update} from "./apiPost.js"

import ava from "./def.jpg"
import {Link,Redirect} from "react-router-dom"
import {isAuthenticate} from "../auth"



class EditPost extends Component{
	state={
		id:"",
		title:"",
		body:"",
		redirectToProfile:false,
		error:"",
		fileSize:0

	}





	componentDidMount=()=>{
	const {postId}=this.props.match.params
	this.postData= new FormData()
	post(postId)
	.then(data=>{
		if (data.error){
			return console.log(data.error)
		}
		this.setState({
			id:data._id,
			title:data.title,
			body:data.body
		})
	})
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
const {postId}=this.props.match.params
	const token=isAuthenticate().token

	 update(postId,token,this.postData)


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


		updateForm=(title,body)=>{
		return(
			<form  onSubmit={this.handleSubmit}>
			<div className="signup-field">
				<label style={{display:"block",fontSize:"23px",fontWeight:"bolder"
				,textShadow:"0px 2px 15px rgba(0,0,0,0.7)"}}
				htmlFor="">Post Photo</label>
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
			>Update</button>
				</form>
			)
	}




	render(){
		const {id,title,error,body,redirectToProfile}=this.state
		if(redirectToProfile){
			return <Redirect to={`/user/${isAuthenticate().user._id}`}/>
		}


const photoUrl=id ?`https://saif-social-api.herokuapp.com/post/photo/${id}?${new Date().getTime()}`:ava
		return(
			<div className="editpost">
		<h3>title</h3>


		<div 
          className="alert"
          style={{width:"50%",textAlign:"center", display: error ? "" : "none" }}
        >
          {error}
        </div>
       <div className="card-topp">
       	 <img src={photoUrl} 
       	 onError={i=>{i.target.src=`${ava}`}}/>
       </div>

		{this.updateForm(title,body)}
			</div>
			)
	}
}
export default EditPost
