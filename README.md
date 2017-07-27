# Just Did It

Simple Vue.js to do application.

![Screenshot of Just Did It](https://s4.postimg.org/yx44brokd/Screen_Shot_2017-07-26_at_13.12.10.png)

## Setup

App uses [Yarn package manager](https://yarnpkg.com/lang/en/).

### Setting up `dest` directory

This command will make new `dest` directory and compile CSS and CoffeeScript files from `src` directory.

```sh
yarn run setup
```

### Compiling CSS separately

```sh
yarn run css
```

### Compiling CoffeeScript separately

```sh
yarn run coffee
```

## Usage

Just Did It has some useful commands for manipulation of items.

### Deleting

```
:delete [ all | done | undone | last ]
```

### Setting

```
:set [ all done | all undone | all counter ]
```