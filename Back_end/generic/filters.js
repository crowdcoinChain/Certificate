var check_data = require('./check_data');


let EventEmitter = require('events').EventEmitter;
let emitter = new EventEmitter();

emitter.on('error', function(err) {
  const tmp_dict = JSON.parse(err.message);
  console.error(tmp_dict["message"]);
});
module.exports = emitter;



function getData(request,names,function_to_apply) {
  let d = {};
  names.forEach(function(item) {
    try{
      if (request.method == 'POST'){
        const q = request.body[item];
        if(q!=null && q.length>0 && q!='None'){d[item]=q}
      }
      else{
        const q = request.query[item];
        if(q!=null && q.length>0 && q!='None'){d[item]=q}
      }
    }catch (e){


    }
  });

  if(Object.keys(d).length!=names.length){
    emitter.emit('error', new Error(
      '{"message":{"error":true,"types":"No Parameters"},"status_code":406}'));

    return {"error":true, "types":{"No Parameters":[]}};

  }

  // Second Stage, check the informations
  let tmp = check_data.check_Input(d,names.lenght);
  if (tmp["error"]){
    emitter.emit('error', new Error('{"message":'+JSON.stringify(tmp)+', "status_code":412}'));
  }

  try{
    tmp =function_to_apply(d);
  }catch(e) {
    emitter.emit('error', new Error(
      '{"message":{"error":true,"types":"Wrong Parameters"},"status_code":406}'));
  }
  if (tmp["error"]){
    emitter.emit('error', new Error('{"message":'+JSON.stringify(tmp)+', "status_code":412}'));
  }
  return tmp;
}

module.exports = {
  'getData': getData,
};