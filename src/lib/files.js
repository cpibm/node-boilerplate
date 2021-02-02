const { promises: fs } = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { copyFolder } = require('./utils');

const templateDir = path.resolve(__dirname, '..', 'templateStubs');

async function writeTravisConfig(workdir) {
	const travis = require('../templateStubs/travis');

	const file = path.join(workdir, '.travis.yaml');
	return fs.writeFile(file, yaml.dump(travis), 'utf8');
}

async function writePackageJson(workdir, config) {
	const pkgJson = require('../templateStubs/package');

	pkgJson.name = config.name;
	pkgJson.description = config.name;
	pkgJson.author = config.organization || '';
	delete pkgJson.jestSonar;
	delete pkgJson.jest.testResultsProcessor;

	const file = path.join(workdir, 'package.json');
	return fs.writeFile(file, JSON.stringify(pkgJson, undefined, 2), 'utf8');
}

async function writeEslint(workdir) {
	const pkgjson = require('../templateStubs/eslintrc');

	const file = path.join(workdir, '.eslintrc');
	return fs.writeFile(file, JSON.stringify(pkgjson, undefined, 2), 'utf8');
}

async function writeGitignore(workdir) {
	return fs.copyFile(path.join(templateDir, 'gitignore'), path.join(workdir, '.gitignore'));
}

async function writeDummyFiles(workdir) {
	await copyFolder(path.join(templateDir, 'src'), path.join(workdir, 'src'));
	await copyFolder(path.join(templateDir, 'tests'), path.join(workdir, 'tests'));
}

async function writeExtraFiles(workdir) {
	await fs.copyFile(path.join(templateDir, 'commitlint.config.js'), path.join(workdir, 'commitlint.config.js'));
	await fs.copyFile(path.join(templateDir, 'README.md'), path.join(workdir, 'README.md'));
}

module.exports = {
	writeTravisConfig,
	writePackageJson,
	writeEslint,
	writeGitignore,
	writeDummyFiles,
	writeExtraFiles,
};
