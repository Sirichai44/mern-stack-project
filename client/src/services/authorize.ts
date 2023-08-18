// save token & username => session storage

export const authenticate = (response:any, next: () => void) => {
    if (typeof window !== "undefined") {
        //save to session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("username", JSON.stringify(response.data.username));
    }
    next();
};

//ดึงข้อมูล token
export const getToken = () =>{
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token");
            return token ? JSON.parse(token) : null;
        }
    }
}

//ดึงข้อมูล user
export const getUser = () =>{
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem("username")){
            const username = sessionStorage.getItem("username");
            return username ? JSON.parse(username) : null;
        }
    }
}

//logout
export const logout = (next: () => void) =>{
    if(typeof window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    next()
}