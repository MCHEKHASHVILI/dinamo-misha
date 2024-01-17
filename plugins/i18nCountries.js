import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/ka.json'));

function getNames(locale) {
  return countries.getNames(locale);
}

export default ({ app }, inject) => {
  inject('getNames', (locale) => {
    return getNames(locale);
  });
};
