# @raulanatol/utilsh

A monorepo containing utility packages and plugins for shell scripting and automation.

## Project Structure

The project is organized as a monorepo using npm workspaces:

```
.
├── packages/          # Main packages
└── packages/plugins/  # Plugin packages
```

## Prerequisites

- Node.js (version 24.1.0 - specified in .nvmrc)
- npm (Latest version recommended)

## Installation

```bash
# Clone the repository
git clone [repository-url]
cd utilsh

# Install dependencies
npm install
```

## Available Scripts

- `npm run build` - Build all packages
- `npm run test` - Run tests across all packages
- `npm run lint` - Run linting across all packages
- `npm run format` - Format code using Prettier

## Development

This project uses several development tools:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- Husky for git hooks
- lint-staged for pre-commit checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Dependencies

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