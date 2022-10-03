if (window.location.href.startsWith("https://exam.timeedit.com/")) {
	var s = document.createElement('script');
	s.src = chrome.runtime.getURL('inject.js');
	s.onload = function() {
    		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}
