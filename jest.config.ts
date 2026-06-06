// ts-node is required by Jest to parse this TypeScript config file at runtime
import type {} from "ts-node";
import { Config } from "jest";

const config: Config = {
  // Disable collection by default to speed up local test runs. Use `npm run test:coverage`
  // when coverage is needed.
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
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
  maxWorkers: 6,
  testTimeout: 15000,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
