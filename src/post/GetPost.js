import React, {Component} from "react"
import {post,remove,like,unlike} from "./apiPost.js"

import ava from "./def.jpg"
import {Link,Redirect} from "react-router-dom"
import {isAuthenticate} from "../auth"
import Comment from "./Comment.js"
class GetPost extends Component{
state={
	post:"",
	redirectToHome:false,
	redirectToSignin:false,
	like:false,
	likes:0,
	comments:[]
}
componentDidMount=()=>{
	const {postId}=this.props.match.params
	post(postId)
	.then(data=>{
		if (data.error){
			return console.log(data.error)
		}
		this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments:data.comments
		})
	})
}
   likeToggle = () => {
        if (!isAuthenticate()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticate().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticate().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

   checkLike = likes => {
        const userId = isAuthenticate() && isAuthenticate().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };
deletePost=()=>{
	const {postId}=this.props.match.params
	const token=isAuthenticate().token
	remove(postId,token)
	.then(data=>{
		if (data.error){
			return console.log(data.error)
		}
		this.setState({
			redirectToHome:true
		})
	})

}




updateComment=(comments)=>{
	this.setState({
		comments
	})
}
renderPost=(post,comments)=>{
	const posterId=post.postedBy ? `/user/${post.postedBy._id}` :""
	const postername=post.postedBy? post.postedBy.name : " UNKOWN"
const posterid=post.postedBy ? `${post.postedBy._id}`:""
const {like,likes}=this.state


return(
		<div className="card-col1">
		<h2>{post.title}</h2>

		<div className="card-top1">
			<img src={`https://saif-social-api.herokuapp.com/post/photo/${post._id}?${new Date().getTime()}`} alt={post.title}
			onError={i=>{i.target.src=`${ava}`}}/>
		</div>
	<div className="likes-btn">
	<i style={{display:"inlineBlock",color :this.state.like ?"blue" :"grey"}}
	onClick={this.likeToggle} className="far fa-thumbs-up fa-2x" aria-hidden="true"></i>
		<h5 className="like-btn" >{likes} likes</h5>
		

	</div>
			<div className="card-body1" >
			
					<hr/>
					<p className="card-text1">{post.body}</p>
					<Link to={`/`} className="users-bttn">Back To Posts</Link>
				</div>
				<p className="poster"><Link  to={`${posterId}`}>{postername}      </Link>

				on { new Date(post.created).toDateString()}
				</p>
{isAuthenticate().user && isAuthenticate().user._id===posterid &&(<>
	<Link onClick={this.deletePost} className="post-delete--button"  to={``}>Delete   </Link>
	<Link  className="post-update--button" to={`/post/edit/${post._id}`}>Update or Edit      </Link>
	</>)

}
<div>
    {isAuthenticate().user &&
        isAuthenticate().user.role === "admin" && (
            <div class="card mt-5">
                <div className="card-body">
                    <h5 className="card-title">Admin</h5>
                    <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                    </p>
                    <Link
                        to={`/post/edit/${post._id}`}
                        className="post-update--button"
                    >
                        Update Post
                    </Link>
                    <button
                        onClick={this.deletePost}
                        className="post-delete--button"
                    >
                        Delete Post
                    </button>
                </div>
            </div>
        )}
</div>




<Comment className="comments" postId={post._id} comments={this.state.comments.reverse()} updateComment={this.updateComment}/>
				
			
		</div>

			)
}


	render(){
		const {post,redirectToHome,redirectToSignin,comments}=this.state
		if(redirectToHome){
			return <Redirect to="/"/>
		}


		if(redirectToSignin){
			return <Redirect to="/signin"/>
		}
		return(
			<div className="cardss">
						{this.renderPost(post,comments)}

						

			
			</div>
			)
	}
}
export default GetPost