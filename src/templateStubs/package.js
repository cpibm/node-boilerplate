module.exports = {
	"name": "",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "jest --coverage --verbose",
		"test:watch": "jest --watchAll --coverage --verbose",
		"test:coverage": "jest --collectCoverage --verbose",
		"lint": "eslint \"**/*.js\" --ignore-pattern node_modules/",
		"lint:fix": "eslint \"**/*.js\" --fix --ignore-pattern node_modules/"
	},
	"husky": {
	    "hooks": {
			"pre-commit": "npm test && npm run lint",
			"pre-push": "npm test"
	    }
 	},
	"repository": {
		"type": "git",
		"url": ""
	},
	"jest": {
		"testEnvironment": "node",
		"coveragePathIgnorePatterns": [
			"/node_modules/"
		],
		"testResultsProcessor": "jest-sonar-reporter"
	},
	"jestSonar": {
		"reportPath": "coverage",
		"reportFile": "test-reporter.xml",
		"indent": 4
	},
	"author": "",
	"license": "MIT",
	"dependencies": {},
	"devDependencies": {}
}
