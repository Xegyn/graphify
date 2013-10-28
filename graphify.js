function Graphify (selector, data, options) {
  this.selector = selector;
  this.data = data;
  this.options = options;
  this.xmlns = "http://www.w3.org/2000/svg";
}

Graphify.prototype.points = function() {
  return "20,20 40,25 60,40 80,120 120,140 200,180";
};

Graphify.prototype.render = function () {
  var svgDocument = document.createElementNS(this.xmlns, "svg");
  svgDocument.setAttribute('xmlns', this.xmlns);
  svgDocument.setAttribute('version', 1.1);
  var polyline = document.createElementNS(this.xmlns, 'polyline');
  polyline.setAttribute('points', this.points());
  polyline.setAttribute("style", "fill:none; stroke:black; stroke-width:3");
  svgDocument.appendChild(polyline);
  $(this.selector).append(svgDocument);
}




//----------------------------------------------------


var create_graph = function () {
  var data = [{"date" : "10/30/13", "amount" : 12.30},
    {"date" : "09/30/13", "amount" : 14.30},
    {"date" : "08/30/13", "amount" : 25.30},
    {"date" : "07/30/13", "amount" : 17.30},
    {"date" : "06/30/13", "amount" : 20.30},
    {"date" : "05/30/13", "amount" : 5.30}]
  var graph = new Graphify("div#graph", data, {});
  graph.render();
};


$(create_graph)