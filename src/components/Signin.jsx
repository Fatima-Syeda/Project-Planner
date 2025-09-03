import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

const Signin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState("");

const {session, signInUser} = UserAuth();
const navigate = useNavigate();
console.log(session);


const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
        const result = await signInUser(email, password)

        if(result.success){
            navigate('/app')
        }
    } catch (err){
        setError("an error occured");    
    } finally{
        setLoading(false);
    }
};


    return(
        <div>
            <div id="app"><Header /></div>
            <form onSubmit={handleSignIn} className="max-w-md m-auto mt-24 bg-white border border-gray-300 rounded-lg shadow-md p-8">
                <h2 className= "font-bold pb-2">Sign in!</h2>
                <p>Don't have an account? <Link to= "/" class="text-fuchsia-900 hover:underline">Sign up!</Link></p>
                <div className="flex flex-col py-4">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" 
                        className="p-3 mt-6 border" 
                        style={{ border: '1px solid #6A1E55'}}
                        type="email"
                    />  

                    <input onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        className="p-3 mt-6 border"
                        style={{ border: '1px solid #6A1E55' }} 
                        type="password"
                    />
                    <button type="submit" disables={loading} className="mt-6 justify-center rounded-md bg-fuchsia-950 px-2 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-fuchsia-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button> 
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
    )
}
export default Signin;
