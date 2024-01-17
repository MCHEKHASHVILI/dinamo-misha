export default function ({ $axios, redirect, app }) {
  const locale = app.i18n.locale === 'ka' ? '' : 'en';
  $axios.setBaseURL(`${process.env.apiUrl + locale}/wp-json/wpc/v2`);

  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    const locale = newLocale === 'ka' ? '' : 'en';
    $axios.setBaseURL(`${process.env.apiUrl + locale}/wp-json/wpc/v2`);
  };

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect('/400');
    }
  });
}
