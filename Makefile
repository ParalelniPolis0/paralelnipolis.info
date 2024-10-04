SHELL = /bin/bash
.SHELLFLAGS = -o pipefail -c

.PHONY: help
help: ## Print info about all commands
	@echo "Helper Commands:"
	@echo
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[01;32m%-20s\033[0m %s\n", $$1, $$2}'
	@echo

.PHONY: build
build: #s Build static website into ./build
	pnpm run build

.PHONY: dev
dev: ## Run development server
	pnpm dev

.PHONY: install
install: ## Install dependencies
	pnpm i

.PHONY: archive
archive: ## Run all archive scrapers (require Bun)
	@make archive_yt

.PHONY: archive_yt
archive_yt: ## Scrape archive videos from YouTube (require Bun)
	bun utils/yt-videos.js