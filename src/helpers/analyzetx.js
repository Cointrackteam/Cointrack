
export function analyzeNormalTransActions(txList, db){
    const results = Array(); 
    for (let tx of txList){
        if (db.get(tx.to)){
            results.push({
                cxName: db.get(tx.to),
                timestamp: tx.timeStamp,
                to: tx.to,
                direction: 'to'
            })
        }
        if (db.get(tx.from)){
            results.push({
                cxName: db.get(tx.from),
                timestamp: tx.timeStamp,
                from: tx.from,
                direction: 'from'
            })
        }
    }
    return results;
}