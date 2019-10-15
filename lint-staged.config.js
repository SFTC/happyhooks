module.exports = {
  "*.{js,jsx,json}": ["prettier --write", "git add"],
  "*.css": ["stylelint --fix", "prettier --write", "git add"],
  "*.scss": ["stylelint --syntax scss --fix", "prettier --write", "git add"]
};
