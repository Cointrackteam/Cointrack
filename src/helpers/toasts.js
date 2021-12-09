import { toast } from 'react-toastify';

export function generateOptions(position, type, delay, onOpen, onClose){
    return {
        position: toast['POSITION'][position.split("-")[0].toUpperCase()+ "_" + position.split("-")[1].toUpperCase()],
        hideProgressBar: true,
        type: toast['TYPE'][type.toUpperCase()],
        delay: delay,
        onOpen: onOpen || undefined,
        onClose: onClose || undefined
    }
}

