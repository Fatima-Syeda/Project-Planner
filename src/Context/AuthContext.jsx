import { createContext,useEffect, useState, useContext } from "react";
import {supabase} from "../supabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);


    //Sign up function
    const signUpNewUser = async (name, email, password) =>{
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {name},
            },

        });

        if(error){
            console.error("there was a problem signing up:", error);
            return { success: false, error};
        }
        return { success: true, data};
    };  

    // Sign in function
    const signInUser = async (email, password) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email, 
                password: password
            });
            if (error){
                console.error("sign in error occures: ", error);
                return{success: false, error: error.message};
            }
            console.log("Sign-in success: ", data);
            return{success: true, data}

        }catch(error){
            console.error("an error occured: ", error)
        }
    };


    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        })
    },[])


    // Sign out function
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error("there was an error: ", error);
        }
    };

    return(
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}