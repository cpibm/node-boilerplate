const path = require('path');
const chalk = require('chalk');
const Spinnies = require('spinnies');
const commands = require('./lib/commands');
const files = require('./lib/files');

class Boilerplate {
	constructor(config) {
		this.config = config;
		this.workdir = path.resolve(process.cwd(), config.name);
		this.repository = this.setRepository(config);
		this.spinnies = new Spinnies();
	}

	setRepository(config) {
		if (config.organization) {
			return `${config.organization}/${config.repo}`;
		}

		return config.repo;
	}

	async main() {
		this.printStartMessage();

		try {
			await this.createRepository();
			await this.populateProjectFiles();
			await this.installPackages();
			this.spinnies.succeed('main-spin');

			await commands.runTests(this.workdir);
			await commands.openEditor(this.workdir);
		} catch (e) {
			this.spinnies.stopAll('fail');
			throw e;
		}
	}

	printStartMessage() {
		const msg = chalk.green('Creating new project: ') + chalk.yellow(this.config.name);
		this.spinnies.add('main-spin', { text: msg });
	}

	async createRepository() {
		const msg = chalk.white('Creating repository: ') + chalk.yellow(this.repository);
		this.spinnies.add('repo-spin', { text: msg, indent: 2 });

		if (this.config.gh) {
			await commands.createGithubRepo(this.repository);
		} else {
			await commands.createLocalRepo(this.workdir);
		}
		await commands.useMainBranch(this.workdir);
		await files.writeGitignore(this.workdir);
		await commands.initialCommit(this.workdir, this.config.git);
		this.spinnies.succeed('repo-spin');
	}

	async populateProjectFiles() {
		const msg = chalk.white('Populate directory structure...');
		this.spinnies.add('files-spin', { text: msg, indent: 2 });

		const dir = this.workdir;
		if (this.config.travis) {
			await files.writeTravisConfig(dir);
		}
		await files.writePackageJson(dir, this.config);
		await files.writeEslint(dir);
		await files.writeDummyFiles(dir);
		await files.writeExtraFiles(dir);
		this.spinnies.succeed('files-spin');
	}

	async installPackages() {
		const msg = chalk.white('Installing NPM packages...');
		this.spinnies.add('npm-spin', { text: msg, indent: 2 });
		await commands.npmInstall(this.workdir);
		this.spinnies.succeed('npm-spin');
	}
}

module.exports = Boilerplate;
