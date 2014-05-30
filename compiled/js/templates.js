define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

this["templates"]["cutting_room"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"cutting-room\">\n    <section class=\"player\">\n        <video id=\"player\" src=\"media/copter.ogv\" controls preload=\"auto\">\n            Your browser does not support the <code>video</code> element.\n        </video>\n    </section>\n\n    <div class=\"toolbox\">\n        <ul class=\"tabs\">\n            <li id=\"video-tab\" class=\"active\">Video</li>\n            <li id=\"revisions-tab\">Revisions</li>\n            <li id=\"chat-tab\">Chat</li>\n        </ul>\n\n        <section class=\"library toolbox-section active\" id=\"library\">\n\n        </section>\n\n        <section class=\"revisions toolbox-section\" id=\"revisions\">\n\n        </section>\n    </div>\n\n    <section id=\"workspace\" class=\"workspace\">\n\n    </section>\n\n    <section class=\"social\">\n\n    </section>\n</div>";
  },"useData":true});

this["templates"]["index"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"index-page\">\n  <div class=\"header\">\n    <div class=\"container\">\n      <h1>Hello, I am Index.</h1>\n      <h2>I have dreams of becoming beautiful.</h2>\n    </div>\n  </div>\n\n  <div class=\"content-wrap container\">\n    <div class=\"sidebar\">\n      <div class=\"nav\">\n        <a id=\"page-one-nav\" href=\"#/page/one\">Page One</a>\n        <a id=\"page-two-nav\" href=\"#/page/two\">Page Two</a>\n      </div>\n    </div>\n\n    <div id=\"content\"></div>\n  </div>\n</div>\n";
  },"useData":true});

this["templates"]["media"] = Handlebars.default.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n            <li class=\"medium\" id=\"medium-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                <img class=\"medium-thumb\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.uri)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                <p class=\"medium-name\">\n                    "
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\n                </p>\n            </li>\n        ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"media-widget\">\n    <ul class=\"media-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.media), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n    </ul>\n\n    <div class=\"control-bar\">\n        <a id=\"upload-media\">Upload Media</a>\n    </div>\n</div>";
},"useData":true});

this["templates"]["page_one"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"page-one\">\n  <h3>Page One</h3>\n\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien diam, consequat tincidunt lacus vel, gravida varius tellus. Morbi tortor elit, consequat et nunc sed, semper iaculis dolor. Sed at ornare elit, ut congue ligula. Vestibulum nec viverra diam. Sed sit amet malesuada urna, at ultricies leo. Integer quis mi nisi. Maecenas at volutpat est.\n  </p>\n</div>";
  },"useData":true});

this["templates"]["page_two"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"page-two\">\n  <h3>Page Two</h3>\n\n  <p>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo eu quam quis varius. Nam pharetra a elit sit amet convallis. Donec non nibh sed turpis porttitor euismod id eu augue. Vestibulum tincidunt iaculis purus, a feugiat quam rutrum ac. Morbi elementum elementum risus, quis ultrices sem lobortis a. Sed vitae nibh blandit, facilisis nibh placerat, commodo odio. Praesent cursus eros sed accumsan gravida. Etiam ut dolor non lectus cursus aliquet. Phasellus vitae ipsum id mauris aliquam faucibus. Vestibulum quis ultrices nulla. Pellentesque vulputate tortor eu mauris facilisis, malesuada fermentum nunc adipiscing. Integer tristique turpis vel convallis feugiat.\n  </p>\n</div>";
  },"useData":true});

this["templates"]["timeline"] = Handlebars.default.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\n            <li id=\"panel-"
    + escapeExpression(((helper = helpers.id || (depth0 && depth0.id)),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"panel\">\n                <div class=\"duration\"></div>\n                <img class=\"panel-thumb\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.thumbnail)),stack1 == null || stack1 === false ? stack1 : stack1.uri)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n            </li>\n        ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div id=\"slider\" class=\"slider\"></div>\n\n<div id=\"timeline\" class=\"timeline\">\n    <ol id=\"storyboard\" class=\"storyboard\">\n        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.storyboard)),stack1 == null || stack1 === false ? stack1 : stack1.panels), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n    </ol>\n</div>\n\n<div class=\"toolbar\">\n    <div class=\"title\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.storyboard)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n\n    <button class=\"share button\">Share</button>\n    <button class=\"produce button\">Produce</button>\n    <button class=\"preview button\">Preview</button>\n</div>";
},"useData":true});

this["templates"]["upload_media"] = Handlebars.default.template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  return "<h2>Upload Media</h2>\n\n<form action=\"/api/medium\" method=\"post\" enctype=\"multipart/form-data\">\n    <p>\n        <input type=\"file\" name=\"source\"/>\n    </p>\n\n    <p>\n        <label>\n            name <input type=\"text\" name=\"name\"/>\n        </label>\n    </p>\n\n    <p>\n        <input type=\"submit\"/>\n    </p>\n</form>";
  },"useData":true});

return this["templates"];

});