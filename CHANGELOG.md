# Changelog

## [Unreleased]

### Features

* **storage:** add 9 storage & cookie management tools using the CDP Storage domain
  - `get_cookies` - retrieve all cookies grouped by domain
  - `get_cookies_for_domain` - filter cookies by domain with flexible matching
  - `set_cookie` - set a cookie with full attribute support
  - `clear_all_cookies` - clear all browser cookies (with confirmation guard)
  - `get_storage_usage` - get storage usage and quota for an origin
  - `clear_storage_for_origin` - clear storage data for an origin (with confirmation guard)
  - `track_cache_storage` - enable/disable cache storage event tracking
  - `track_indexeddb` - enable/disable IndexedDB event tracking
  - `override_storage_quota` - override or reset storage quota for an origin
* **cli:** add `--no-category-storage` flag to disable storage tools
* **inspection:** Add comprehensive element inspection tools for DOM and CSS analysis
  * `inspect_element` - Get element info, HTML, attributes, and box model
  * `get_element_styles` - Get computed, matched, and inherited CSS styles
  * `get_element_box_model` - Get detailed box model layout information
  * `query_selector` - Find elements using CSS selectors (with uid mapping)
  * `highlight_element` / `hide_highlight` - Visually highlight elements on the page
  * `get_dom_tree` - Get hierarchical DOM tree structure
  * `capture_dom_snapshot` - Efficient full-page DOM and styles capture
  * `force_element_state` - Force :hover, :focus, :active pseudo-states
  * `get_element_event_listeners` - Get event listeners attached to elements
  * `get_element_at_position` - Get element at x,y coordinates (with uid mapping)
  * `search_dom` - Search DOM by text, CSS selector, or XPath (with uid mapping)
  * `get_fonts_info` - Get font usage information for elements
  * `show_layout_overlay` - Show CSS Grid/Flexbox layout overlays
  * `get_accessibility_info` - Get detailed accessibility tree information
  * `compare_elements` - Compare styles between two elements
  * `get_css_variables` - Get CSS custom properties for elements
* **cli:** Add `--no-category-inspection` flag to disable inspection tools

## [0.12.1](https://github.com/ChromeDevTools/chrome-devtools-mcp/compare/chrome-devtools-mcp-v0.12.0...chrome-devtools-mcp-v0.12.1) (2025-12-12)


### 🛠️ Fixes

