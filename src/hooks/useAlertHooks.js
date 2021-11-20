import {useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function generateOptions(position, type, delay, onOpen, onClose){
    return {
        position: toast['POSITION'][position.toUpperCase()],
        hideProgressBar: true,
        type: toast['TYPE'][type.toUpperCase()],
        delay: delay,
        onOpen: onOpen || undefined,
        onClose: onClose || undefined
    }
}

export function useAlert(message, position, type, delay, onOpen = undefined, onClose=undefined) {
    const [trigger, setTrigger] = useState(false);
    const options = generateOptions(message, position, type, delay, onOpen, onClose);
    
    useEffect(()=>{
        if(trigger){
            toast(message, options);
        }
    }, [setTrigger])
    return setTrigger;
}

export function useAlertWithPromise(resolve, args,message){
    const [trigger, setTrigger] = useState(false);
    const promise = new Promise((resolve, rej) => {
        if (args){
            resolve(...args);
        } else {
            resolve();
        }
        toast.promise(resolve, {
            pending: message.pending,
            success: message.success, 
            error: message.error
        })
    });
    
    useEffect(()=>{
        if(trigger){  
            promise();          
        }
    }, [setTrigger])

    return setTrigger;
}