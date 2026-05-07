import { Config } from "jest";

const config: Config = {
  // Disable collection by default to speed up local test runs. Use `npm run test:coverage`
  // when coverage is needed.
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  coverageReporters: ["json-summary", "clover", "text"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "pnpm-lock.json",
    "yarn-lock.json", //remove lock file accoding to your package manager
    "/src/testing",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/testing/jest.setup.ts"],
  // Limit workers on CI/Windows/WSL to avoid high CPU/IO during transforms
  maxWorkers: "50%",
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
      // isolatedModules speeds up compilation by avoiding type-checks in ts-jest
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
