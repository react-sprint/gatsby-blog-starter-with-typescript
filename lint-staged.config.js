module.exports = {
  linters: {
    '**/*.+(js|md|ts|scss|graphql|json)': ['eslint --fix', 'prettier --write', 'git add'],
  },
};
