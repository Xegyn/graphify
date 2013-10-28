var data = [{"date" : "10/30/13", "amount" : 12.30},
            {"date" : "09/30/13", "amount" : 14.30},
            {"date" : "08/30/13", "amount" : 25.30},
            {"date" : "07/30/13", "amount" : 17.30},
            {"date" : "06/30/13", "amount" : 20.30},
            {"date" : "05/30/13", "amount" : 5.30}]

var points = function() {
  return "20,20 40,25 60,40 80,120 120,140 200,180";
};

var update_points = function () {
  $('#graph polyline').attr('points', points());
}

$(update_points)