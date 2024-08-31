1. nest new apis
2. cd apis
3. nest generate app http-api-gateway
4. nest generate library common
5. yarn add husky lint-staged -D
6. npx husky init
7. yarn add @commitlint/cli @commitlint/config-conventional -D
8. Create a commit-msg hook file in the .husky/ directory and add the following script to it:
   npx --no-install commitlint --edit "$1"
9. Create a commitlint.config.js file in the root directory of your project. This file should include the configuration for Commitlint. For example I have Implemented:
   // commitlint.config.js
   module.exports = {
   extends: ["@commitlint/cli", "@commitlint/config-conventional"],
   rules: {
   "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
   "subject-case": [0, "always", "sentence-case"],
   }
   }
10. yarn add dotenv-flow cross-env
11. yarn add install winston
12. yarn add moment-timezone
13. npm install @nestjs/microservices

