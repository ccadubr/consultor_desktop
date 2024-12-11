module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // Integra Prettier ao ESLint
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        printWidth: 100,
        singleAttributePerLine: true // Garante que atributos fiquem em linhas separadas
      }
    ],

    // Regras para React
    'react/react-in-jsx-scope': 'off', // Não é necessário importar React no React 17+
    'react/prop-types': 'off', // Desativa validação de tipos com PropTypes

    // Regras para TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
}
