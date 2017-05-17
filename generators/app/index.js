'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Welcome to the top-notch ' + chalk.red('generator-asn') + ' generator!'
    // ));

    const prompts = [{
      type: 'input',
      name: 'appname',
      message: 'your app name',
      default: this.appname,
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('asset'),
      this.destinationPath('./'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );
  }

  install() {
    this.npmInstall();
    // return;
  }
};
