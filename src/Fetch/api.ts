export const authFetch = async(
    url:string,
    token:string | null,
    options:RequestInit={}
)=>{
    const headers ={
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json",
    };
    return fetch(url,{
        ...options,
        headers,
    });
};