#!/usr/bin/env node

var fs = require('fs-jetpack');
var path = require('path');
var merge = require('merge');
var chalk = require('chalk');

var cwd = fs.cwd();
var dir = path.join(__dirname);
var karma = fs.read(path.join(__dirname, 'karma.conf.js'));
var pack = fs.read(path.join(__dirname, 'package.json'), 'json');
var config = fs.read(path.join(cwd, 'package.json'), 'json');
var babelrc=fs.read(path.join(cwd,'.babelrc'),'json');
var vue = fs.read(path.join(__dirname, 'src.vue'));
var spec = fs.read(path.join(__dirname, 'test.js'));
var babel = fs.read(path.join(__dirname, 'babelrc'), 'json');

if (!config) {
  console.log(chalk.bold.red('Error: not find package.json'));
  return;
} else {
  config.devDependencies = merge(config.devDependencies || {}, pack.devDependencies);
  fs.dir('test').dir('unit');
  fs.file(path.join(cwd, 'karma.conf.js'), {
    content: karma
  });
  fs.file(path.join(cwd, 'package.json'), {content: config});
  fs.file(path.join(cwd, 'test', 'example.vue'), {
    content: vue
  });
  fs.file(path.join(cwd, 'test', 'unit', 'example.spec.js'), {
    content: spec
  });
  if(!babelrc){
    fs.file(path.join(cwd,'.babelrc'),{
      content:babel
    })
  }
  console.log(chalk.bold.green('sucess! \t\n\r npm install && karma start'));
}
