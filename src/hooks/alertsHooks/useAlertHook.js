import {useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function generateOptions(position, type, delay, onOpen, onClose){
    return {
        position: toast['POSITION'][position.split("-")[0].toUpperCase()+ "_" + position.split("-")[1].toUpperCase()],
        hideProgressBar: true,
        type: toast['TYPE'][type.toUpperCase()],
        delay: delay,
        onOpen: onOpen || undefined,
        onClose: onClose || undefined
    }
}

export function useAlert(message, position, type, delay, onOpen = undefined, onClose=undefined) {
    const [trigger, setTrigger] = useState(false);
    const options = generateOptions(position, type, delay, onOpen, onClose);
    const manualTrigger = m => { toast(m, options) }
    useEffect(()=>{
        if(trigger){
            toast(message, options);
        }
    }, [trigger])
    return [setTrigger, manualTrigger];
}

export function useAlertWithPromise(resolve, message){
    const promise = new Promise((resolve, rej) => {
        if (args){
            console.log(args);
            resolve(...args);
        } else {
            resolve();
        }
        toast.promise(resolve, ...message);
    });
    console.log(promise)
    return promise;
}

export function alert(message, position, type, delay, onOpen, onClose){
    const options = generateOptions(position, type, delay, onOpen, onClose);
    return () => toast(message, options)
}