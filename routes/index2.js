var zomato = require('zomato');

var client = zomato.createClient({
	userKey: "4dd26c0b6b70bcd2ab9b055e2036ab46"
});
<h3><%=restData.name%></h3>
<h3><%=restData.cuisines%></h3>
<h3><%=restData.url%></h3>
<h3>Average Cost for 2:&nbsp $<%=restData.average_cost_for_two%></h3>
<h3><%=restData.location.city%></h3>
<h3><%=restData.location.zipcode%></h3>




<ol>
	<li><%=resName.name%></li>
	<li><%=resName.location.address%></li>
	<li><%=resName.location.locality_verbose%></li>
	<li><%=resName.url%></li>
</ol>




  client.getCategories(null, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
  client.search({
	entity_id:"36932",//location id 
	entity_type:"group", // location type (city,subzone,zone , landmark, metro,group) 
	q:"Cafe" ,//Search Keyword 
	lat:"28.613939", //latitude 
	lon:"77.209021", //longitude 
	count:"2", // number of maximum result to display 
	start:"1" , //fetch results after offset 
	radius:"10000" , //radius around (lat,lon); to define search area, defined in meters(M) 
	cuisines : "3,7" , //list of cuisine id's separated by comma 
	establishment_type : "" , //estblishment id obtained from establishments call 
	collection_id : "29" , //collection id obtained from collections call 
	category :  "9" ,//	category ids obtained from categories call 
	sort : " cost,rating,real_distance" ,//choose any one out of these available choices 
	order: "asc" //	used with 'sort' parameter to define ascending(asc )/ descending(desc) 
 
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});
	client.getReviews({
		res_id:"9186" , // id of restaurant whose details are requested 
		start : "0" , //fetch results after this offset (Integer) 
		count: "5" , //

	}, function(err, result){
	    if(!err){
	      console.log(result);
	    }else {
	      console.log(err);
	    }
	});