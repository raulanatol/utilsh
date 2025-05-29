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
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Install project dependencies
	@echo "${CYAN}Installing dependencies...${NC}"
	npm ci

main: check-style build ## Main target to run checks and build
	@echo "${CYAN}Done ✅${NC}"

build: ## Build project
	@echo "${CYAN}Building project...${NC}"
	$(NPM) run build
	npm run lint

clean: ## Clean generated files
	@echo "${CYAN}Cleaning generated files...${NC}"
	rm -rf dist/
	rm -rf node_modules/
	rm -rf .cache/

test: ## Run tests
	@echo "${CYAN}Running tests...${NC}"
	$(NPM) test

lint: ## Run linter
	@echo "${CYAN}Running linter...${NC}"
	$(NPM) run lint

format: ## Format code
	@echo "${CYAN}Formatting code...${NC}"
	$(NPM) run format

dev: ## Start development server
	@echo "${CYAN}Starting development server...${NC}"
	$(NPM) run dev

start: ## Start production server
	@echo "${CYAN}Starting production server...${NC}"
	NODE_ENV=production $(NPM) start

update-deps: ## Update dependencies
	@echo "${CYAN}Updating dependencies...${NC}"
	$(NPM) update

clean-cache: ## Clean cache
	@echo "${CYAN}Cleaning cache...${NC}"
	$(NPM) cache clean --force 

check-style: ## Check code style
	@echo "${CYAN}Checking code style...${NC}"
	$(NPM) run format:check
	$(NPM) run lint

publish-major: ## Publish new major version
	@echo "${CYAN}Publishing new major version...${NC}"
	./scripts/publish.sh major

publish-minor: ## Publish new minor version
	@echo "${CYAN}Publishing new minor version...${NC}"
	./scripts/publish.sh minor

publish-patch: ## Publish new patch version
	@echo "${CYAN}Publishing new patch version...${NC}"
	./scripts/publish.sh patch
