module.exports = {
    bracketSpacing: false,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    printWidth: 120,
    trailingComma: 'none',
    overrides: [
        {
            files: '*.json',
            options: {
                singleQuote: false,
                tabWidth: 2
            }
        }
    ]
};
