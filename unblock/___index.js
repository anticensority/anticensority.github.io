'use strict';

const defaultUrl = 'http://www.kasparov.ru/subject.php?id=189';
const getHash = () => decodeURIComponent(window.location.hash.substring(1));
const url = getHash();

document.body.innerHTML = `
  <form
    class="url-form"
  >
    <div style="display: flex; font-size: 2em">
      <span style="color: navy">#&nbsp;</span>
      <input type="url" placeholder="${defaultUrl}" value="${url}" autofocus
         style="width: 100%; border: 0; outline: none; font-size: 1em; color: navy"
         class="url-input"
      />
    </div>
    <input type="submit" value="Обновить ссылки">
    <button class="copy-button">Копировать</button>
    <div>
      <code>[COPY] — нужно будет ввести адрес</code>
    </div>
  </form>
  <hr style="border-width: 1px 0 0 0"/>
  <div id="output" style="display: flex; white-space: pre;"></div>
`;

const renderLinks = (url) => `
  <div>
  <h3>Веб-прокси</h3>

    <a href="https://www.vpnbook.com/webproxy">vpnbook [COPY]</a><br/>
    <a href="https://webproxy.com/browse.php?u=${url}">webproxy.com [COPY]</a><br/>
    <a href="https://hide.me/en/proxy">hide.me [COPY]</a><br/>
    <a href="https://www.hidemyass.com/proxy">Hide my ass [COPY]</a><br/>
    <a href="http://usafastproxy.com">USA Fast Proxy [COPY, HTTP, GLYPE]</a><br/>
    <a href="http://www.mysafesurfing.com">My Safe Surfing [COPY, HTTP, GLYPE]</a><br/>
    <a href="https://www.google.com/search?q=webproxy">Другие</a>
  </div>

  <div>
  <h3>Мобильная версия</h3>

    <a href="http://www.google.ie/gwt/x?u=${url}">Google Mobile</a>
  </div>

  <div>
  <h3>Из кэша поисковиков</h3>

    <a href="https://webcache.googleusercontent.com/search?q=cache:${url}">Google</a></br>
    <a href="http://viewcached.com/${url}">viewcached.com</a></br>
    <a href="http://cachedview.com">cachedview.com [COPY]</a>
  </div>

  <div>
  <h3>Из архивов Интернета</h3>

    <a href="http://web.archive.org/web/*/${url}">web.archive.org</a><br/>
    <a href="http://archive.is/${url}">archive.is</a><br/>
    <a href="http://timetravel.mementoweb.org">Momento Time Travel [COPY]</a>
  </div>

  <div>
  <h3>Снимки страниц</h3>

    <a href="https://screenshotmachine.com">Screenshot Machine [COPY]</a><br/>
    <a href="https://www.url2png.com">url2png [COPY]</a><br/>
    <a href="http://site2pic.com/">site2pic [COPY]</a><br/>
    <a href="https://browshot.com">brow shot [COPY]</a>
  </div>

  <div>
  <h3>Инструменты</h3>

    <a href="http://isup.me/${url}">Сайт доступен из-за границы? isup.me</a><br/>
    <a href="
			data:text/html;charset=utf8,<title>Запрашиваю...</title>
	    <form class='tracker-form' method='POST' action='https://www.host-tracker.com/ru/InstantCheck/Create'>
  	    <input name='InstantCheckUrl' value='${url}' type='hidden'>
	    </form>
  	  <script>document.querySelector('.tracker-form').submit()</script>
		">Сайт доступен из-за границы? host-tracker</a>
  </div>
`;

const renderOutput = () => {

  console.log('RENDER');
  document.getElementById('output').innerHTML = renderLinks( getHash() || defaultUrl );

};

const urlInput = document.querySelector('input.url-input');

const submitUrl = () => {

  console.log('check');
  if( urlInput.checkValidity() ) {
    console.log('VALIDDDD');
    urlInput.form.onsubmit();
  }

};

urlInput.form.onsubmit = function () {

  console.log('SUBMIT');
  const newHash = urlInput.value.trim();
  if( getHash() === newHash ) {
    renderOutput();
  }
  else {
    window.location.hash = newHash;
  }
  return false;

};

urlInput.oninvalid = () => {

  console.log('INVALID');
  if(/^https?:\/\//.test(event.target.value)) {
    return true;
  }
  window.location.hash = '#' + 'http://' + urlInput.value;
  return false;

};

window.onhashchange = () => {

  console.log('HASHY');
  urlInput.value = getHash();
  submitUrl();

}

console.log('URL', url);
if(url) {
  submitUrl();
}
else {
  renderOutput();
}

urlInput.onfocus = function() { this.select() };
document.querySelector('button.copy-button').onclick = () => { urlInput.focus(); document.execCommand('copy') };