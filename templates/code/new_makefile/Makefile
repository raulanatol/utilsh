.DEFAULT_GOAL := check

start:
	@echo "🏃‍♀️ Starting project"

test:
	@echo "Testing..."

build:
	@echo "👩‍🏭 Building..."

check: test build
	@echo "✅"

docs:
	@doctoc .
	@echo "📚 Documentation ready!"

release_patch: release

release_minor: check
	@.scripts/finish-release minor

release_major: check
	@.scripts/finish-release major

release: check
	@.scripts/finish-release patch
