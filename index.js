#!/usr/bin/env node

const cli = require('commander');
const chalk = require('chalk');
const Boilerplate = require('./src/main');

cli
	.name('node-boilerplate')
	.usage('<project-name> [options]')
	.arguments('<project-name>')
	.option(
		'-g, --git <message>',
		'Override the initial commit message',
		'chore: Starting first pomodoro with empty project'
	)
	.option('-r, --repo <name>', 'Use this GitHub repository name instead of the the provided project name', false)
	.option('-o, --organization <name>', 'GitHub Organization/Username', false)
	.option('-f, --force', 'Overwrite target directory if it exists', false)
	.option('--no-github', 'Omit Github initialization altogether')
	.option('--no-travis', 'Do not create a .travis.yml file')
	.configureOutput({ outputError: (str, write) => write(chalk.red(str)) })
	.action((project, options) => {
		const config = {};
		Object.assign(config, options);
		config.name = project;
		config.repo = options.repo || project;
		// console.log(config)
		const boilerplate = new Boilerplate(config);
		boilerplate.main().catch((e) => {
			console.log(chalk.red(e));
			process.exitCode = 1;
		});
	});

cli.parse(process.argv);
