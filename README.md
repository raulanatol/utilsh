# @raulanatol/utilsh

A utility packages and plugins for shell scripting and automation.

## 🚀 Quick Start

### Install package
```bash
npm install @raulanatol/utilsh
```

### Usage 

```
utilsh
```

## 📦 Project Structure

```
.
├── packages/          # Core utility packages
└── packages/plugins/  # Plugin packages
```

## ⚙️ Prerequisites

- Node.js (version 24.1.0 - specified in .nvmrc)
- npm (Latest version recommended)

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build all packages |
| `npm run test` | Run tests across all packages |
| `npm run lint` | Run linting across all packages |
| `npm run format` | Format code using Prettier |

### Development Stack

- **TypeScript** - Type safety and modern JavaScript features
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Vitest** - Fast and modern testing framework
- **Husky** - Git hooks management
- **lint-staged** - Pre-commit checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📦 Dependencies

### Development Dependencies
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- @vitest/coverage-v8
- eslint
- husky
- lint-staged
- prettier
- ts-node
- typescript
- vitest

### Runtime Dependencies
- glob
- inquirer 