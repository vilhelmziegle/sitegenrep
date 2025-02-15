import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Create templates directory if it doesn't exist
const templatesDir = join(__dirname, 'templates');
if (!fs.existsSync(templatesDir)) {
    fs.mkdirSync(templatesDir);
}

app.post('/generate-receipt', (req, res) => {
    const { brand, user_data } = req.body;

    const templatePath = join(__dirname, 'templates', `${brand}_receipt_template.docx`);
    const outputPath = join(__dirname, `${brand}_receipt_result.docx`);

    try {
        // Check if template exists
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template not found for brand: ${brand}`);
        }

        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true
        });

        doc.setData({
            name: user_data.name,
            date: user_data.date,
            total: `$${parseFloat(user_data.total).toFixed(2)}`
        });

        doc.render();

        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync(outputPath, buf);

        res.download(outputPath, `${brand}_receipt.docx`, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
            // Clean up: delete the generated file after sending
            fs.unlink(outputPath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting file:', unlinkErr);
            });
        });
    } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).send('Error generating receipt: ' + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});