# gisktzh/cim-to-svg

Library to convert @arcgis/core `CIMSymbol`s to SVGs.

## Installation

To install the library, execute the following command in the project root:

```
npm i @gisktzh/cim-symbol-to-svg
```

## Usage

**IMPORTANT**: This library is meant to be used in the browser. If you _need_ to use it in a server environment, make sure you install and configure [jsdom](https://github.com/jsdom/jsdom).

- Include the library's main function:

  ```
  import cimSymbolToSVG from '@gisktzh/cim-symbol-to-svg'
  ```

- Use it, for example, with a loaded `WebSymbol`:

  ```
  const webStyleSymbol = new WebStyleSymbol({
    name: 'Gorilla',
    styleUrl: 'https://cdn.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data',
  })

  const cimSymbol = await webStyleSymbol.fetchSymbol({ acceptedFormats: ['cim'] }) as CIMSymbol

  const svgElement = cimSymbolToSVG(cimSymbol)
  ```

## Currently unsupported features

Since they're rather complex, the following features are not supported currently:

- Rectangualr gradients
- AcrossLine gradients
- AlongLine gradients
- Color substitution in pictures

Everything else _should_ work according to specs.

**Please keep in mind that certain CIMSymbols, such as backgrounds, hatches, etc. provide an SVG which can be used as backgrounds for other SVGs only, since they themselves do not offer any geometry!**

## Development

- To get started developing in this library, clone the repository:
  ```
  git clone https://github.com/gisktzh/cim-to-svg
  ```
- Ensure that you're running the correct Node version (either via `nvm use` or by installing the Node version specified in `.nvmrc`)
- Install dependencies:
  ```
  npm install
  ```
- Run tests to ensure your changes work:
  ```
  npm run test
  ```

## Contribution

If you want to contribute to this library, please feel free to open Pull Requests or Issues here on Github.

## License

BSD 3-Clause License, see `LICENSE.md`
