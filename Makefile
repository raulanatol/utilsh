.DEFAULT_GOAL := build

# Variables
NODE_ENV ?= development
NPM = npm
NPX = npx

# Colors for messages
CYAN = \033[0;36m
GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m # No Color

help:
	@echo "${CYAN}Available commands:${NC}"
	@echo "${GREEN}make install${NC}    - Install project dependencies"
	@echo "${GREEN}make build${NC}      - Build TypeScript project"
	@echo "${GREEN}make clean${NC}      - Clean generated files"
	@echo "${GREEN}make test${NC}       - Run tests"
	@echo "${GREEN}make lint${NC}       - Run linter"
	@echo "${GREEN}make format${NC}     - Format code"
	@echo "${GREEN}make dev${NC}        - Start development server"
	@echo "${GREEN}make start${NC}      - Start production server"

# Dependencies installation
init:
	@echo "${CYAN}Installing dependencies...${NC}"
	npm ci

# Project build
build: check-style
	@echo "${CYAN}Building project...${NC}"
	$(NPM) run build
	npm run lint

# Clean
clean:
	@echo "${CYAN}Cleaning generated files...${NC}"
	rm -rf dist/
	rm -rf node_modules/
	rm -rf .cache/

# Tests
test:
	@echo "${CYAN}Running tests...${NC}"
	$(NPM) test

# Linting
lint:
	@echo "${CYAN}Running linter...${NC}"
	$(NPM) run lint

# Code formatting
format:
	@echo "${CYAN}Formatting code...${NC}"
	$(NPM) run format

# Development
dev:
	@echo "${CYAN}Starting development server...${NC}"
	$(NPM) run dev

# Production
start:
	@echo "${CYAN}Starting production server...${NC}"
	NODE_ENV=production $(NPM) start

# Dependencies update
update-deps:
	@echo "${CYAN}Updating dependencies...${NC}"
	$(NPM) update

# Security check
security-check:
	@echo "${CYAN}Checking for security vulnerabilities...${NC}"
	$(NPM) audit

# Documentation generation
docs:
	@echo "${CYAN}Generating documentation...${NC}"
	$(NPX) typedoc --out docs src/

# Cache cleanup
clean-cache:
	@echo "${CYAN}Cleaning cache...${NC}"
	$(NPM) cache clean --force 

check-style:
	@echo "${CYAN}Checking code style...${NC}"
	$(NPM) run format:check
	$(NPM) run lint
