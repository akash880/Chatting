


var md5 = require('md5');
var genarateId = require('../helper/genarateId.js');
var genarateIdObj = new genarateId();
var login = function(req,res,next){
    var results = {};
    var retArr = {};
    var error = {};
	var db = req.app.locals.db; 
	var date = new Date();
	var data = {};
	data['userid'] = parseInt(genarateIdObj.generateId());
        results['userid'] = data['userid'];
	data['password'] =md5(req.body.password);
	data['name'] = req.body.name;
	data['created_on'] =  date;
	data['updated_on'] = date;
	var userdetails =  db.collection('userdetails');
	try{
	userdetails.update(
            { name : req.body.name },
            {$set:data},
            { upsert: true }    
         ); 
} catch(err){
	console.log(err);
}
                error.errorCode = 0;
                error.errorMsg = 'You are added Succesfully';
                retArr.result = results;
                retArr.error = error;
                res.json(retArr);
                return 1;


   
};

var getalluser = function(req,res,next){
    var db = req.app.locals.db; 
    var result = [];
    var retArr = {};
    var error = {};
     db.collection('userdetails', function(err, collection) {
            if (err)
                return console.log('error opening users collection, err = ', err);
            collection.find({},{ name: 1, userid: 1 }).toArray(function (err, results) {
                if (err)
                    return console.log('error initiating find on users, err = ', err);
                else{
                    result=results;
                    retArr.results = result;
                    error.errorCode = 0;
                    error.errorMsg = "Data fetched Successfully";
                    retArr.error = error;
                    res.json(retArr);
                    return 1;
                }
            });
          
        });
    
    
};


module.exports = {
    login : login,
    getalluser : getalluser
};

