module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'class-methods-use-this': 0,
    'import/first': 0,
    'arrow-body-style': 0,
    'no-param-reassign': 0,
    camelcase: 0,
    'max-len': 0,
  },
};
