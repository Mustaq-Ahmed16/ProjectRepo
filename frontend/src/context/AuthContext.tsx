import React,{createContext,useContext,useState,useEffect} from 'react';

interface User {
    id:string;
    name:string;
    email:string;
    phone :string;
    role:"Librarian"|"user"
}

interface AuthContextType{
    user : User | null
    token:string|null
    role:string|null
    login:(token:string,user:User)=>void;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [user,setUser]=useState<User | null>(null);
    const [token,setToken]=useState<string | null>(null);
    const [role,setRole]=useState<string | null>(null);

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedUser = localStorage.getItem("user");
        if(storedToken && storedUser && storedRole)
        {
            setToken(token);
            setUser(user);
            setRole(role)
        }
    },[]);

    const login =(newToken :string,newUser:User)=>{
        setToken(newToken);
        setUser(newUser);
        setRole(newUser.role);
        localStorage.setItem("token",newToken);
        localStorage.setItem("role",newUser.role);
        localStorage.setItem("user",JSON.stringify(newUser));

    };
    const logout = ()=>{
        setToken(null);
        setUser(null);
        setRole(null);
        localStorage.clear();
    };

    return ( 
        <AuthContext.Provider value={{user,token,role,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

};


export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be within AuthProvider");
    return context;
}

