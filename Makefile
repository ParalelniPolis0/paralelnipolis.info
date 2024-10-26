SHELL = /bin/bash
.SHELLFLAGS = -o pipefail -c

.PHONY: help
help: ## Print info about all commands
	@echo "Helper Commands:"
	@echo
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[01;32m%-20s\033[0m %s\n", $$1, $$2}'
	@echo

.PHONY: remote
remote: ## Download all remote content (glossary, events..)
	make glossary
	make events

.PHONY: glossary
glossary: ## Download latest glossary
	curl -o ./src/data/gen/glossary.json 'https://glossary.pp0.co'

.PHONY: events
events: ## Download latest events
	curl -o ./src/data/gen/events.json 'https://events.pp0.co'

.PHONY: build
build: ## Build static website into ./build
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

.PHONY: data
data: ## Write data bundle to ./dist
	bun utils/data-write.js

.PHONY: images
images: ## Generate optimized images
	bun utils/images.js

.PHONY: meetup
meetup: ## Fetch data from meetup.com
	bun utils/meetup.js

.PHONY: i18n-extract
i18n-extract: ## Extract i18n lingui messages from source
	pnpm exec lingui extract

.PHONY: i18n-compile
i18n-compile: ## Extract i18n lingui messages from source
	pnpm exec lingui compile --typescript