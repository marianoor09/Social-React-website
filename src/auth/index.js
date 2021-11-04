export const signUser=(user)=>{
		return fetch("https://saif-social-api.herokuapp.com/signup",{
			method:"POST",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		}).then((response)=>{
			return response.json()
		}).catch(err=>console.log(err))


	}
	export const signinUser=(user)=>{
		return fetch("https://saif-social-api.herokuapp.com/signin",{
			method:"POST",
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		}).then((response)=>{
			return response.json()
		}).catch(err=>console.log(err))


	}

	export const  signout=async(next)=>{
	if(typeof window !=="undefined"){
			localStorage.removeItem("jwt")
			next()
		return await fetch("https://saif-social-api.herokuapp.com/signout",{
			method:"GET"

		}).then(response=>{
			console.log(response)
			return response.json()
		}).catch(err=>{
			console.log(err)
		})

}
}
export const isAuthenticate=()=>{
	if(typeof window =="undefined"){
		return false
	}
	if(localStorage.getItem("jwt")){
		return JSON.parse(localStorage.getItem("jwt"))
	}
	return false

}

export const socialLogin = user => {
    return fetch(`https://saif-social-api.herokuapp.com/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`https://saif-social-api.herokuapp.com/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`https://saif-social-api.herokuapp.com/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
