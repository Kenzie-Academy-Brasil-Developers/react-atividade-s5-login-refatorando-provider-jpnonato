import { createContext, useContext, ReactNode, useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";


interface Child {
    children: ReactNode
}

interface Data{
    email: string,
    password: string
}

interface AuthContextData {
    authToken: string,
    error: string, 
    Logout: () => void , 
    signIn: (userData: Data) => void
}

const AuthContext = createContext({} as AuthContextData)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}: Child) => {

    const history = useHistory();
  
    const [error, setError] = useState('')
    const [authToken, setAuthToken] = useState(
      () => localStorage.getItem("token") || ""
    );
  
    
    const signIn = (userData: Data) => {
      axios
        .post("https://kenziehub.herokuapp.com/sessions", userData)
        .then((response) => {
       
          localStorage.setItem("token", response.data.token);
          
          setAuthToken(response.data.token);
          console.log(response.data.user.name)
          history.push(`/dashboard/${response.data.user.name}`);
        })
        .catch((err) => setError(err));
    };
  
  
    const Logout = () => {
    
      localStorage.clear();
     
      setAuthToken("");
     
      history.push("/");
    };
  
    return (
      <AuthContext.Provider value={{ authToken, error, Logout,  signIn }}>
        {children}
      </AuthContext.Provider>
    );
};
  
