import  React, {Component} from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Home from "./core/Home.js"
import Menu from "./core/Menu.js"
import Signup from "./signup/Signup.js"
import Signin from "./signin/Signin.js"
import Profile from "./user/Profile.js"
import Users from "./user/Users.js"
import EditProfile from "./user/EditProfile.js"
import PrivateRoute from "./auth/PrivateRoute.js"
import FindPeople from "./user/FindPeople.js"
import NewPost from "./post/NewPost.js"
import GetPost from "./post/GetPost.js"
import EditPost from "./post/EditPost.js"
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from './admin/Admin'



class MainRouter extends Component{
	render(){
		return(
			
			<BrowserRouter>
			<Menu/>
				<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/users" component={Users} />

				<PrivateRoute
				 exact path="/findpeople" component={FindPeople}

				/>

				
					
				<PrivateRoute exact path="/admin" component={Admin} />
				<Route exact path="/signup" component={Signup} />

				<Route exact path="/forgot-password" component={ForgotPassword} />
				<Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
				
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/user/:userId" component={Profile} />
				<Route exact path="/user/edit/:userId" component={EditProfile} />
				<PrivateRoute
				 exact path="/post/create" component={NewPost}

				/>
				<Route exact path="/post/:postId" component={GetPost} />
				<PrivateRoute
				 exact path="/post/edit/:postId" component={EditPost}

				/>
					
			</Switch>
			</BrowserRouter>
				
		
			)
	}
}
export default MainRouter