'use strict';

const renderLinks = (url) => `
  <h3>Веб-прокси</h3>
    <a href="https://www.vpnbook.com/webproxy">vpnbook [COPY]</a><br/>
    <a href="https://webproxy.com/browse.php?u=${url}">webproxy.com [COPY]</a><br/>
    <a href="http://buka.link/browse.php?u=${url.replace(/\?.+/,'')}">buka.link [AVAST, COPY]</a><br/>
    <a href="https://hide.me/en/proxy">hide.me [COPY]</a><br/>
    <a href="https://www.hidemyass.com/proxy">Hide my ass [COPY]</a><br/>
    <a href="http://usafastproxy.com">USA Fast Proxy [COPY, HTTP, GLYPE]</a><br/>
    <a href="http://www.mysafesurfing.com">My Safe Surfing [COPY, HTTP, GLYPE]</a><br/>
    <a href="https://www.google.com/search?q=webproxy">Другие</a>
  <h3>Мобильная версия</h3>
    <a href="http://www.google.ie/gwt/x?u=${url}">Google Mobile</a>
  <h3>Из кэша поисковиков</h3>
    <a href="https://webcache.googleusercontent.com/search?q=cache:${url}">Google</a></br>
    <a href="http://viewcached.com/${url}">viewcached.com</a></br>
    <a href="http://cachedview.com">cachedview.com [COPY]</a>
  <h3>Из архивов Интернета</h3>
    <a href="http://web.archive.org/web/*/${url}">web.archive.org</a><br/>
    <a href="http://archive.is/${url}">archive.is</a><br/>
    <a href="http://timetravel.mementoweb.org">Momento Time Travel [COPY]</a>
  <h3>Снимки страниц</h3>
    <a href="https://screenshotmachine.com">Screenshot Machine [COPY]</a><br/>
    <a href="https://www.url2png.com">url2png [COPY]</a><br/>
    <a href="http://site2pic.com/">site2pic [COPY]</a><br/>
    <a href="https://browshot.com">brow shot [COPY]</a>
  <h3>Инструменты</h3>
    <a href="http://isup.me/${url}">Сайт доступен из-за границы? isup.me</a><br/>
    <a href='
			data:text/html;charset=utf8,<title>Запрашиваю...</title>
	    <form method="POST" action="https://www.host-tracker.com/ru/InstantCheck/Create">
  	    <input name="InstantCheckUrl" value="${url}" type="hidden">
	    </form>
  	  <script>document.forms[0].submit()</script>
		'>Сайт доступен из-за границы? host-tracker</a>
`;

const defaultUrl = 'http://www.kasparov.ru/subject.php?id=189';
const getHash = () => decodeURIComponent(window.location.hash.substring(1));

window.onhashchange = () => {

  document.getElementById('output').innerHTML = renderLinks( getHash() || defaultUrl );

}

const url = getHash();

document.body.innerHTML = `
  <form onsubmit="window.location.hash = '#' + document.querySelector('input.url-input').value.trim(); return false;">
    <div style="display: flex; font-size: 2em">
      <span style="color: navy">#&nbsp;</span>
      <input type="url" placeholder="${defaultUrl}" value="${url}" autofocus
         style="width: 100%; border: 0; outline: none; font-size: 1em; color: navy"
         class="url-input"
         oninvalid="if(/^https?:\\/\\//.test(event.target.value)) return true; this.value = 'http://' + this.value; this.form.onsubmit()"
      />
    </div>
    <input type="submit" value="Обновить ссылки">
    <button class="copy-button">Копировать</button>
    <div>
      <code>[COPY] — нужно будет ввести адрес</code>
    </div>
  </form>
  <hr style="border-width: 1px 0 0 0"/>
  <div id="output">
    ${ renderLinks(url || defaultUrl) }
  </div>
`;

const urlInput = document.querySelector('input.url-input');
urlInput.onfocus = function() { this.select() };
document.querySelector('button.copy-button').onclick = () => { urlInput.focus(); document.execCommand('copy') };
