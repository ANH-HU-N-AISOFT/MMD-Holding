const path = require('path');

const currentWorkingDirectory = process.cwd();

module.exports = {
  // Typecheck
  '{apps,libs,tools}/**/*.{ts,tsx}': (files) => {
    const filesJoinded = files
      .map((item) => path.relative(currentWorkingDirectory, item))
      .join(',');
    return `nx affected --target=typecheck --files=${filesJoinded}`;
  },

  // Lint
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': (files) => {
    const filesJoinded = files
      .map((item) => path.relative(currentWorkingDirectory, item))
      .join(',');
    return `nx affected --target=lint --files=${filesJoinded}`;
  },

  // // Stylelint
  // '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': (files) => {
  //   const filesJoinded = files
  //     .map((item) => path.relative(currentWorkingDirectory, item))
  //     .join(',');
  //   return `nx affected --target=stylelint --files=${filesJoinded}`;
  // },
};
