function Graphify (selector, data, options) {
//  this.id = id;
  this.selector = selector;
  this.data = data;
  this.options = options;
}

Graphify.prototype.points = function() {


  return "20,20 40,25 60,40 80,120 120,140 200,180";
};

Graphify.prototype.render = function () {
//  <svg id="graph" xmlns="http://www.w3.org/2000/svg" version="1.1">
//    <polyline points=""
//    style="fill:none;stroke:black;stroke-width:3" />
//  </svg>


  var svg = document.createElement("svg")
  $(this.selector).append(svg)
//      .attr('points', graph.points());
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