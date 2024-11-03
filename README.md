# paralelnipolis.info

New shiny website. Using [atlas](https://github.com/ParalelniPolis0/atlas) as data source.

## Features

* minimalist
* content-oriented
* responsive
* accessible
* statically generated

## Technologies

* [Node.js](https://nodejs.org) & [Bun](https://bun.sh/) runtime
* [SvelteKit](https://kit.svelte.dev/) server framework
* [Vite](https://vite.dev/) frontend tooling
* [Svelte](https://svelte.dev/) UI framework  (🎉 5.0)
* [Tailwind](https://tailwindcss.com/) CSS framework
* [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) typographic defaults
* [Lingui](https://lingui.dev/) internationalization framework (i18n)
* [Marked](https://marked.js.org/) markdown parser
* [date-fns](https://date-fns.org/) library

## Development

Requirements:

* [Node.js](https://nodejs.org/en) v20+
* [Bun](https://bun.sh/) 1.1+
* Make

Clone repository:
```bash
git clone git@github.com:ParalelniPolis0/paralelnipolis.info.git
```

Install dependencies:
```bash
make install
```

Run development server:
```bash
make dev
```

Other `make` commands:
```
    help                 Print info about all commands
    build                Build static website into ./build
    dev                  Run development server
    install              Install dependencies
    images               Generate optimized images
    i18n-extract         Extract i18n messages (lingui)
    i18n-compile         Compile i18n messages (lingui)
    remote               Download all remote content (atlas, glossary..)
    remote-atlas         Download latest atlas
    remote-glossary      Download latest glossary
```

## Authors

* Tree ([@burningtree](https://github.com/burningtree))

## License

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE