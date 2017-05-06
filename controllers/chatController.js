/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var genarateId = require('../helper/genarateId.js');
var genarateIdObj = new genarateId();
var createChannel = function(req, res , next){
    var db = req.app.locals.db;
    var userid_first = req.body.userid_one;
    var userid_second = req.body.userid_two;
    var result = [];
    var retArr = {};
    var error = {};
    var genarateId = require('../helper/genarateId.js');
    var channelcollection = db.collection('userChannel');
 channelcollection.find({'useridone':parseInt(userid_first),'useridtwo':parseInt(userid_second)}).count() .then(function(numItems) {
      console.log(numItems); // Use this to debug
     
       if(numItems>0){
        channelcollection.find({'useridone':parseInt(userid_first),'useridtwo':parseInt(userid_second)},{ channelId: 1}).toArray(function (err, results) {
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
   }else{
       var data = {};
	data['channelId'] = parseInt(genarateIdObj.generateId());
        data['useridone'] = parseInt(userid_first);
        data['useridtwo'] = parseInt(userid_second);
        data['active_flag'] =1;
        try{
	channelcollection.update(
            { channelId : data['channelId'] },
            {$set:data},
            { upsert: true }    
         ); 
                           result={'channelId':data['channelId']};
                           retArr.results = result;
                           error.errorCode = 0;
                           error.errorMsg = "Data fetched Successfully";
                           retArr.error = error;
                           res.json(retArr);
                           return 1;
       } catch(err){
               console.log(err);
}
   }
    });
  
    
    
};


var createChannelSocket = function(data){
     return new Promise(function (resolve, reject) {
    var db = data.db;
    var userid_first =data.userid_one;
    var userid_second = data.userid_two;
    
    var genarateId = require('../helper/genarateId.js');
    var channelcollection = db.collection('userChannel');
 channelcollection.find({'useridone':parseInt(userid_first),'useridtwo':parseInt(userid_second)}).count() .then(function(numItems) {
      console.log(numItems); // Use this to debug
     
       if(numItems>0){
        channelcollection.find({'useridone':parseInt(userid_first),'useridtwo':parseInt(userid_second)},{ channelId: 1}).toArray(function (err, results) {
                if (err)
                    return console.log('error initiating find on users, err = ', err);
                else{
                   resolve(results);
                }
            });
   }else{
       var data = {};
	data['channelId'] = parseInt(genarateIdObj.generateId());
        data['useridone'] = parseInt(userid_first);
        data['useridtwo'] = parseInt(userid_second);
        data['active_flag'] =1;
        try{
	channelcollection.update(
            { channelId : data['channelId'] },
            {$set:data},
            { upsert: true }    
         ); 
                         var  result={'channelId':data['channelId']};
                         resolve(result);
       } catch(err){
               console.log(err);
}
   }
    });
  
    
  });   
};


var storemsg = function(req, res, next){
    var result = [];
    var retArr = {};
    var error = {};
    var data = {};
    var msgValue = {};
    var senderId= req.body.senderId;
    var receiverId =  req.body.receiverId;
    msgValue['messageId'] = parseInt(genarateIdObj.generateId());
    msgValue['userMessage'] = req.body.text;
    msgValue['receiverId'] =receiverId;
    msgValue['senderId'] =senderId;
    data.Message = [];
    data.Message[0] =msgValue;
    data['channelId'] =parseInt(req.body.channelId);
    var db= req.app.locals.db;
    var userMessageCollection = db.collection('userMessage');
    try{
        
         userMessageCollection.find({'channelId':data['channelId'] }).count() .then(function(numItems) {
    if(numItems==0){
         userMessageCollection.update(
            { channelId : data['channelId'] },
            {$set:data},
            { upsert: true }   , 
       function(err, numberAffected){  
       console.log(numberAffected.result.n);
   }); 
    }
    else{
        userMessageCollection.update(
            { channelId : data['channelId'] },
            {$push:{Message:msgValue}},
            { upsert: true }   , 
       function(err, numberAffected){  
       console.log(numberAffected.result.n);
  
        });
    }
       }); 
   
         
                           result={'channelId':data['channelId']};
                           retArr.results = result;
                           error.errorCode = 0;
                           error.errorMsg = "Data fetched Successfully";
                           retArr.error = error;
                           res.json(retArr);
                           return 1;
       } catch(err){
               console.log(err);
}
    
};
module.exports = {
    createChannel : createChannel,
    storemsg : storemsg,
    createChannelSocket : createChannelSocket
};