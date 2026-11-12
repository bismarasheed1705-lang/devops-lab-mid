const { submitAssignment, submissions } = require('../public/app');

beforeEach(() => {
    submissions.length = 0; 
});

test('Complete details and a valid submission URL', () => {
    const result = submitAssignment('Ahmed', 'FA20-BCS-022', 'DevOps Lab', 'https://github.com');
    expect(result.success).toBe(true);
    expect(submissions.length).toBe(1); // Check ke save ho gaya
});

test('Missing registration number', () => {
    const result = submitAssignment('Ahmed', '', 'DevOps Lab', 'https://github.com');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Validation Error');
    expect(submissions.length).toBe(0); // Check ke save nahi hua
});

test('Invalid submission URL', () => {
    const result = submitAssignment('Ahmed', 'FA20-BCS-022', 'DevOps Lab', 'invalid-url');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Invalid submission URL');
    expect(submissions.length).toBe(0); // Check ke save nahi hua
});