module.exports = function template (params) {
    return `
        <h1>${params.message}</h1>
        <h2>${params.error.status}</h2>
        <pre>${params.error.stack}</pre>
    `;
};
