# Pestle [![Build Status](http://img.shields.io/travis/framini/pestle/master.svg?style=flat)](https://travis-ci.org/framini/pestle) [![Dependency Status](http://img.shields.io/david/framini/pestle.svg?style=flat)](https://david-dm.org/framini/pestle) [![devDependency Status](http://img.shields.io/david/dev/framini/pestle.svg?style=flat)](https://david-dm.org/framini/pestle#info=devDependencies)


## Origins of the Pestle.js

Comming soon...

---

## Audience

This is document for is equally designed for front-end and back-end
**developers**. Target developers should familiar with JavaScript.

WebOps team members such as **system administrators** and **media support
engineers** will find this beneficial for end-user production support requests. Constituents of that team may also find this document helpful.

---

## Pestle.js Set-Up and Usage

Comming soon...

---

#### Notes on Usage

---

### Contributing

#### Installation:

1. Ensure you have the base dev environment tools installed:
- Xcode (install from App Store or download directly from Apple)
- Xcode Command Line Tools: ```xcode-select --install```
- Install [Homebrew](http://brew.sh/): ```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``` you may need to run ```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``` and make certain that your user has administrative rights for the file system
  1. You may need to install XCode
  - Make sure everything is running smoothly with ```brew doctor```
- Install [Node](http://nodejs.org/): ```brew install node```
- Install [Gulp](http://gulpjs.com/): ```npm install -g gulp```
- Install [Bower](http://bower.io/): ```npm install -g bower```
- Install packages by running ```npm install && bower install```

#### Development

---
##### `gulp dist`

Run this command to build a production version of the modules-video code.  Must be run before submitting a pull request.

---
##### `gulp`

Run this command while you are developing to build a development version of the code, open the local project in the browser, and start a watch task that will compile and reload your code as you develop.

---
##### `gulp test`

Run this command to execute the test suite

---
##### `gulp watch`

Run this command to open the base example index page in your default browser.  Useful if you need to test a branch (i.e. as part of a peer review) or if you want to load the page without having to rebuild the app.

---
##Release Notes

---
These are generated via the [git-release-notes](https://github.com/ariatemplates/git-release-notes#installation) plugin for NodeJS. Follow the setup instructions as noted there.

###Usage

Use the following command, with the tag range you're creating notes for and the target file/type.

```bash
git-release-notes v0.1.5..v0.1.6 markdown > releases/v0_1_6.md
```

## Contacts

* Chuck Carpenter, Tech Expert ([ccarpent@ngs.org](mailto:ccarpent@ngs.org))

* Asa Baylus, Tech Expert ([abaylus@ngs.org](mailto:abaylus@ngs.org))
