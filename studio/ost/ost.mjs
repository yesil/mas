/**
 * This file extracts OST from the tgz file and copies to ost/package/lib folder.
 * This is a temporary solution hence the path is not ideal.
 * to run this file, use the following command:
 * node ost.mjs
 */
import * as tar from 'tar';

const tgzFilePath = '../../internal/offer-selector-tool-1.18.1.tgz';

const extractFiles = ['lib/index.js', 'index.css'];

try {
    await tar.x({
        file: tgzFilePath,
        C: './',
        filter: (path) =>
            extractFiles.find((fileInsideTgz) => {
                console.log(`Checking: ${path} against ${fileInsideTgz}`);
                return path.includes(fileInsideTgz);
            }),
        onentry: (entry) => {
            console.log(`Processing: ${entry.path}`);
            if (extractFiles.find((file) => entry.path.includes(file))) {
                console.log(`Extracting: ${entry.path}`);
            } else {
                console.log(`Skipping: ${entry.path}`);
            }
        },
    });
    console.log('Extraction completed successfully.');
} catch (error) {
    console.error('Error during file extraction and copy:', error);
}
