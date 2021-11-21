import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../static/images/logo-main.png';

const marginX = 25;
const marginY = 25;

export function createPDF(walletAddress, data){

    // data / walletAddress as input 
    let pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4'
    })

    pdf.autoTable({
        startY: 50,
        head: [
            [

                {
                    content: `Wallet: ${walletAddress}`,
                    colSpan: 2,
                }
            ]
        ],
        body: parseData(data),
        headStyles: {halign: 'left', fillColor: "#0099ff", textColor: "#ffffff"},
        bodyStyles: {halign: 'left', textColor: "#000000"},
        didDrawPage: () => {
            pdf.setFont('courier', 'bold');
            pdf.setFontSize(21);
            pdf.setTextColor("#110404");
            pdf.addImage(logo, 'SVG', marginX, marginY);        
            pdf.text("Transaction Report", marginX + 50, marginY, 'left');

            // footer 
            let str = 'Page ' + pdf.internal.getNumberOfPages();
            pdf.setFontSize(10)
            let pageSize = pdf.internal.pageSize
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
            pdf.text(str, marginX, pageHeight - 10)
            },
            theme: 'grid',
            margin: {top: marginY + 15}
    });

    function parseData(data){
        return data.map( data => (
                [data.cxName, data.direction === 'to' ? String(`Your wallet sent tokens to ${data.cxName} on ${new Date(Number(data.timestamp))}`):
                String(`Your wallet received tokens from ${data.cxName} on ${new Date(Number(data.timestamp))}`)]
            )
        )
    }
    
    pdf.save("tranasaction_report.pdf"); 
}