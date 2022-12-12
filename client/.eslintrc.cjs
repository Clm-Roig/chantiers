module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime'
  ],
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': ['off'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        // See https://github.com/react-hook-form/react-hook-form/discussions/9325#discussioncomment-4060566
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: {
              attributes: false
            }
          }
        ]
      }
    }
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
