import React , {useEffect} from 'react';

export default function useLogger(value) {
    useEffect(() => {
        console.log(value);
    }, [value])
}   
