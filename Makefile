SHELL = /bin/bash
.SHELLFLAGS = -o pipefail -c

.PHONY: help
help: ## Print info about all commands
	@echo "Helper Commands:"
	@echo
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[01;32m%-20s\033[0m %s\n", $$1, $$2}'
	@echo

.PHONY: build
build: ## Build static website into ./build
	pnpm run build

.PHONY: dev
dev: ## Run development server
	pnpm dev

.PHONY: install
install: ## Install dependencies
	pnpm i

.PHONY: images
images: ## Generate optimized images
	bun utils/images.js

.PHONY: i18n-extract
i18n-extract: ## Extract i18n messages (lingui)
	pnpm exec lingui extract

.PHONY: i18n-compile
i18n-compile: ## Compile i18n messages (lingui)
	pnpm exec lingui compile --typescript

.PHONY: remote
remote: ## Download all remote content (atlas, glossary..)
	make remote-atlas
	make remote-glossary

.PHONY: atlas
remote-atlas: ## Download latest atlas
	curl -o ./src/data/gen/atlas.json 'https://atlas.pp0.co'

.PHONY: glossary
remote-glossary: ## Download latest glossary
	curl -o ./src/data/gen/glossary.json 'https://glossary.pp0.co'