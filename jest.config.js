module.exports = {
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest",
    "^.+\\.js?$": "babel-jest"
  },
  testRegex: "/example/.*(test|spec)\\.(jsx?|tsx?)",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: [
    "example/*.{tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  transformIgnorePatterns: [

  ],
  "preset": "jest-expo",
  coverageReporters: ["json", "lcov", "text"]
};
