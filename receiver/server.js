const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());


app.post('/webhook', (req, res) => {
    const reportData = req.body;
    
    fs.writeFileSync('test-report.json', JSON.stringify(reportData, null, 2));
    
    console.log(`\n[${new Date().toISOString()}] New Test Report Received!`);
    console.log(`Status: ${reportData.overall_status}`);
    console.log(`File saved as test-report.json`);
    
    res.status(200).send('Report Successfully Saved');
});

app.listen(3000, () => {
    console.log('Receiver is running on http://localhost:3000');
    console.log('Waiting for test reports...');
});