## 1.1.0 (2023-08-22)

- chore: support ember-modifier 3.x and 4.x ([e398557](https://github.com/jkusa/ember-cli-clipboard/commit/e398557)), closes [#396](https://github.com/jkusa/ember-cli-clipboard/issues/396)
- Bump decode-uri-component from 0.2.0 to 0.2.2 (#385) ([1f79ea4](https://github.com/jkusa/ember-cli-clipboard/commit/1f79ea4)), closes [#385](https://github.com/jkusa/ember-cli-clipboard/issues/385)
- Bump engine.io from 6.2.0 to 6.2.1 (#384) ([3fc748a](https://github.com/jkusa/ember-cli-clipboard/commit/3fc748a)), closes [#384](https://github.com/jkusa/ember-cli-clipboard/issues/384)
- Bump loader-utils from 1.4.1 to 1.4.2 (#383) ([55e7f95](https://github.com/jkusa/ember-cli-clipboard/commit/55e7f95)), closes [#383](https://github.com/jkusa/ember-cli-clipboard/issues/383)

## 1.0.0 (2022-11-22)

- Bump loader-utils from 1.4.0 to 1.4.1 (#382) ([f654bdc](https://github.com/jkusa/ember-cli-clipboard/commit/f654bdc)), closes [#382](https://github.com/jkusa/ember-cli-clipboard/issues/382)
- build: move ember-modifer to dependencies (#381) ([87bb0cb](https://github.com/jkusa/ember-cli-clipboard/commit/87bb0cb)), closes [#381](https://github.com/jkusa/ember-cli-clipboard/issues/381)
- feat: support `target` to be set dynamically (#379) ([66bf3a7](https://github.com/jkusa/ember-cli-clipboard/commit/66bf3a7)), closes [#379](https://github.com/jkusa/ember-cli-clipboard/issues/379)
- feat: support direct use of the clipboard modifier ([7e3f448](https://github.com/jkusa/ember-cli-clipboard/commit/7e3f448))
- chore: make changelog with conventional-changelog-cli (#378) ([fae8d89](https://github.com/jkusa/ember-cli-clipboard/commit/fae8d89)), closes [#378](https://github.com/jkusa/ember-cli-clipboard/issues/378)
- chore: make repo commitizen friendly (#371) ([0b2eede](https://github.com/jkusa/ember-cli-clipboard/commit/0b2eede)), closes [#371](https://github.com/jkusa/ember-cli-clipboard/issues/371)
- chore: simplify demo component ([3169422](https://github.com/jkusa/ember-cli-clipboard/commit/3169422))
- chore: update ember-auto-import to v2 & ember-cli v4 (#370) ([8e1aa28](https://github.com/jkusa/ember-cli-clipboard/commit/8e1aa28)), closes [#370](https://github.com/jkusa/ember-cli-clipboard/issues/370)

### BREAKING CHANGE

- This commit contains many breaking changes:

  - Drops ember classic component support (glimmer only)
  - Drops support for `sendAction`
  - Requires ember-auto-import 2.x
  - `<CopyButton>` component arg name changes:

  | Old Argument Name  | New Argument Name                      |
  | ------------------ | -------------------------------------- |
  | `@clipboardText`   | `@text`                                |
  | `@clipboardTarget` | `@target`                              |
  | `@clipboardAction` | `@action`                              |
  | `@success`         | `@onSuccess`                           |
  | `@error`           | `@onError`                             |
  | `@title`           | no longer supported, pass as attribute |
  | `@disabled`        | no longer supported, pass as attribute |
  | `@aria-label`      | no longer supported, pass as attribute |

## 0.16.0 (2021-11-15)

- [Security] Bump elliptic from 6.5.2 to 6.5.3 (#233) ([6215398](https://github.com/jkusa/ember-cli-clipboard/commit/6215398)), closes [#233](https://github.com/jkusa/ember-cli-clipboard/issues/233)
- [Security] Bump highlight.js from 10.3.2 to 10.4.1 (#290) ([262a525](https://github.com/jkusa/ember-cli-clipboard/commit/262a525)), closes [#290](https://github.com/jkusa/ember-cli-clipboard/issues/290)
- [Security] Bump websocket-extensions from 0.1.3 to 0.1.4 (#211) ([bf84751](https://github.com/jkusa/ember-cli-clipboard/commit/bf84751)), closes [#211](https://github.com/jkusa/ember-cli-clipboard/issues/211)
- 0.16.0 ([0b3cc4d](https://github.com/jkusa/ember-cli-clipboard/commit/0b3cc4d))
- Bump ember-angle-bracket-invocation-polyfill from 2.1.0 to 3.0.0 (#264) ([33fd884](https://github.com/jkusa/ember-cli-clipboard/commit/33fd884)), closes [#264](https://github.com/jkusa/ember-cli-clipboard/issues/264)
- Bump ember-cli-flash from 1.9.1 to 2.1.0 (#295) ([53d0497](https://github.com/jkusa/ember-cli-clipboard/commit/53d0497)), closes [#295](https://github.com/jkusa/ember-cli-clipboard/issues/295)
- Bump ember-cli-terser from 4.0.0 to 4.0.1 (#273) ([5489dde](https://github.com/jkusa/ember-cli-clipboard/commit/5489dde)), closes [#273](https://github.com/jkusa/ember-cli-clipboard/issues/273)
- Bump ember-composable-helpers from 2.4.0 to 4.3.0 (#248) ([8be6374](https://github.com/jkusa/ember-cli-clipboard/commit/8be6374)), closes [#248](https://github.com/jkusa/ember-cli-clipboard/issues/248)
- Bump ember-modifier from 1.0.5 to 2.1.1 (#254) ([8b5277b](https://github.com/jkusa/ember-cli-clipboard/commit/8b5277b)), closes [#254](https://github.com/jkusa/ember-cli-clipboard/issues/254)
- Bump ember-template-lint from 2.12.1 to 2.13.0 (#256) ([13247b7](https://github.com/jkusa/ember-cli-clipboard/commit/13247b7)), closes [#256](https://github.com/jkusa/ember-cli-clipboard/issues/256)
- Bump ember-template-lint from 2.7.0 to 2.8.0 (#202) ([ebe9854](https://github.com/jkusa/ember-cli-clipboard/commit/ebe9854)), closes [#202](https://github.com/jkusa/ember-cli-clipboard/issues/202)
- Bump eslint from 7.10.0 to 7.12.0 (#274) ([78f1cff](https://github.com/jkusa/ember-cli-clipboard/commit/78f1cff)), closes [#274](https://github.com/jkusa/ember-cli-clipboard/issues/274)
- Bump eslint from 7.13.0 to 7.16.0 (#296) ([3bb16f0](https://github.com/jkusa/ember-cli-clipboard/commit/3bb16f0)), closes [#296](https://github.com/jkusa/ember-cli-clipboard/issues/296)
- Bump eslint from 7.9.0 to 7.10.0 (#257) ([66cb77a](https://github.com/jkusa/ember-cli-clipboard/commit/66cb77a)), closes [#257](https://github.com/jkusa/ember-cli-clipboard/issues/257)
- Bump eslint-plugin-ember from 8.4.0 to 8.7.0 (#217) ([0bcb927](https://github.com/jkusa/ember-cli-clipboard/commit/0bcb927)), closes [#217](https://github.com/jkusa/ember-cli-clipboard/issues/217)
- Bump eslint-plugin-ember from 8.7.0 to 9.0.0 (#250) ([12b61a4](https://github.com/jkusa/ember-cli-clipboard/commit/12b61a4)), closes [#250](https://github.com/jkusa/ember-cli-clipboard/issues/250)
- Bump eslint-plugin-ember from 9.0.0 to 9.1.1 (#258) ([066d665](https://github.com/jkusa/ember-cli-clipboard/commit/066d665)), closes [#258](https://github.com/jkusa/ember-cli-clipboard/issues/258)
- Bump highlight.js from 10.2.0 to 10.3.1 (#270) ([8b910e2](https://github.com/jkusa/ember-cli-clipboard/commit/8b910e2)), closes [#270](https://github.com/jkusa/ember-cli-clipboard/issues/270)
- Bump ini from 1.3.5 to 1.3.8 (#294) ([e9f4c36](https://github.com/jkusa/ember-cli-clipboard/commit/e9f4c36)), closes [#294](https://github.com/jkusa/ember-cli-clipboard/issues/294)
- Bump prettier from 2.1.2 to 2.2.1 (#288) ([4e344ae](https://github.com/jkusa/ember-cli-clipboard/commit/4e344ae)), closes [#288](https://github.com/jkusa/ember-cli-clipboard/issues/288)
- Bump pretty-quick from 2.0.2 to 3.0.2 (#255) ([aa858a0](https://github.com/jkusa/ember-cli-clipboard/commit/aa858a0)), closes [#255](https://github.com/jkusa/ember-cli-clipboard/issues/255)
- Bump qunit-dom from 1.5.0 to 1.6.0 (#281) ([76c2b89](https://github.com/jkusa/ember-cli-clipboard/commit/76c2b89)), closes [#281](https://github.com/jkusa/ember-cli-clipboard/issues/281)
- Bump sass from 1.26.11 to 1.27.0 (#267) ([1e7cbb3](https://github.com/jkusa/ember-cli-clipboard/commit/1e7cbb3)), closes [#267](https://github.com/jkusa/ember-cli-clipboard/issues/267)
- Bump sass from 1.26.5 to 1.26.8 (#214) ([54e1860](https://github.com/jkusa/ember-cli-clipboard/commit/54e1860)), closes [#214](https://github.com/jkusa/ember-cli-clipboard/issues/214)
- Bump uuid from 8.3.0 to 8.3.1 (#259) ([ed7bb5d](https://github.com/jkusa/ember-cli-clipboard/commit/ed7bb5d)), closes [#259](https://github.com/jkusa/ember-cli-clipboard/issues/259)
- Ember 3.25 (#337) ([76791d5](https://github.com/jkusa/ember-cli-clipboard/commit/76791d5)), closes [#337](https://github.com/jkusa/ember-cli-clipboard/issues/337)
- relax `@ember/render-modifiers` dependency (#367) ([7fe04ef](https://github.com/jkusa/ember-cli-clipboard/commit/7fe04ef)), closes [#367](https://github.com/jkusa/ember-cli-clipboard/issues/367)
- Rename default branch to `main` ([e27143f](https://github.com/jkusa/ember-cli-clipboard/commit/e27143f))
- Update build badge ([dedab51](https://github.com/jkusa/ember-cli-clipboard/commit/dedab51))
- Update lock file ([e7e4112](https://github.com/jkusa/ember-cli-clipboard/commit/e7e4112))
- Update uuid and highlight.js (#253) ([3338133](https://github.com/jkusa/ember-cli-clipboard/commit/3338133)), closes [#253](https://github.com/jkusa/ember-cli-clipboard/issues/253)
- Upgrade to ember 3.21 (#252) ([82325c6](https://github.com/jkusa/ember-cli-clipboard/commit/82325c6)), closes [#252](https://github.com/jkusa/ember-cli-clipboard/issues/252)
- Upgrade to ember 3.22 (#277) ([b227719](https://github.com/jkusa/ember-cli-clipboard/commit/b227719)), closes [#277](https://github.com/jkusa/ember-cli-clipboard/issues/277)
- Upgrade to ember 3.28 (#368) ([843b0d7](https://github.com/jkusa/ember-cli-clipboard/commit/843b0d7)), closes [#368](https://github.com/jkusa/ember-cli-clipboard/issues/368)
- ci: migrate to github actions (#333) ([3937af4](https://github.com/jkusa/ember-cli-clipboard/commit/3937af4)), closes [#333](https://github.com/jkusa/ember-cli-clipboard/issues/333)

## 0.15.0 (2020-06-24)

- [Security] Bump acorn from 5.7.3 to 5.7.4 ([98ad16c](https://github.com/jkusa/ember-cli-clipboard/commit/98ad16c))
- 0.15.0 ([66b1caf](https://github.com/jkusa/ember-cli-clipboard/commit/66b1caf))
- Add ClipboardJS `container` support (#206) ([9734d8f](https://github.com/jkusa/ember-cli-clipboard/commit/9734d8f)), closes [#206](https://github.com/jkusa/ember-cli-clipboard/issues/206)
- Bump babel-eslint from 10.0.3 to 10.1.0 ([80a8dbb](https://github.com/jkusa/ember-cli-clipboard/commit/80a8dbb))
- Bump broccoli-funnel from 1.2.0 to 3.0.1 ([312eb16](https://github.com/jkusa/ember-cli-clipboard/commit/312eb16))
- Bump broccoli-funnel from 3.0.1 to 3.0.2 ([cd66087](https://github.com/jkusa/ember-cli-clipboard/commit/cd66087))
- Bump clipboard from 2.0.4 to 2.0.6 ([4701be9](https://github.com/jkusa/ember-cli-clipboard/commit/4701be9))
- Bump ember-angle-bracket-invocation-polyfill from 1.3.1 to 2.0.2 ([aa515d2](https://github.com/jkusa/ember-cli-clipboard/commit/aa515d2))
- Bump ember-cli from 3.15.1 to 3.15.2 ([91cf7f5](https://github.com/jkusa/ember-cli-clipboard/commit/91cf7f5))
- Bump ember-cli-babel from 7.13.2 to 7.14.1 ([5c06041](https://github.com/jkusa/ember-cli-clipboard/commit/5c06041))
- Bump ember-cli-babel from 7.14.1 to 7.17.2 ([6267e36](https://github.com/jkusa/ember-cli-clipboard/commit/6267e36))
- Bump ember-cli-fastboot from 2.2.1 to 2.2.2 ([4276fe9](https://github.com/jkusa/ember-cli-clipboard/commit/4276fe9))
- Bump ember-cli-fastboot-testing from 0.2.4 to 0.4.0 ([eaf4dce](https://github.com/jkusa/ember-cli-clipboard/commit/eaf4dce))
- Bump ember-cli-flash from 1.8.0 to 1.8.1 ([5f585a5](https://github.com/jkusa/ember-cli-clipboard/commit/5f585a5))
- Bump ember-cli-htmlbars from 4.2.0 to 4.2.2 ([6619d67](https://github.com/jkusa/ember-cli-clipboard/commit/6619d67))
- Bump ember-cli-template-lint from 1.0.0-beta.3 to 2.0.0 ([2964077](https://github.com/jkusa/ember-cli-clipboard/commit/2964077))
- Bump ember-cli-template-lint from 2.0.0 to 2.0.2 ([19cdba1](https://github.com/jkusa/ember-cli-clipboard/commit/19cdba1))
- Bump ember-decorators-polyfill from 1.1.1 to 1.1.2 ([c7a4562](https://github.com/jkusa/ember-cli-clipboard/commit/c7a4562))
- Bump ember-decorators-polyfill from 1.1.2 to 1.1.3 ([9826dbb](https://github.com/jkusa/ember-cli-clipboard/commit/9826dbb))
- Bump ember-decorators-polyfill from 1.1.3 to 1.1.5 ([6cac62e](https://github.com/jkusa/ember-cli-clipboard/commit/6cac62e))
- Bump ember-modifier from 1.0.2 to 1.0.3 ([3546a4b](https://github.com/jkusa/ember-cli-clipboard/commit/3546a4b))
- Bump ember-source from 3.15.0 to 3.16.0 ([dc77e8c](https://github.com/jkusa/ember-cli-clipboard/commit/dc77e8c))
- Bump ember-source from 3.16.0 to 3.16.1 ([3116360](https://github.com/jkusa/ember-cli-clipboard/commit/3116360))
- Bump ember-source from 3.16.1 to 3.16.3 ([6f5ed8e](https://github.com/jkusa/ember-cli-clipboard/commit/6f5ed8e))
- Bump ember-template-lint from 2.5.2 to 2.7.0 ([99b6d29](https://github.com/jkusa/ember-cli-clipboard/commit/99b6d29))
- Bump eslint from 6.8.0 to 7.0.0 ([143c808](https://github.com/jkusa/ember-cli-clipboard/commit/143c808))
- Bump eslint-plugin-ember from 7.10.1 to 8.4.0 ([c22133c](https://github.com/jkusa/ember-cli-clipboard/commit/c22133c))
- Bump eslint-plugin-ember from 7.8.1 to 7.9.0 ([20cb8fd](https://github.com/jkusa/ember-cli-clipboard/commit/20cb8fd))
- Bump eslint-plugin-ember from 7.9.0 to 7.10.1 ([43e62d4](https://github.com/jkusa/ember-cli-clipboard/commit/43e62d4))
- Bump eslint-plugin-node from 11.0.0 to 11.1.0 ([97512fb](https://github.com/jkusa/ember-cli-clipboard/commit/97512fb))
- Bump highlight.js from 9.17.1 to 9.18.1 ([b8b1507](https://github.com/jkusa/ember-cli-clipboard/commit/b8b1507))
- Bump husky from 3.1.0 to 4.2.1 ([50d0a93](https://github.com/jkusa/ember-cli-clipboard/commit/50d0a93))
- Bump husky from 4.2.1 to 4.2.3 ([047c4db](https://github.com/jkusa/ember-cli-clipboard/commit/047c4db))
- Bump husky from 4.2.3 to 4.2.5 ([74b267b](https://github.com/jkusa/ember-cli-clipboard/commit/74b267b))
- Bump prettier from 1.19.1 to 2.0.2 ([9a24396](https://github.com/jkusa/ember-cli-clipboard/commit/9a24396))
- Bump prettier from 2.0.2 to 2.0.4 ([f07002f](https://github.com/jkusa/ember-cli-clipboard/commit/f07002f))
- Bump prettier from 2.0.4 to 2.0.5 ([00eddc8](https://github.com/jkusa/ember-cli-clipboard/commit/00eddc8))
- Bump qunit-dom from 0.9.2 to 1.0.0 ([ac266b5](https://github.com/jkusa/ember-cli-clipboard/commit/ac266b5))
- Bump qunit-dom from 1.0.0 to 1.1.0 ([abcf2a2](https://github.com/jkusa/ember-cli-clipboard/commit/abcf2a2))
- Bump sass from 1.24.3 to 1.25.0 ([3dc2353](https://github.com/jkusa/ember-cli-clipboard/commit/3dc2353))
- Bump sass from 1.25.0 to 1.26.3 ([f6a2308](https://github.com/jkusa/ember-cli-clipboard/commit/f6a2308))
- Bump sass from 1.26.3 to 1.26.5 ([d3a12c6](https://github.com/jkusa/ember-cli-clipboard/commit/d3a12c6))
- Bump uuid from 3.3.3 to 3.4.0 ([4a70080](https://github.com/jkusa/ember-cli-clipboard/commit/4a70080))
- Bump uuid from 3.4.0 to 7.0.1 ([22e1e7b](https://github.com/jkusa/ember-cli-clipboard/commit/22e1e7b))
- Bump uuid from 7.0.1 to 7.0.2 ([3fc421d](https://github.com/jkusa/ember-cli-clipboard/commit/3fc421d))
- Bump uuid from 7.0.2 to 7.0.3 ([3fab5b1](https://github.com/jkusa/ember-cli-clipboard/commit/3fab5b1))
- Fix for clean-css vulnerability ([d1dfb82](https://github.com/jkusa/ember-cli-clipboard/commit/d1dfb82))
- Run prettier 2.x on project ([6290e88](https://github.com/jkusa/ember-cli-clipboard/commit/6290e88))
- Update lock file for Ember v3.17.0 ([96cd955](https://github.com/jkusa/ember-cli-clipboard/commit/96cd955))
- Update README.md ([2b99825](https://github.com/jkusa/ember-cli-clipboard/commit/2b99825))
- Upgrade ember-cli-babel ([a9b5c72](https://github.com/jkusa/ember-cli-clipboard/commit/a9b5c72))
- Upgrade to Ember v3.17.0 ([0a38cd6](https://github.com/jkusa/ember-cli-clipboard/commit/0a38cd6))
- Upgrade to ember-cli 3.16 ([215c983](https://github.com/jkusa/ember-cli-clipboard/commit/215c983))
- Use ember-auto-import to bring in ClipboardJS ([0678c5b](https://github.com/jkusa/ember-cli-clipboard/commit/0678c5b))
- Update: Don't use optional chaining for fastboot (#218) ([4af026c](https://github.com/jkusa/ember-cli-clipboard/commit/4af026c)), closes [#218](https://github.com/jkusa/ember-cli-clipboard/issues/218)

## 0.14.0 (2020-01-16)

- 0.14.0 ([27b5833](https://github.com/jkusa/ember-cli-clipboard/commit/27b5833))
- Add deploy script ([b6544ed](https://github.com/jkusa/ember-cli-clipboard/commit/b6544ed))
- Bump eslint-plugin-node from 9.2.0 to 11.0.0 ([0e8ec62](https://github.com/jkusa/ember-cli-clipboard/commit/0e8ec62))
- Bump pretty-quick from 1.11.1 to 2.0.1 ([09d1857](https://github.com/jkusa/ember-cli-clipboard/commit/09d1857))
- Create stale.yml ([c62b286](https://github.com/jkusa/ember-cli-clipboard/commit/c62b286))
- Update ember-angle-bracket-invocation-polyfill requirement ([5456aa3](https://github.com/jkusa/ember-cli-clipboard/commit/5456aa3))
- Update husky requirement from ^2.3.0 to ^3.0.0 ([6883757](https://github.com/jkusa/ember-cli-clipboard/commit/6883757))
- Update issue templates ([a1d8ee9](https://github.com/jkusa/ember-cli-clipboard/commit/a1d8ee9))
- Update issue templates ([a756e9f](https://github.com/jkusa/ember-cli-clipboard/commit/a756e9f))
- Upgrade to Ember 3.15 ([e91952d](https://github.com/jkusa/ember-cli-clipboard/commit/e91952d))

## 0.13.0 (2019-07-02)

- 0.13.0 ([bfbe82b](https://github.com/jkusa/ember-cli-clipboard/commit/bfbe82b))
- Allow copy text to be set by an action ([4ad72ba](https://github.com/jkusa/ember-cli-clipboard/commit/4ad72ba))
- refactor acceptance test and update README ([a904c2e](https://github.com/jkusa/ember-cli-clipboard/commit/a904c2e))

## 0.12.0 (2019-06-18)

- 0.12.0 ([926678b](https://github.com/jkusa/ember-cli-clipboard/commit/926678b))
- Add PrettierJS ([cdf339c](https://github.com/jkusa/ember-cli-clipboard/commit/cdf339c))
- Update dependencies ([b894de0](https://github.com/jkusa/ember-cli-clipboard/commit/b894de0)), closes [#56](https://github.com/jkusa/ember-cli-clipboard/issues/56)
- Update husky requirement from ^1.3.1 to ^2.3.0 ([08ec6da](https://github.com/jkusa/ember-cli-clipboard/commit/08ec6da))
- Upgrade to Ember 3.10.0 ([8bb6401](https://github.com/jkusa/ember-cli-clipboard/commit/8bb6401))
- Upgrade to Ember 3.7.1 (#52) ([6f7bfc8](https://github.com/jkusa/ember-cli-clipboard/commit/6f7bfc8)), closes [#52](https://github.com/jkusa/ember-cli-clipboard/issues/52)
- Upgrade to Ember 3.8.0 ([2137265](https://github.com/jkusa/ember-cli-clipboard/commit/2137265))
- Upgrade to Ember 3.9.0 ([f179aba](https://github.com/jkusa/ember-cli-clipboard/commit/f179aba))

## <small>0.11.1 (2019-01-08)</small>

- 0.11.1 ([0abc99e](https://github.com/jkusa/ember-cli-clipboard/commit/0abc99e))
- Fix formatting issues (#51) ([0b5cee8](https://github.com/jkusa/ember-cli-clipboard/commit/0b5cee8)), closes [#51](https://github.com/jkusa/ember-cli-clipboard/issues/51)
- Fix ie11 failing on destroy (#50) ([d9c5e59](https://github.com/jkusa/ember-cli-clipboard/commit/d9c5e59)), closes [#50](https://github.com/jkusa/ember-cli-clipboard/issues/50)
- Remove `isDevelopingAddon` ([4effd34](https://github.com/jkusa/ember-cli-clipboard/commit/4effd34))

## 0.11.0 (2019-01-02)

- 0.10.0 ([5177297](https://github.com/jkusa/ember-cli-clipboard/commit/5177297))
- 0.11.0 ([600f898](https://github.com/jkusa/ember-cli-clipboard/commit/600f898))
- clean up bower (#41) ([6008a22](https://github.com/jkusa/ember-cli-clipboard/commit/6008a22)), closes [#41](https://github.com/jkusa/ember-cli-clipboard/issues/41)
- Get rid of font-awesome (#42) ([4a61f6b](https://github.com/jkusa/ember-cli-clipboard/commit/4a61f6b)), closes [#42](https://github.com/jkusa/ember-cli-clipboard/issues/42)
- Provide forward compatibility when accessing container (#38) ([f3ea071](https://github.com/jkusa/ember-cli-clipboard/commit/f3ea071)), closes [#38](https://github.com/jkusa/ember-cli-clipboard/issues/38)
- Upgrade to ember-cli 3.6 (#49) ([58c5e39](https://github.com/jkusa/ember-cli-clipboard/commit/58c5e39)), closes [#49](https://github.com/jkusa/ember-cli-clipboard/issues/49)
- Use ember-auto-import for dummy app (#43) ([396f161](https://github.com/jkusa/ember-cli-clipboard/commit/396f161)), closes [#43](https://github.com/jkusa/ember-cli-clipboard/issues/43)

## 0.9.0 (2018-03-28)

- 0.9.0 ([74576de](https://github.com/jkusa/ember-cli-clipboard/commit/74576de))
- Allow event listener to be scoped to copy button node ([0a6c178](https://github.com/jkusa/ember-cli-clipboard/commit/0a6c178))
- Fix Chrome headless problem on Travis ([9b58ba5](https://github.com/jkusa/ember-cli-clipboard/commit/9b58ba5)), closes [/github.com/travis-ci/travis-ci/issues/8836#issuecomment-356362524](https://github.com//github.com/travis-ci/travis-ci/issues/8836/issues/issuecomment-356362524)
- Tweak copy icon layout ([3502c2d](https://github.com/jkusa/ember-cli-clipboard/commit/3502c2d))
- Upgrade ClipboardJS to 2.0 (#36) ([574cb9e](https://github.com/jkusa/ember-cli-clipboard/commit/574cb9e)), closes [#36](https://github.com/jkusa/ember-cli-clipboard/issues/36)
- Use this.import (#37) ([fa4b711](https://github.com/jkusa/ember-cli-clipboard/commit/fa4b711)), closes [#37](https://github.com/jkusa/ember-cli-clipboard/issues/37)

## <small>0.8.1 (2017-11-07)</small>

- 0.8.1 ([a7adf24](https://github.com/jkusa/ember-cli-clipboard/commit/a7adf24))
- Remove blueprint directory ([8255637](https://github.com/jkusa/ember-cli-clipboard/commit/8255637))
- Upgrade to ember-cli-2.16.0 ([e2e0a4e](https://github.com/jkusa/ember-cli-clipboard/commit/e2e0a4e))

## 0.8.0 (2017-07-08)

- 0.8.0 ([1b06029](https://github.com/jkusa/ember-cli-clipboard/commit/1b06029))
- Add fastboot as dev dependency for dummy app ([55df627](https://github.com/jkusa/ember-cli-clipboard/commit/55df627))
- Bump clipboard.js to 1.7.1 ([e4ca15e](https://github.com/jkusa/ember-cli-clipboard/commit/e4ca15e))
- Make this addon FastBoot compatible ([a0bba57](https://github.com/jkusa/ember-cli-clipboard/commit/a0bba57))
- Update to ember-cli-2.13.3 ([236ee97](https://github.com/jkusa/ember-cli-clipboard/commit/236ee97))

## 0.7.0 (2017-05-20)

- 0.7.0 ([3e016b8](https://github.com/jkusa/ember-cli-clipboard/commit/3e016b8))
- Add `aria-label` attribute. ([843536c](https://github.com/jkusa/ember-cli-clipboard/commit/843536c))
- Add documentation for button attribute properties ([2d8b6f0](https://github.com/jkusa/ember-cli-clipboard/commit/2d8b6f0))

## 0.6.0 (2017-05-16)

- 0.6.0 ([5f56d8e](https://github.com/jkusa/ember-cli-clipboard/commit/5f56d8e))
- Add a helper to check clipboard.js is supported or not ([7f37020](https://github.com/jkusa/ember-cli-clipboard/commit/7f37020))
- Add another example to demonstrate the helper ([702ca84](https://github.com/jkusa/ember-cli-clipboard/commit/702ca84))
- Add tests to verify the helper is registered correctly ([77e0375](https://github.com/jkusa/ember-cli-clipboard/commit/77e0375))
- Bind the title attribute ([3b247c3](https://github.com/jkusa/ember-cli-clipboard/commit/3b247c3))
- Correct syntax highlighting in README ([a4923aa](https://github.com/jkusa/ember-cli-clipboard/commit/a4923aa))
- Remove dummy.css from tests/index.html ([7d41688](https://github.com/jkusa/ember-cli-clipboard/commit/7d41688))
- Update documentation ([4ab6f2a](https://github.com/jkusa/ember-cli-clipboard/commit/4ab6f2a))
- Update ember-cli-github-pages to v0.1.2 ([2d31e5f](https://github.com/jkusa/ember-cli-clipboard/commit/2d31e5f))
- Use clipboard 1.6.0 or later to use Clipboard.isSupported() ([f8f64ef](https://github.com/jkusa/ember-cli-clipboard/commit/f8f64ef))

## 0.5.0 (2017-01-20)

- 0.5.0 ([361d59f](https://github.com/jkusa/ember-cli-clipboard/commit/361d59f))
- Add code-block dummy app component ([f2c39c1](https://github.com/jkusa/ember-cli-clipboard/commit/f2c39c1))
- Add test helpers ([b1a18ba](https://github.com/jkusa/ember-cli-clipboard/commit/b1a18ba))
- Fix startApp for older ember versions ([9f1604e](https://github.com/jkusa/ember-cli-clipboard/commit/9f1604e))
- Update README.md ([0466fa1](https://github.com/jkusa/ember-cli-clipboard/commit/0466fa1))
- Upgrade to ember-cli-2.10.0 ([629b604](https://github.com/jkusa/ember-cli-clipboard/commit/629b604))
- Use closure actions in dummy app ([cd08add](https://github.com/jkusa/ember-cli-clipboard/commit/cd08add))

## <small>0.4.1 (2016-08-02)</small>

- 0.4.1 ([975e1b9](https://github.com/jkusa/ember-cli-clipboard/commit/975e1b9))
- Remove deprecation warnings. Update ember-cli-htmlbars. ([3335e22](https://github.com/jkusa/ember-cli-clipboard/commit/3335e22))

## 0.4.0 (2016-06-16)

- 0.4.0 ([3868f12](https://github.com/jkusa/ember-cli-clipboard/commit/3868f12))
- Add download badge to README ([7b35dc2](https://github.com/jkusa/ember-cli-clipboard/commit/7b35dc2))
- add support for disabled attribute ([fdb2b8c](https://github.com/jkusa/ember-cli-clipboard/commit/fdb2b8c))

## <small>0.3.2 (2016-04-12)</small>

- 0.3.2 ([e10e419](https://github.com/jkusa/ember-cli-clipboard/commit/e10e419))
- Remove bower package requirement. ([911e4e6](https://github.com/jkusa/ember-cli-clipboard/commit/911e4e6))

## <small>0.3.1 (2016-03-10)</small>

- Don’t add clipboard.js when running under Fastboot ([87645d1](https://github.com/jkusa/ember-cli-clipboard/commit/87645d1))
- Released v0.3.1 ([b8c46e4](https://github.com/jkusa/ember-cli-clipboard/commit/b8c46e4))
- Released v0.3.1 ([d4c03a7](https://github.com/jkusa/ember-cli-clipboard/commit/d4c03a7))
- Released v0.4.0 ([dc471a3](https://github.com/jkusa/ember-cli-clipboard/commit/dc471a3))
- Upgrade ember-qunit to 0.4.16 ([f25a2e5](https://github.com/jkusa/ember-cli-clipboard/commit/f25a2e5))
- Upgrade to ember-cli 2.4.2 ([7cc7eeb](https://github.com/jkusa/ember-cli-clipboard/commit/7cc7eeb))

## 0.3.0 (2015-11-26)

- 0.3.0 ([75e449c](https://github.com/jkusa/ember-cli-clipboard/commit/75e449c))
- Upgrade to clipboard.js 1.5.5 ([8bf9c90](https://github.com/jkusa/ember-cli-clipboard/commit/8bf9c90))

## <small>0.2.1 (2015-10-22)</small>

- 0.2.0 ([f888371](https://github.com/jkusa/ember-cli-clipboard/commit/f888371))
- 0.2.1 ([75b0859](https://github.com/jkusa/ember-cli-clipboard/commit/75b0859))
- Add cut example ([8c234b9](https://github.com/jkusa/ember-cli-clipboard/commit/8c234b9))
- Add demo page & browser support to README ([b78f445](https://github.com/jkusa/ember-cli-clipboard/commit/b78f445))
- Add demoURL ([465191b](https://github.com/jkusa/ember-cli-clipboard/commit/465191b))
- Add ember observer score ([cd03bd9](https://github.com/jkusa/ember-cli-clipboard/commit/cd03bd9))
- Add padding to body ([f3b5091](https://github.com/jkusa/ember-cli-clipboard/commit/f3b5091))
- Added ember-cli-github-pages addon ([6d3daa2](https://github.com/jkusa/ember-cli-clipboard/commit/6d3daa2))
- Enhance direct copy example ([0e5c223](https://github.com/jkusa/ember-cli-clipboard/commit/0e5c223))
- Enhance example app ([9048d0e](https://github.com/jkusa/ember-cli-clipboard/commit/9048d0e))
- Indicate no flash in README ([3118620](https://github.com/jkusa/ember-cli-clipboard/commit/3118620))
- Update clipboardjs version ([63f7080](https://github.com/jkusa/ember-cli-clipboard/commit/63f7080))
- Updating vendor prefixes ([991ee36](https://github.com/jkusa/ember-cli-clipboard/commit/991ee36))

## 0.1.0 (2015-10-07)

- 0.0.3 ([f60d35b](https://github.com/jkusa/ember-cli-clipboard/commit/f60d35b))
- 0.1.0 ([507b62a](https://github.com/jkusa/ember-cli-clipboard/commit/507b62a))
- Add build status to README ([79c92c5](https://github.com/jkusa/ember-cli-clipboard/commit/79c92c5))
- Add repository url ([18c9641](https://github.com/jkusa/ember-cli-clipboard/commit/18c9641))
- Add support for action and target attributes ([1a254a4](https://github.com/jkusa/ember-cli-clipboard/commit/1a254a4))
- Initial commit ([af756aa](https://github.com/jkusa/ember-cli-clipboard/commit/af756aa))
- Initial Commit from Ember CLI v1.13.8 ([c4df4e1](https://github.com/jkusa/ember-cli-clipboard/commit/c4df4e1))
- Set default type attribute to button ([986a450](https://github.com/jkusa/ember-cli-clipboard/commit/986a450))
- Update author ([9120a29](https://github.com/jkusa/ember-cli-clipboard/commit/9120a29))
