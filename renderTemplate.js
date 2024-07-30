const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const templatePath = path.join(__dirname, 'templates', 'shopify.extension.toml.liquid');
const outputPath = path.join(__dirname, 'dist', 'shopify.extension.toml');

const template = fs.readFileSync(templatePath, 'utf-8');
const rendered = template.replace('{{ payment_session_url }}', process.env.PAYMENT_SESSION_URL);

fs.writeFileSync(outputPath, rendered, 'utf-8');

console.log('Template rendered and saved to', outputPath);
