# Receipt Generator

A web application that generates .docx receipts based on user input and brand templates.

## Features

- Select from multiple brands (Apple, Nike, Adidas)
- Input customer details (name, date, amount)
- Generate and download customized receipts in .docx format
- Clean and responsive user interface

## Project Structure

```
project/
  ├── public/
  │    ├── index.html    # Frontend interface
  │    └── script.js     # Frontend logic
  ├── server.js          # Express server
  ├── templates/         # .docx templates
  │    ├── apple_receipt_template.docx
  │    ├── nike_receipt_template.docx
  │    └── adidas_receipt_template.docx
  ├── package.json
  └── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your .docx templates to the `templates` folder:
   - apple_receipt_template.docx
   - nike_receipt_template.docx
   - adidas_receipt_template.docx

3. Start the server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Template Variables

The following variables are available in the .docx templates:
- {{name}} - Customer name
- {{date}} - Purchase date
- {{total}} - Total amount (with $ symbol)

## Deployment

### Frontend
- Host the `public` folder on Netlify or Vercel
- Update the API endpoint in `script.js` to point to your backend server

### Backend
- Deploy to Render, Vercel Serverless Functions, or Heroku
- Set the PORT environment variable if needed
- Ensure the templates folder is included in the deployment