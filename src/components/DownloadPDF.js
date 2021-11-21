import React, {useState, useEffect} from 'react';
import { createPDF } from '../helpers/pdfgenerator';
import { Button, Row, Col} from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import { useAlert } from '../hooks/alertsHooks/useAlertHook';
import { ToastContainer } from 'react-toastify';
import useLogger from "../hooks/useLogger";


// dowload form 
export default function DownLoadPDF({analysisReady}) {
    useLogger(analysisResults);
    const { analysisResults } = useAppContext();
    const [show, setShow] =  useState(false);
    const [setTrigger] = useAlert('pdf ready for download', 'bottom-right', 'info', 1.5);
 
    useEffect(()=> {
        if(analysisReady){
            setTrigger(true);    
            setShow(true);
        }
    }, [analysisResults.results])

    const downloadButton = (
            <Col lg='5'>
                <Button className="btn-solid-sm mt-2 pl-3 pr-3" style={{width: "100%"}} onClick={() =>  createPDF(analysisResults.clientAddress, analysisResults.results) }>Download Results</Button>
            </Col>
        )

    return (
        <>
            {
                show ? downloadButton : null 
            } 
            <ToastContainer />
        </>
    )
}
