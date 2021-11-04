import axios from "axios";

export const read=(userId,token)=>{
	return fetch(`https://saif-social-api.herokuapp.com/user/${userId}`,{
			method:"GET",
			headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json",
				"Authorization":`Bearer ${token}`

			}
		}).then(response=>{
			return response.json()

})
	}

	export const update=(userId,token,usera)=>{
		console.log(usera)
	return fetch(`https://saif-social-api.herokuapp.com/user/${userId}`,{
			method:"PUT",
			headers:{
				Accept:"aplication/json",
				"Authorization":`Bearer ${token}`

			},
			body:usera
		}).then(response=>{

			return response.json()

})
	}

	// export const updatee=(token)=>{
		
	// return axios.create({
	// 	baseURL:"http://localhost:8080",
	// 	headers:{
	// 			Accept:"aplication/json",
	// 			"Content-Type":"aplication/json",
	// 			"Authorization":`Bearer ${token}`

	// 		}


	// })
	
	// }


export const updatedUser=(user,next)=>{
	if(typeof window !=="undefined"){
		if(localStorage.getItem("jwt")){
			let auth=JSON.parse(localStorage.getItem("jwt"))
			auth.user=user
			localStorage.setItem("jwt", JSON.stringify(auth))
			next()

		}
	}
} 




	export const remove=(userId,token)=>{
	return fetch(`https://saif-social-api.herokuapp.com/user/${userId}`,{
			method:"DELETE",
			headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json",
				"Authorization":`Bearer ${token}`

			}
		}).then(response=>{
			return response.json()

})
	}
	
	

	export const list=()=>{
	return fetch(`https://saif-social-api.herokuapp.com/users`,{
			method:"GET",
			headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json"
				

			}
		}).then(response=>{
			return response.json()

})
	}


export const follow = (userId, token, followId) => {
	console.log(userId)
	console.log(followId)
    return fetch(`https://saif-social-api.herokuapp.com/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unfollow = (userId, token, unfollowId) => {
    return fetch(`https://saif-social-api.herokuapp.com/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const findPeople=(userId,token)=>{
	return fetch(`https://saif-social-api.herokuapp.com/user/findpeople/${userId}`,{
			method:"GET",
			headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json",
				"Authorization":`Bearer ${token}`

			}
		}).then(response=>{
			return response.json()

})
	}

		export const listByUser=(userId,token)=>{
	return fetch(`https://saif-social-api.herokuapp.com/posts/by/${userId}`,{
			method:"GET",
			headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json",
				"Authorization":`Bearer ${token}`
				

			}
		}).then(response=>{
			return response.json()

})
	}