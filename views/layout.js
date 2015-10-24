module.exports = function template (body, params) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${params.title}</title>
          <link rel='stylesheet' href='/stylesheets/style.css' />
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
};
