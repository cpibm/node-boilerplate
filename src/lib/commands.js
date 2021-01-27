const util = require('util');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
const { mkdir } = require('./utils');

async function run(command, options) {
    return exec(command, options);
}

async function createGithubRepo(repository) {
    return run(`gh repo create "${repository}" --public --confirm`)
}

async function createLocalRepo(workdir) {
    await mkdir(workdir);
    return run(`git init`, { cwd: workdir });
}

async function useMainBranch(workdir) {
    return run('git symbolic-ref HEAD refs/heads/main', { cwd: workdir });
}

async function initialCommit(workdir, message) {
    return run(`git add -A && git commit -m "${message}"`, { cwd: workdir });
}

async function runTests(workdir) {
    await run(`npm run lint:fix`, { cwd: workdir });
    const { stdout, stderr } = await run(`npm run test`, { cwd: workdir });
    console.log(stdout);
    console.log(stderr);
}

async function openEditor(workdir) {
    console.log(chalk.green('Everything went great'), '😁');
    console.log(chalk.bold.green('Opening VSCode on your project folder'), '⌨️');
    return run(`code ${workdir}`);
}

async function npmInstall(workdir, extraPackages = []) {
    const packages = [
        'husky',
        'jest',
        'eslint',
        'eslint-config-airbnb-base',
        'eslint-config-prettier',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-node',
        'eslint-plugin-prettier',
        'eslint-plugin-security',
        'prettier-eslint',
        ...extraPackages
    ];

    return run(`npm install --save-dev ${packages.join(' ')}`, { cwd: workdir });
}

module.exports = {
    createGithubRepo,
    createLocalRepo,
    initialCommit,
    npmInstall,
    runTests,
    openEditor,
    useMainBranch,
}
