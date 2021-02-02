module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['airbnb-base', 'plugin:node/recommended', 'prettier', 'plugin:jest/recommended'],
	plugins: ['prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2019,
	},
	rules: {
		'class-methods-use-this': 'off',
		'no-useless-constructor': 'off',
		'no-console': 'off',
		'no-tabs': [
			'error',
			{
				allowIndentationTabs: true,
			},
		],
		'func-names': ['error', 'never'],
		'new-cap': 'off',
		'node/exports-style': 'off',
		'node/file-extension-in-import': ['error', 'always'],
		'node/prefer-global/buffer': ['error', 'always'],
		'node/prefer-global/console': ['error', 'always'],
		'node/prefer-global/process': ['error', 'always'],
		'node/prefer-global/url-search-params': ['error', 'always'],
		'node/prefer-global/url': ['error', 'always'],
		'node/prefer-promises/dns': 'error',
		'node/prefer-promises/fs': 'error',
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'es5',
				singleQuote: true,
				useTabs: false,
				printWidth: 120,
			},
		],
	},
};
