import React, {Component} from "react"
import {post,remove,comment,uncomment} from "./apiPost.js"

import ava from "./def.jpg"
import {Link,Redirect} from "react-router-dom"
import {isAuthenticate} from "../auth"


class Comment extends Component{
	state={
		text:"",
		error:"",
		redirectToSignin:false,
		
	}

	

  handleChange = event => {
       
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 300) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    };



	handleSubmit=(e)=>{
		e.preventDefault()
		 if (!isAuthenticate()) {
            this.setState({ error: "Please signin to leave a comment" ,redirectToSignin:true});
            return false;
        }
         if (this.isValid()) {
		const userId=isAuthenticate().user._id
		const {token}=isAuthenticate()
		const postId=this.props.postId
		const comments={text:this.state.text}
		comment(userId,token,postId,comments).then(
			data=>{
				if(data.error){
					return console.log(data.error)
				}
				this.setState({
					text:""
				})
				this.props.updateComment(data.comments)

			})
	}


	}

	deleteComment=(comment)=>{
		const userId=isAuthenticate().user._id
		const {token}=isAuthenticate()
		const postId=this.props.postId
		
		uncomment(userId,token,postId,comment).then(
			data=>{
				if(data.error){
					return console.log(data.error)
				}
				
				this.props.updateComment(data.comments)

			})

}

	render(){
		const {comments}=this.props
		if(this.state.redirectToSignin){
			return <Redirect to="/signin"/>
		}
		return(

			<div className="comments">
			<h3 style={{textAlign:"left" ,paddingLeft :"6rem"}}>Leave A Comment</h3>
			<form action="" onSubmit={this.handleSubmit}>
			
				
				<input type="text" value={this.state.text} 
				onChange={this.handleChange}/>
			
			<button  className="send"><i class="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button>
			</form>
			

			<div className="follow-gridd">
			
					{comments.map((comment,i)=>{
					return(
						<div className="follow-arrayd" key={i}>
						<div className="follow-arraydd">
							<Link className="follow-linkk" to={`/user/${comment.postedBy._id}`}>
							<img src={`https://saif-social-api.herokuapp.com/user/photo/${comment.postedBy._id}?${new Date().getTime()}`} alt={comment.postedBy.name}
								onError={i=>{i.target.src=`${ava}`}}/>
								
													</Link>

						<h6>{comment.text}</h6>
						{/*<h5>{this.state.count}</h5>*/}
	

						</div>
						
						<p className="poster">


				on { new Date(comment.created).toDateString()}
				{isAuthenticate().user && isAuthenticate().user._id===comment.postedBy._id &&(<>
	<button onClick={()=>this.deleteComment(comment)} className="post-delete--button">Remove  </button>
	
	</>)}

}

				</p>
							
						</div>
						)
				})}
		</div>
		

			</div>
			)
	}
}
export default Comment
