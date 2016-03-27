'use strict';

const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};
    this.datos = {
      relay1:'on',
      relay2:'on',
      color:'#00ff00',
      motor1Speed:0,
      motor2Speed:0
    }
   
  }

  find(params) {
    console.log('arduinos-find-params-query',params.query);
    var output = [];
    for(var key in this.datos){
      var data = {id:key,value:this.datos[key]};
     
      output.push(data);
    }
    return Promise.resolve(output);
  }

  get(id, params) {
    console.log('arduinos-get-id',id);
    console.log('arduinos-get-params-query',params.query);
    var output = {};
    if(typeof this.datos[id] !== 'undefined'){
      var data = this.datos[id];
      //var output =  _.extend(output,data);
      if(typeof params.query.key !== 'undefined'){
        output = data[params.query.key];
      } else {
        output = data;
     }
    }

    return Promise.resolve(output);
  }

  update(id, data, params) {
    console.log('arduinos-update-id',id);
    console.log('arduinos-update-data',data);
   // console.log('update-params',params);
    if(typeof this.datos[id] !== 'undefined'){
      this.datos[id] = data.value;
    }
    return Promise.resolve({id:id,value:data.value});
  }

  patch(id, data, params) {
    console.log('arduinos-patch-id',id);
    console.log('arduinos-patch-data',data);
    return Promise.resolve(data);
  }

}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/arduinos', new Service());

  // Get our initialize service to that we can bind hooks
  const arduinoService = app.service('/arduinos');

  // Set up our before hooks
  arduinoService.before(hooks.before);

  // Set up our after hooks
  arduinoService.after(hooks.after);
};

module.exports.Service = Service;
