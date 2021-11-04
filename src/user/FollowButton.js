import React, {Component} from "react"
import {follow,unfollow} from "./apiUser.js"


class FollowButton extends Component{
	onFollow=()=>{
			this.props.onClickButton(follow)

		}

		onunFollow=()=>{
			this.props.onClickButton(unfollow)

		}
	render(){
		
		return(
			<div className="c">
			{!this.props.following ? (

					<button onClick={this.onFollow} className="follow-button">Follow</button>


				) :(



					<button onClick={this.onunFollow} className="unfollow-button">Unfollow</button>
				)
		}
			
			
			</div>
			)
	}
}
export default FollowButton