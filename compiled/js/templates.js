define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

this["templates"]["cutting_room"] = Handlebars.default.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n                <li>\n                    <img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.uri)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                    <span class=\"thumbnail-duration\">"
    + escapeExpression(((helper = helpers.duration || (depth0 && depth0.duration)),(typeof helper === functionType ? helper.call(depth0, {"name":"duration","hash":{},"data":data}) : helper)))
    + "</span>\n                    <span class=\"thumbnail-name\">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                </li>\n            ";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n                <li>\n                    <audio src=\"audio.ogg\" controls>\n                        <p>Your browser does not support the audio element </p>\n                    </audio>\n                    <span class=\"audio-name\">"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                </li>\n            ";
},"5":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return "\n                <li>\n                    <img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.uri)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                </li>\n            ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"cutting-room\">\n    <section class=\"player\">\n        <video src=\"media/copter.ogv\" controls preload=\"auto\">\n            Your browser does not support the <code>video</code> element.\n        </video>\n    </section>\n\n    <section class=\"library\">\n        <ul>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.library)),stack1 == null || stack1 === false ? stack1 : stack1.videos), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n        <ul>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.library)),stack1 == null || stack1 === false ? stack1 : stack1.audio), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </section>\n\n    <section class=\"timeline\">\n        <ol>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.storyboard)),stack1 == null || stack1 === false ? stack1 : stack1.panels), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n        </ol>\n    </section>\n\n    <section class=\"social\">\n\n    </section>\n</div>";
},"useData":true});

this["templates"]["index"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"index-page\">\n  <div class=\"header\">\n    <div class=\"container\">\n      <h1>Hello, I am Index.</h1>\n      <h2>I have dreams of becoming beautiful.</h2>\n    </div>\n  </div>\n\n  <div class=\"content-wrap container\">\n    <div class=\"sidebar\">\n      <div class=\"nav\">\n        <a id=\"page-one-nav\" href=\"#/page/one\">Page One</a>\n        <a id=\"page-two-nav\" href=\"#/page/two\">Page Two</a>\n      </div>\n    </div>\n\n    <div id=\"content\"></div>\n  </div>\n</div>\n";
  },"useData":true});

this["templates"]["page_one"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"page-one\">\n  <h3>Page One</h3>\n\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien diam, consequat tincidunt lacus vel, gravida varius tellus. Morbi tortor elit, consequat et nunc sed, semper iaculis dolor. Sed at ornare elit, ut congue ligula. Vestibulum nec viverra diam. Sed sit amet malesuada urna, at ultricies leo. Integer quis mi nisi. Maecenas at volutpat est.\n  </p>\n</div>";
  },"useData":true});

this["templates"]["page_two"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"page-two\">\n  <h3>Page Two</h3>\n\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo eu quam quis varius. Nam pharetra a elit sit amet convallis. Donec non nibh sed turpis porttitor euismod id eu augue. Vestibulum tincidunt iaculis purus, a feugiat quam rutrum ac. Morbi elementum elementum risus, quis ultrices sem lobortis a. Sed vitae nibh blandit, facilisis nibh placerat, commodo odio. Praesent cursus eros sed accumsan gravida. Etiam ut dolor non lectus cursus aliquet. Phasellus vitae ipsum id mauris aliquam faucibus. Vestibulum quis ultrices nulla. Pellentesque vulputate tortor eu mauris facilisis, malesuada fermentum nunc adipiscing. Integer tristique turpis vel convallis feugiat.\n  </p>\n</div>";
  },"useData":true});

this["templates"]["upload_media"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Upload Media</h2>\n\n\n<form action=\"/api/medium\" method=\"post\" enctype=\"multipart/form-data\">\n    <p>\n        <input type=\"file\" name=\"source\"/>\n    </p>\n\n    <p>\n        <label>\n            name <input type=\"text\" name=\"name\"/>\n        </label>\n    </p>\n\n    <p>\n        <input type=\"submit\"/>\n    </p>\n</form>";
  },"useData":true});

return this["templates"];

});