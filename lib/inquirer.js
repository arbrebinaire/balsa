const inquirer = require('inquirer');

module.exports = {
  askGoogleAccount: () => {
    const questions = [
      {
        name: 'value',
        type: 'input',
        message: 'Entrer une adresse Gmail ou G Suite (ou "q" lorsque terminé):',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return "Prière d'entrer une adresse courriel valable.";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};
