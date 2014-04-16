define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

this["templates"]["index"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"index-page\">\n  <div class=\"header\">\n    <div class=\"container\">\n      <h1>Hello, I am Index.</h1>\n      <h2>I have dreams of becoming beautiful.</h2>\n    </div>\n  </div>\n\n  <div class=\"content-wrap container\">\n    <div class=\"sidebar\">\n      <div class=\"nav\">\n        <a id=\"page-one-nav\" href=\"#/page/one\">Page One</a>\n        <a id=\"page-two-nav\" href=\"#/page/two\">Page Two</a>\n      </div>\n    </div>\n\n    <div id=\"content\"></div>\n  </div>\n</div>\n";
  },"useData":true});

this["templates"]["page_one"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"page-one\">\n  <h3>Page One</h3>\n\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien diam, consequat tincidunt lacus vel, gravida varius tellus. Morbi tortor elit, consequat et nunc sed, semper iaculis dolor. Sed at ornare elit, ut congue ligula. Vestibulum nec viverra diam. Sed sit amet malesuada urna, at ultricies leo. Integer quis mi nisi. Maecenas at volutpat est.\n  </p>\n</div>";
  },"useData":true});

this["templates"]["page_two"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"page-two\">\n  <h3>Page Two</h3>\n\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo eu quam quis varius. Nam pharetra a elit sit amet convallis. Donec non nibh sed turpis porttitor euismod id eu augue. Vestibulum tincidunt iaculis purus, a feugiat quam rutrum ac. Morbi elementum elementum risus, quis ultrices sem lobortis a. Sed vitae nibh blandit, facilisis nibh placerat, commodo odio. Praesent cursus eros sed accumsan gravida. Etiam ut dolor non lectus cursus aliquet. Phasellus vitae ipsum id mauris aliquam faucibus. Vestibulum quis ultrices nulla. Pellentesque vulputate tortor eu mauris facilisis, malesuada fermentum nunc adipiscing. Integer tristique turpis vel convallis feugiat.\n  </p>\n</div>";
  },"useData":true});

return this["templates"];

});