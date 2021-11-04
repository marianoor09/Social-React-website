import  React,{useRef,Component} from "react"
import {Link,withRouter} from "react-router-dom"
import './Menu.css';
import {signout,isAuthenticate} from "../auth"


const isActive=(history,path)=>{
		if(history.location.pathname===path){
			return {color:"#fff",textDecoration:'underline',fontSize: "15px",fontStyle:"italic",
			boxShadow: "3px 2px 23px rgba(244,244,244,1)",padding:'2px',
			textShadow:"0px 2px 22px #b3126a"}
		}
		return {color :"#fff"}

	}

const Menu= ({history})=>{
	const clicked=useRef(null)
	const cl=useRef(null)
function handleClick() {
		clicked.current.classList.toggle("mob-navbarrr")

		// clicked1.current.style.display = 'block'
		console.log(cl)
		
	}

	



	return(
		<div >

		<ul ref={clicked} className="navbar">
		<Link className=" navbar-linka" ref={cl}  style={isActive(history,"/")} to="/">HOME</Link>
			<Link className=" navbar-link" style={isActive(history,"/post/create")} to="/post/create">Create Post</Link>
		<Link className=" navbar-link" style={isActive(history,"/findpeople")} to="/findpeople">find People</Link>
		<Link className="  navbar-link" style={isActive(history,"/users")} to="/users">Users</Link>

		{isAuthenticate() && isAuthenticate().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
        >
            Admin
        </Link>
    </li>
)}

		
		{!isAuthenticate()?<><Link className="navbar-link" to="/signup"
				style={isActive(history,"/signup")}
				>
				<i className="fas fa-sign-in-alt"></i>
		
				Signup</Link>
				<Link className="navbar-link" to="/signin"
				style={isActive(history,"/signin")}>
				<i className="fas fa-user-plus"></i>Signin</Link></>
				:""}


{
	isAuthenticate()?
		<>
		<p className="navbar-link" 
		onClick={()=>signout(()=>history.push("/"))}

		style={isActive(history,"/signout")}


		>Signout</p>
		<Link to={`/user/${isAuthenticate().user._id}`}>
		
		<p style={isActive(history,`/user/${isAuthenticate().user._id}`)}
		className="navbar-link"><i className="fas fa-user-ninja"></i>
		
		
		{`${isAuthenticate().user.name}'s profile`}
			

		</p>
		</Link>

	
		</>
		:
		""}
		<div onClick={handleClick} className="navbar-span">
			<span>__</span>
			<span>__</span>
			<span>__</span>
		</div>
			


		</ul>

		</div>
		)
}


export default withRouter(Menu)