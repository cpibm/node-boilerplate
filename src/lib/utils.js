const fs = require('fs').promises;
const path = require('path');

async function mkdir(dir) {
    return fs.mkdir(dir).catch();
}

async function copyFolder(from, to) {
    await mkdir(to);

    const files = await fs.readdir(from);
    for (const element of files) {
        const src = path.join(from, element);
        const dest = path.join(to, element);
        const stat = await fs.lstat(src);

        if (stat.isFile()) {
            await fs.copyFile(src, dest);
        } else if (stat.isSymbolicLink()) {
            await fs.symlink(await fs.readlink(src), dest);
        } else if (stat.isDirectory()) {
            await copyFolder(src, dest);
        }
    }
}

module.exports = {
    copyFolder,
    mkdir,
};
