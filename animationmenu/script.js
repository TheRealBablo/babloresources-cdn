const fs = require('fs');
const path = require('path');

// 📁 Mapp där .webp-bilderna finns
const folderPath = './previews'; // ← ändra till rätt mapp om nödvändigt

//  Läs alla filer i mappen
fs.readdirSync(folderPath).forEach((filename) => {
  if (filename.endsWith('.webp')) {
    const fullPath = path.join(folderPath, filename);

    const nameWithoutExt = path.parse(filename).name;
    const cleanedName = nameWithoutExt.replace('_preview', '');
    const newFilename = `${cleanedName}.webp`;
    const newFullPath = path.join(folderPath, newFilename);

    // 🚨 Undvik att skriva över fil om den redan finns
    if (!fs.existsSync(newFullPath)) {
      fs.renameSync(fullPath, newFullPath);
      console.log(`Renamed: ${filename} -> ${newFilename}`);
    } else {
      console.warn(`Skipped: ${newFilename} already exists`);
    }
  }
});
