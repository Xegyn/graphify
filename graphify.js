function Graphify (selector, data, options) {
  this.selector = selector;
  this.data = data;
  this.options = options;
  this.xmlns = "http://www.w3.org/2000/svg";
  this.width = 300;
  this.height = 200;
}

Graphify.prototype.render = function () {
  this.createSvg();
  this.renderAxis();
  this.initializeData();
  this.translatePoints();
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
  polyline.setAttribute('points', this.pointsForAttribute());
  polyline.setAttribute("style", "fill:none; stroke:black; stroke-width:2");
  this.svgDocument.appendChild(polyline);
}

Graphify.prototype.pointsForAttribute = function () {
  var points = "";

  for(var i=0; i<this.data.length; i++) {
    points += this.translated_x_points[i] + "," + this.invertYAxis(this.translated_y_points[i]) + " ";
  }

  return points;
}

Graphify.prototype.invertYAxis = function (y_value) {
  return this.height - y_value
}

Graphify.prototype.initializeData = function () {
  this.x_values = new Array();
  this.y_values = new Array();
  for(var i=0; i<this.data.length; i++) {
      this.x_values[i] = this.dateToInteger(this.data[i]["date"]);
      this.y_values[i] = this.data[i]["amount"];
  }
  this.min_x = Math.min.apply(null, this.x_values)
  this.max_x = Math.max.apply(null, this.x_values)
  this.min_y = Math.min.apply(null, this.y_values)
  this.max_y = Math.max.apply(null, this.y_values)

}

Graphify.prototype.dateToInteger = function(date) {
  return new Date(date).valueOf();
}

Graphify.prototype.translatePoints = function() {
  this.translated_x_points = new Array();
  this.translated_y_points = new Array();

  x_divisor = (this.max_x - this.min_x) / this.width
  y_divisor = (this.max_y - this.min_y) / this.height

  for(var i=0; i<this.data.length; i++) {
    this.translated_x_points[i] = (this.x_values[i] - this.min_x) / x_divisor
    this.translated_y_points[i] = (this.y_values[i] - this.min_y) / y_divisor
  }
  console.log(this.translated_x_points);
  console.log(this.translated_y_points);
}



//----------------------------------------------------

var create_graph = function () {
  var data = [{"date" : "05/30/13", "amount" : 12.30},
    {"date" : "06/30/13", "amount" : 14.30},
    {"date" : "07/30/13", "amount" : 25.30},
    {"date" : "08/30/13", "amount" : 17.30},
    {"date" : "09/30/13", "amount" : 50.30},
    {"date" : "10/30/13", "amount" : 5.30}]
  var graph = new Graphify("div#graph", data, {});
  graph.render();
};

$(create_graph)