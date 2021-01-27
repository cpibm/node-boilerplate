const inquirer = require('inquirer');

async function devOpsFeatures() {
    const choices = [ 'SonarQube', 'Travis' ];
    const devOpsOptions = { type: 'checkbox', name: 'features', message: 'Pick your desired DevOps features', choices };
    const { features } = await inquirer.prompt(devOpsOptions);
    return features;
}

async function testingFramework() {
    const choices = [ 'Jest', 'Mocha' ];
    const frameworkOptions = { type: 'list', name: 'framework', message: 'Pick a testing framework:', choices };
    const { framework } = await inquirer.prompt(frameworkOptions);
    return framework;
}

async function pathExists(project) {
    const choices = [ 'Overwrite', 'Abort' ];
    const frameworkOptions = { type: 'list', name: 'choice', message: `'${project}' already exists`, choices };
    const { choice } = await inquirer.prompt(frameworkOptions);
    return 'Overwrite' === choice;
}

module.exports = {
    devOpsFeatures,
    testingFramework,
    pathExists,
}
