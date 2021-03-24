import { useEffect, useState } from 'react'

const useSemiPresistentState = (key, initialState) =>{
    const [value, setvalue] = useState(localStorage.getItem(key) || initialState);

    useEffect(()=>{
        localStorage.setItem(key,value);
    },[value,key])

    return [value, setvalue];
}

export default useSemiPresistentState;