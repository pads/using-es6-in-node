module.exports = function template (params) {
    return `
        <h1>${params.title}</h1>
        <p>Welcome to ${params.title}</p>
        <a href="/users">View Users</a>
    `;
};
