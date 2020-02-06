module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^@service/(.*)": "<rootDir>/src/services/$1",
    "^@utils/(.*)": "<rootDir>/src/utils/$1",
    "^@config": "<rootDir>/src/configs/index.ts",
    "^@typedef/(.*)": "<rootDir>/src/graphql/typedefs/$1",
    "^@resolver/(.*)": "<rootDir>/src/graphql/resolvers/$1"
  },
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/__utils",
    "<rootDir>/src/__tests__/__mocks__"
  ]
};
