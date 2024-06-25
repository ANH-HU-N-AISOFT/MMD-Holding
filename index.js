const fs = require('fs-extra');
const path = require('path');

async function deleteTestFolders(rootDir) {
  try {
    // Read the contents of the root directory
    const files = await fs.readdir(rootDir);

    // Loop through each file or directory in the root directory
    for (const file of files) {
      const filePath = path.join(rootDir, file);

      // Check if the path is a directory
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        if (file === 'stories') {
          // If the directory is named 'stories', delete it
          await fs.remove(filePath);
          console.log(`Deleted folder: ${filePath}`);
        } else {
          // Recursively call the function for nested directories
          await deleteTestFolders(filePath);
        }
      }
    }
  } catch (err) {
    console.error(`Error deleting folders: ${err}`);
  }
}

// Example usage: replace 'your-root-directory' with your actual root directory path
deleteTestFolders('./libs/reactjs').then(() => {
  console.log('All stories folders deleted.');
});
