const fs = require('fs');
const path = require('path');

// Source paths in node_modules
const workerPath = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.js');
const cmapsPath = path.join(__dirname, '../node_modules/pdfjs-dist/cmaps');

// Destination paths in public directory
const destPath = path.join(__dirname, '../public/pdf.worker.min.js');
const destCmapsPath = path.join(__dirname, '../public/cmaps');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Create cmaps directory if it doesn't exist
if (!fs.existsSync(destCmapsPath)) {
    fs.mkdirSync(destCmapsPath, {recursive: true});
}

// Copy the worker file
try {
    if (fs.existsSync(workerPath)) {
        fs.copyFileSync(workerPath, destPath);
        console.log('PDF.js worker file copied successfully!');
        console.log('Source:', workerPath);
        console.log('Destination:', destPath);
    } else {
        console.error('Worker file not found at:', workerPath);
    }
} catch (error) {
    console.error('Error copying worker file:', error);
}

// Copy cmaps files
try {
    if (fs.existsSync(cmapsPath)) {
        fs.readdirSync(cmapsPath).forEach(file => {
            const srcFile = path.join(cmapsPath, file);
            const destFile = path.join(destCmapsPath, file);
            fs.copyFileSync(srcFile, destFile);
        });
        console.log('CMap files copied successfully!');
    } else {
        console.error('CMap directory not found at:', cmapsPath);
    }
} catch (error) {
    console.error('Error copying CMap files:', error);
}
