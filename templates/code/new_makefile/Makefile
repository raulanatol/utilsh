.DEFAULT_GOAL := check

init:
	@echo "Initialising the project"

start:
	@echo "🏃‍♀️ Starting project"

check: --pre_check test build
	@echo "✅"

docs:
	@doctoc .
	@echo "📚 Documentation ready!"

clean:
	@echo "🛁 Cleaning..."

clean_all:
	@echo "🧨 Clean all"

test:
	@echo "Testing..."

build:
	@echo "👩‍🏭 Building..."

release_patch: release

release_minor: check
	@.scripts/finish-release minor

release_major: check
	@.scripts/finish-release major

release: check
	@.scripts/finish-release patch

--pre_check:
	@echo "👩‍🏭 Pre-check here!"