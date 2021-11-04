import axios from "axios";
// const searchImages=(term)=>{

// }
 export default axios.create({
	baseURL:"https://api.unsplash.com",
	headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json",
				"Authorization":`Bearer ${token}`

			},

})