
	export const create=(userId,token,post)=>{
		
	return fetch(`https://saif-social-api.herokuapp.com/post/new/${userId}`,{
			method:"POST",
			headers:{
				Accept:"aplication/json",
				"Authorization":`Bearer ${token}`

			},
			body:post
		}).then(response=>{

			return response.json()

})
	}

		export const list=()=>{
	return fetch(`https://saif-social-api.herokuapp.com/postings`,{
			method:"GET",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json"
				

			}
		}).then(response=>{
			return response.json()

})
	}

			export const post=(postId)=>{
	return fetch(`https://saif-social-api.herokuapp.com/posts/${postId}`,{
			method:"GET",
			headers:{
				Accept:"aplication/json",
				"Content-Type":"aplication/json"
				

			}
		}).then(response=>{
			return response.json()

})
	}



	export const remove=(postId,token)=>{
	return fetch(`https://saif-social-api.herokuapp.com/posts/${postId}`,{
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
	

		export const update=(postId,token,post)=>{
	
	return fetch(`https://saif-social-api.herokuapp.com/posts/${postId}`,{
			method:"PUT",
			headers:{
				Accept:"aplication/json",
				"Authorization":`Bearer ${token}`

			},
			body:post
		}).then(response=>{

			return response.json()

})
	}


		export const like=(userId,token,postId)=>{
		
	return fetch(`https://saif-social-api.herokuapp.com/post/like`,{
			method:"PUT",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json",
				Authorization:`Bearer ${token}`

			},
			body:JSON.stringify({userId,postId})
		}).then(response=>{

			return response.json()

})
	}

			export const unlike=(userId,token,postId)=>{
		
	return fetch(`https://saif-social-api.herokuapp.com/post/unlike`,{
			method:"PUT",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json",
				Authorization:`Bearer ${token}`

			},
			body:JSON.stringify({userId,postId})
		}).then(response=>{

			return response.json()

})
	}



			export const comment=(userId,token,postId,comment)=>{
		
	return fetch(`https://saif-social-api.herokuapp.com/post/comment`,{
			method:"PUT",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json",
				Authorization:`Bearer ${token}`

			},
			body:JSON.stringify({userId,postId,comment})
		}).then(response=>{

			return response.json()

})
	}


			export const uncomment=(userId,token,postId,comment)=>{
		
	return fetch(`https://saif-social-api.herokuapp.com/post/uncomment`,{
			method:"PUT",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json",
				Authorization:`Bearer ${token}`

			},
			body:JSON.stringify({userId,postId,comment})
		}).then(response=>{

			return response.json()

})
	}

