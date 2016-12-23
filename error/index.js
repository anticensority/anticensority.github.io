'use strict';

/* global Raven:false, hljs:false */
+function() {
  /*
  Raven.config('https://bc534321358f455b9ae861740c2d3af8@sentry.io/116007', {
    release: chrome.runtime.getManifest().version,
    autoBreadcrumbs: false,
  }).install();
  */

  const clientInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    version: '0.0.0.15'
  };
  document.querySelector('#c-user-agent').innerText = clientInfo.userAgent;
  document.querySelector('#c-platform').innerText = clientInfo.platform;
  document.querySelector('#c-version').innerText = clientInfo.version;

  const originalComment = document.querySelector('#comment').value.trim();

  const output = document.getElementById('output');

  let parcel;
  let err;
  let title = '';

  let jsonParcel = decodeURIComponent(window.location.search.substr(1).trim());
  if (jsonParcel) {
    try {
      parcel = JSON.parse(atob(jsonParcel));
    } catch(e) {
      parcel = {
        raw: jsonParcel,
        parseError: e.message,
      };
    }
    parcel = Object.assign(clientInfo, parcel);
    err = parcel.error || parcel;
    title = err && err.message || err || 'Untitled';

    output.innerHTML = hljs.highlight(
      'json',
      JSON.stringify(parcel, null, 2)
    ).value;
    document.querySelectorAll('.if-no-error').forEach( (ner) => ner.style.display = 'none' );
  } else {
    document.querySelectorAll('.if-error').forEach( (er) => er.style.display = 'none' );
  }

  document.getElementById('sentry-report').onclick = () => {

    let comment = document.getElementById('comment').value.trim();
    if (comment === originalComment) {
      comment = '';
    }
    if (!comment && !json) {
      return alert('Посылать нечего, так как вы не оставили комментария.');
    }
    const extra = json && JSON.parse(json) || {};
    if (comment) {
      extra.comment = comment;
    }
    fetch('https://sentry.io/api/116007/store/?sentry_version=7&sentry_client=raven-js%2F3.8.1&sentry_key=bc534321358f455b9ae861740c2d3af8', {
      method: 'POST',
      body: JSON.stringify({
        culrpit: '', // filename of oldest stack frame
        event_id: '',// uuid of event
        exception: {
          values: [{
            type: error.name,
            value: error.message,
            stacktrace: {
              frames: [{
                colno: error.colno,
                filename:"chrome-extension://bla-bla",
                function: "bgPage.apis.errorHandlers.installListenersOn",
                in_app: true,
                lineno: error.lineno
              }]
            } // oldest to newest
          }]
        },
        logger: 'javascript',
        platform: 'javascript',
        project: '116007',
        release: '0.0.0.15',
        request: {
          headers: {
            'User-Agent':'',
          },
          url:'',
        },
        extra: extra,
      })
    });
    /*
    Raven.captureException(e, {
      extra: extra,
      onSuccess: () => alert('Готово'),
      onError: (err) => {

        throw err;

      },
    });*/

  };

  const version = 'NOT YET';
  document.getElementById('github-search').href =
    'https://rebrand.ly/ac-search-issues?q=' + encodeURIComponent(title);

  document.getElementById('github-report').onclick = function() {

    const comment = document.getElementById('comment').value.trim();
    const body = comment + `
### Ошибка

\`\`\`json
${json}
\`\`\`

Версия: ${version}
`;
    this.href = `https://rebrand.ly/ac-new-issue?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    return true;

  };

  const btnCssText = window.getComputedStyle( document.querySelector('button') ).cssText;
  document.querySelectorAll('.btn').forEach( (btn) => btn.style.cssText = btnCssText );

  document.body.style.display = '';

  const ta = document.querySelector('textarea');
  document.documentElement.style.background =
      'linear-gradient(to bottom, black ' +
      (ta.offsetTop + parseInt(getComputedStyle(ta).height)*0.6) +
      'px, transparent), url("./err.jpg") bottom';

}();
