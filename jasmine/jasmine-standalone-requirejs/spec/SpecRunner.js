require([
  	'domReady',
	 'jasmine',
  	'jasmine-html',

  	'spec/titan'
  	// add new specs here
],
function(domReady, jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  domReady(function () {
    jasmineEnv.execute();
  });
});