* catch unexpected error in event handlers ([#672](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/672)) ([ca0f560](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/ca0f5607f18bf04134e85ea1f61d1a839a47827b))
* log unhandledRejection instead of crashing ([#673](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/673)) ([f59b4a2](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/f59b4a2ed8b09e1d64916552ee6db49b978fe9a7))
* make bringToFront optional in select_page ([#668](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/668)) ([ceae17b](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/ceae17be26b0a812f1b013dcebaed9beb510e7b3))
* Update installation badges in README.md for VS Code ([#660](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/660)) ([61ede1c](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/61ede1c0531ea8b028d9a5cbb28fcdc00cc521e0))


### 📄 Documentation

* Add debug instructions ([#670](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/670)) ([a8aae66](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/a8aae6652e205b87ac2efa29217b7cbd18dcbbe6))
* explain new auto connection feature ([#664](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/664)) ([a537a8c](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/a537a8c8cef4f2a3493e9f7de47345d565b6fc9f))

## [0.12.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/compare/chrome-devtools-mcp-v0.11.0...chrome-devtools-mcp-v0.12.0) (2025-12-09)


### 🎉 Features

* support --auto-connect to a Chrome instance ([#651](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/651)) ([6ab6d85](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/6ab6d85d50226cf12a62563430f552e783f428b2))
* support --user-data-dir with --auto-connect ([#654](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/654)) ([e3c59bc](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/e3c59bcd9c284f3be99cc15e22116b887f04cdab))


### 🛠️ Fixes

* map channel for resolveDefaultUserDataDir ([#658](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/658)) ([6f59b39](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/6f59b3975abda50536f8b890f3245662b22e3657))


### 📄 Documentation

* Add AX design principles ([#643](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/643)) ([90ed192](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/90ed192c558d36faf9f6300be1c1fd5abd464d8a))
* improve autoConnect docs ([#653](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/653)) ([09111cc](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/09111cc16464bed27cd623f3b345d3885db12521))

## [0.11.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/compare/chrome-devtools-mcp-v0.10.2...chrome-devtools-mcp-v0.11.0) (2025-12-03)


### 🎉 Features

* **emulation:** add geolocation emulation tool ([#634](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/634)) ([3991e4c](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/3991e4c2a9c28bf8180f9057ce804d978c39529d))
* integrate DevTools issues into the console tools ([#636](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/636)) ([d892145](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/d8921453c77a1c0815059fb9bc72c0cd769a7bd4))
* support --user-data-dir ([#622](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/622)) ([fcaf553](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/fcaf55354c2afbdbae538e27eb4b6d02f2e87985))


### 🛠️ Fixes

* handle error messages that are not instanceof Error ([#618](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/618)) ([a67528a](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/a67528a046746c7131d5265f6c94613d607aaf90))
* handle the case when all pages are filtered out ([#616](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/616)) ([bff5c65](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/bff5c6569003fdbc207448d89a8be6a9a8172ca0))
* ignore hash parts of URLs when finding DevTools ([#608](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/608)) ([52533d0](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/52533d0c695354b816807de253f0ec17099aa9d7))
* ignore quality for png ([#589](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/589)) ([2eaf268](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/2eaf2689c3360f88479f4cdab8ddde5899378e33))
* include a note about selected elements missing from the snapshot ([#593](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/593)) ([80e77fd](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/80e77fd9a35a3dc5c451cc5b070b8baa574c686c))
* prevent dropping license notices on some files when publishing ([#604](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/604)) ([94752ff](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/94752ffade847671ebfd15e4013a5b5cdf8377df))
* rename page content to latest page snapshot ([#579](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/579)) ([9cb99ad](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/9cb99ad3e65054f4ea12a39358719f6630a020d0))
* **wait_for:** respect the provided timeout ([#630](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/630)) ([6b0984a](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/6b0984aa7dca6f651afd1fed56246893810781c9)), closes [#624](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/624)


### 📄 Documentation

* add Antigravity config ([#580](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/580)) ([6f9182f](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/6f9182f4b60f1f6ff8d321fec35545712828686e))
* add Qoder CLI to the MCP client configuration section in the README. ([#552](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/552)) ([1a16f15](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/1a16f15546e227a0708f89d3084c98d4916db53f))
* add VS Code install badges ([#532](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/532)) ([cc4d065](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/cc4d065dd6081a2a9fbcc3d8ebb1536e5426116e))
* clarify browser-url parameter in README ([#613](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/613)) ([05cf8cb](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/05cf8cb8a6c68506282075bc1522c81f0b84f07b))
* Fix Antigravity docs ([#605](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/605)) ([fae2608](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/fae260888748ece77b368a13ee913153caffcef7))
* update readme to explain agy's browser integration ([#612](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/612)) ([2d89865](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/2d89865ddbff6e77332c6157f687dcc2f0bef892))


### ♻️ Chores

* avoid throwing in resolveCdpElementId ([#606](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/606)) ([eb261fd](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/eb261fd48b6753db246d24b77e1f477dc7a9455e))

## [0.10.2](https://github.com/ChromeDevTools/chrome-devtools-mcp/compare/chrome-devtools-mcp-v0.10.1...chrome-devtools-mcp-v0.10.2) (2025-11-19)


### 📄 Documentation

* add Factory CLI configuration to MCP clients ([#523](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/523)) ([016e2fd](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/016e2fd6ee57447103f7385285dd503b5576a860))


### ♻️ Chores

* clear issue aggregator on page navigation ([#565](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/565)) ([c3784d1](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/c3784d1990a926f651951e4eef05520c5c448964))
* disable issues in list_console_messages for now ([#575](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/575)) ([08e9a9f](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/08e9a9f42e6ff1a92c60b3e958b0817c7b785afc))
* simplify issue management ([#564](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/564)) ([3b016f1](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/3b016f1a814b1a69750813548b3f35e79bfb6fef))

## [0.10.1](https://github.com/ChromeDevTools/chrome-devtools-mcp/compare/chrome-devtools-mcp-v0.10.0...chrome-devtools-mcp-v0.10.1) (2025-11-07)


### 🛠️ Fixes

* avoid no page selected errors ([#537](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/537)) ([4724bbb](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/4724bbba9327fc162cd1f0372e608f6ebefc59cc))

## [0.10.0](https://github.com/ChromeDevTools/chrome-devtools-mcp/compare/chrome-devtools-mcp-v0.9.0...chrome-devtools-mcp-v0.10.0) (2025-11-05)


### 🎉 Features

* add a press_key tool ([#458](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/458)) ([b427392](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/b4273923928704e718e0a0f8b5cc86758416e994))
* add insightSetId to performance_analyze_insight ([#518](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/518)) ([36504d2](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/36504d29caf637b2d7bf231204c0478b54220c83))
* an option to ignore cache on reload ([#485](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/485)) ([8e56307](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/8e56307d623fe3651262287b30544ed70426b0b8))
* detect network requests inspected in DevTools UI ([#477](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/477)) ([796aed7](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/796aed72b7126ed4332888ffbc06d6cb678265ef))
* fetch DOM node selected in the DevTools Elements panel ([#486](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/486)) ([4a83574](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/4a83574961d8d6b974037db56fc8bdbbb91f79b6))
* support page reload ([#462](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/462)) ([d177087](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/d17708798194486b2571092aa67838085da7231e))
* support saving snapshots to file ([#463](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/463)) ([b0ce08a](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/b0ce08ae2ce422813fef3f28c18f2cb6c976d9fc))


### 🛠️ Fixes

* avoid crashes if page is destroyed ([#500](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/500)) ([00a3fc5](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/00a3fc5deb08ee8cb3e17d9b01ac87e0b2f2e03e))
* performance analysis when there is no LCP recorded ([#512](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/512)) ([7a1a5e6](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/7a1a5e6ae37dcfcc4bc95e8f2e2f9e41b69aef3e))
* retry trace conversion before returning an error ([#479](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/479)) ([c87bab7](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/c87bab78d0a2da2b386ab74b76a39b1d2fb82fad))


### 📄 Documentation

* update readme with 0.10.0 features ([#505](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/505)) ([afbb91a](https://github.com/ChromeDevTools/chrome-devtools-mcp/commit/afbb91a7fd2c0ef73d8b23d5f02ffd4e16e85d66))
