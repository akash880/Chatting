module.exports =  ValidationClass= function(){
    this.id =   0;
};
ValidationClass.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
ValidationClass.prototype.generateId = function () {
    var dTime = new Date().getTime();
    var genaratedId;
    var rNum = this.getRandomInt(1, 9);
    genaratedId = '' + rNum + '' + dTime;
    return genaratedId;
};