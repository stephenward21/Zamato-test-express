var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
	// request.get(creds, (error,response,restData)=>{
	// 	var restData = JSON.parse(restData);
	// 	var restID = req.query.id
	// 	console.log(restID);
	// 	console.log(restData.name)
		res.render('index', {  });
		//need to insert into the object arg a "titleHeader" (i.e Search by city,area,neighborhood, etc).
		// res.json(restData);
		// console.log(catData)

	// })
  

});

router.post('/search',(req,res)=>{
	var locationName = req.body.searchString
	var searchUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + locationName;
	var creds = {
		url: searchUrl,
		headers:{
			"user-key": "4dd26c0b6b70bcd2ab9b055e2036ab46"
		}
	}
	request.get(creds, (error,response,locationData)=>{
		var locationData = JSON.parse(locationData);
		var entType = locationData.location_suggestions[0].entity_type
		var entID = locationData.location_suggestions[0].entity_id
		var locDetUrl = "https://developers.zomato.com/api/v2.1/location_details?"
		var newCreds = `${locDetUrl}entity_id=${entID}&entity_type=${entType}`
		var newUrl = {
			url: newCreds,
			headers:{
				"user-key": "4dd26c0b6b70bcd2ab9b055e2036ab46"
			}
		}
		// res.json(locationData);
// 		// res.render('city',{cityData: cityData});
		request.get(newUrl, (error,repsonse, nextData)=>{
			var nextData = JSON.parse(nextData);
			// console.log(nextData.nearby_res[0]);
///////Need to loop through nearby_res and best_rated_restaurant.restaurant.name(includes 10 best rated in search area) or .url .cuisines etc...//////
///////to include in the ejs file when redering.  Map feature is another posibility/////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

			// res.json(nextData);
			// res.render('res-results', {nextData: nextData});
			var nearResIds = nextData.nearby_res;
			var totalNearRes = nearResIds.length
			for(let i = 0; i<totalNearRes; i++){
				var nearbyResUrl = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + nearResIds[i];
				var resCred = {
					url: nearbyResUrl,
					headers: {
						"user-key": "4dd26c0b6b70bcd2ab9b055e2036ab46"
					}
				}
				var nearbyResArray = [];

				request.get(resCred,(error,response,resName)=>{
					var resName = JSON.parse(resName)
					nearbyResArray.push(resName)
					// res.json(resName);
					// res.render('result', {resName: resName});
					if(nearbyResArray.length == totalNearRes){
						// res.render('result', {nearbyResArray: nearbyResArray});
					}
				//////TEST///////////////////////////
				});

			}

		});

		
	});
	

});

router.post('/searchTopRated',(req,res)=>{
	var locationName = req.body.searchBest
	var searchUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + locationName;
	var creds = {
		url: searchUrl,
		headers:{
			"user-key": "4dd26c0b6b70bcd2ab9b055e2036ab46"
		}
	}
	request.get(creds, (error,response,locationData)=>{
		var locationData = JSON.parse(locationData);
		var entType = locationData.location_suggestions[0].entity_type
		var entID = locationData.location_suggestions[0].entity_id
		var locDetUrl = "https://developers.zomato.com/api/v2.1/location_details?"
		var newCreds = `${locDetUrl}entity_id=${entID}&entity_type=${entType}`
		var newUrl = {
			url: newCreds,
			headers:{
				"user-key": "4dd26c0b6b70bcd2ab9b055e2036ab46"
			}
		}
		request.get(newUrl, (error,repsonse, nextData)=>{
			var nextData = JSON.parse(nextData)
			// console.log(nextData.best_rated_restaurant[0].restaurant.name)
			// res.json(nextData);
			res.render('top-rated', {nextData: nextData})

		});

	});

});


// router.get('/search/result',(req,res)=>{
// 	var resultUrl = 
// })




module.exports = router;
