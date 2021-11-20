import React, {useState, useEffect} from 'react';
import { createPDF } from '../helpers/pdfgenerator';
import { Button } from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import { useAlert } from '../hooks/useAlertHooks';
import { ToastContainer } from 'react-toastify';


// dowload form 
export default function DownLoadPDF({analysisReady}) {
    const { analysisResults } = useAppContext();
    const [show, setShow] =  useState(false);
    const triggerDownloadReady = useAlert('pdf ready for download', 'bottom-right', 'info', 1.5);
 
    useEffect(()=> {
        if(analysisReady){
            triggerDownloadReady(true);    
            setShow(true);
        }
    }, [analysisResults.results])

    const downloadButton = (
        <>
            <Button onClick={() =>  createPDF(analysisResults.clientAddress, analysisResults.results) }>Download Results</Button>
        </>
    )

    return (
        <div className="form-group">
            {
                show ? downloadButton : null 
            }  
            <ToastContainer />
        </div>
    )
}
