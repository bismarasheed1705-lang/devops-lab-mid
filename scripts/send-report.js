const fs = require('fs');
const axios = require('axios');

async function sendReport() {
    const jestData = JSON.parse(fs.readFileSync('jest-results.json', 'utf8'));
    
    const payload = {
        repository: process.env.GITHUB_REPOSITORY,
        branch: process.env.GITHUB_REF_NAME,
        commit: process.env.GITHUB_SHA,
        pipeline_run: process.env.GITHUB_RUN_ID,
        timestamp: new Date().toISOString(),
        overall_status: jestData.success ? 'PASSED' : 'FAILED',
        counts: {
            total: jestData.numTotalTests,
            passed: jestData.numPassedTests,
            failed: jestData.numFailedTests
        },
        tests: jestData.testResults[0].assertionResults.map(t => ({
            name: t.title,
            result: t.status,
            failure_message: t.failureMessages.length > 0 ? t.failureMessages.join('\n') : null
        }))
    };

    fs.writeFileSync('formatted-report.json', JSON.stringify(payload, null, 2));

    try {
        console.log(`Sending report to: ${process.env.NGROK_URL}`);
        await axios.post(process.env.NGROK_URL, payload);
        console.log('Report sent successfully to local receiver.');
    } catch (error) {
        console.error('Failed to send report:', error.message);
    }
}

sendReport();