module.exports = {
    language: 'node_js',
    node_js: ['lts/*'],
    cache: {
        directories: ['node_modules/']
    },
    script: [
        'npm run lint',
        'npm run test:coverage'
    ]
}
