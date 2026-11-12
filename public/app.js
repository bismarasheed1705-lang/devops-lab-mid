let submissions = [];

function submitAssignment(name, regNo, title, url) {
    if (!name || !regNo || !title || !url) {
        return { success: false, message: "Validation Error: All fields (including Registration number) are required." };
    }
    
    try {
       new URL(url);
    } catch (error) {
        return { success: false, message: "Validation Error: Invalid submission URL." };
    }

    const submission = { name, regNo, title, url };
    submissions.push(submission);
    
    return { success: true, message: "Submission successful!", submissions };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { submitAssignment, submissions };
}