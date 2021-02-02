module.exports = {
	name: '',
	version: '1.0.0',
	description: '',
	main: 'index.js',
	scripts: {
		test: 'jest',
		'test:watch': 'jest --watchAll --coverage --verbose',
		'test:coverage': 'jest --collectCoverage --verbose',
		lint: 'eslint "**/*.js"',
		'lint:fix': 'eslint "**/*.js" --fix',
	},
	eslintIgnore: ['node_modules/', 'commitlint.config.js'],
	husky: {
		hooks: {
			'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
			'pre-commit': 'npm test && npm run lint',
			'pre-push': 'npm test',
		},
	},
	repository: {
		type: 'git',
		url: '',
	},
	jest: {
		testEnvironment: 'node',
		coveragePathIgnorePatterns: ['/node_modules/'],
		testResultsProcessor: 'jest-sonar-reporter',
	},
	jestSonar: {
		reportPath: 'coverage',
		reportFile: 'test-reporter.xml',
		indent: 4,
	},
	author: '',
	license: 'MIT',
	dependencies: {},
	devDependencies: {},
};
