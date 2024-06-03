import react , {createContext, useContext, useState} from 'react'
const ApiContext = createContext();
export const ApiProvider = ({ children })=>{
    const YOUR_PERSONAL_TOKEN = 'malikaleemraza';

    //Auth Check State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // 1)User Register Api
    const RegisterApi = async(register)=>{
        const {name,email,password,passwordConfirm,lastname,location} = register;
        try{
            const res = await fetch('http://127.0.0.1:8080/api/v1/user/sigup', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${YOUR_PERSONAL_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    passwordConfirm:passwordConfirm,
                    lastname:lastname,
                    location:location
                })
            });
            const res_data = await res.json();
            console.log(res_data)
            if (res.ok) {
                const { token } = res_data;
                console.log('Received token:', token);
                localStorage.setItem('token', token);
                // Show success message and redirect or any other logic
                return { success: true, token };
            } else {
                console.error('Signup failed:', res_data.error);
                return { success: false, error: res_data.error };
            }
        }catch(eror){
            console.error('Error:', eror);
            return { success: false, error: eror.message };
        }
    };
    // 2) Login Api
    const LoginApi = async(login)=>{
        const {email, password} = login;
        try{
            const res  = await fetch('http://127.0.0.1:8080/api/v1/user/login',{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${YOUR_PERSONAL_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            })
            const res_data = await res.json();
            if(res.ok){
                const { token } = res_data;
                localStorage.setItem('token', token);
                setIsAuthenticated(true)
                console.log('login successfully !')
                return { success: true};
            }else{
                console.log('login Failed!', res_data.error)
                return { success: false, error: res_data.error };
            }
        }catch(error){
            console.error('Error', error)
            return { message: false , error: error.message}
        }
    }
    //3) Logout Api

    const LogoutAPI = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:8080/api/v1/user/logout',{
                method:"GET",
                headers:{
                 'Content-Type': 'application/json',
                }
            })
            if(res.ok){
                localStorage.removeItem('token')
                setIsAuthenticated(false)
                return {success:true};
            }else{
                console.error('Failed to logout:', res);
                return { success: false, message: 'Failed to logout' };
            }
        }catch(error){
            console.error("Error:", error);
            return { success: false, error: error.message };
        }

    }

    return (
        <ApiContext.Provider value={{isAuthenticated,RegisterApi,LoginApi, LogoutAPI}}>
            {children}
        </ApiContext.Provider>
    )
}
export const useData = ()=>{
    const context = useContext(ApiContext)
    if(!context){
        throw new Error ("useData must be used within a API Privider")
    }
    return context;
};