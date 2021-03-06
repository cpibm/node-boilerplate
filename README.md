# Node Boilerplate (for katas)
Tool to ease the burden of creating the boilerplate for new projects every time you need to do a Kata practice.

By default it will create a new folder with the following:
 - Jest (for testing)
 - TravisCI (`.travis.yml`)
 - Conventional Commits
 - Eslint + Prettier
 - Husky v4 (with git hook for commit messages and linting)
 - Dummy skeleton files (for source and tests)
 - `.gitignore`

 The tool will also create a new GitHub repo with the provided project name.

## Dependencies
 - git
 - nodejs (npm 12+)
 - github cli

## Usage
To make use of the boilerplate you can simply run the following command to generate a project with the default configuration:
```
npx github:cpibm/node-boilerplate <project-name>
```
#### Installation
If you want to **install** the tool locally for a faster response:
```
npm i -g cpibm/node-boilerplate
node-boilerplate <project-name>
```

### Customization
The defaults are very opinionated but you can opt to customize what extras are included or what to disable during the project creation.

To get a list of all available options, run:
```
npx github:cpibm/node-boilerplate --help
```
