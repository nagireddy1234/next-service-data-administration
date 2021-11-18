module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/setUpTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)?$': 'babel-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"]
};
