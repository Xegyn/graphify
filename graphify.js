function Graphify (selector, data, options) {
  this.selector = selector;
  this.data = data;
  this.options = options;
  this.xmlns = "http://www.w3.org/2000/svg";
  this.width = 300;
  this.height = 200;
}

Graphify.prototype.points = function () {

  this.separateData();

  console.log(this.xs);
  console.log(this.ys);

  var length = this.xs.length;
  var xdist = this.width / length;
  console.log(xdist);
  var ydist = this.height / Math.max.apply(null, this.ys);
  console.log(ydist);
  var points = "";

  for(var i=0; i<length; i++) {
    points += xdist * i + "," + (this.height / this.ys[i]) + " ";
  }

  console.log(points);
  return points;
}

Graphify.prototype.separateData = function () {
  this.xs = new Array();
  this.ys = new Array();
  for(var i=0; i<this.data.length; i++) {
    this.xs[i] = this.data[i]["date"];
    this.ys[i] = this.data[i]["amount"];
  }
}

Graphify.prototype.render = function () {
  this.createSvg();
  this.renderAxis();
  this.renderLineGraph();
}

Graphify.prototype.createSvg = function () {
  this.svgDocument = document.createElementNS(this.xmlns, "svg");
  this.svgDocument.setAttribute('xmlns', this.xmlns);
  this.svgDocument.setAttribute('version', 1.1);
  $(this.selector).append(this.svgDocument);
}

Graphify.prototype.renderAxis = function () {
  this.renderLine(0, 0, 0, this.height);
  this.renderLine(0, this.height, this.width, this.height);
}

Graphify.prototype.renderLine = function (x1, y1, x2, y2) {
  var line = document.createElementNS(this.xmlns, 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute("style", "fill:none; stroke:black; stroke-width:1");
  this.svgDocument.appendChild(line);
}

Graphify.prototype.renderLineGraph = function () {
  var polyline = document.createElementNS(this.xmlns, 'polyline');
  polyline.setAttribute('points', this.points());
  polyline.setAttribute("style", "fill:none; stroke:black; stroke-width:2");
  this.svgDocument.appendChild(polyline);
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