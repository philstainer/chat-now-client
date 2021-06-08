module.exports = {
  '*.@(ts|tsx)': [
    'yarn eslint --fix',
    'yarn prettier --write',
    'yarn test -- --watchAll=false'
  ]
}
