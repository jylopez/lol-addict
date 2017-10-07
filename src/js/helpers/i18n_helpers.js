'use strict';

const _tf = function(keyPath,messages){
  const path = keyPath.split('.');
  const mf = path.reduce((msgs,key) => {
    return msgs ? msgs[key] : null;
  },messages);
  return mf ? mf : function(){ return path[path.length - 1]; };

};


const I18nHelpers = {
  t: function(keyPath,values={},messages,defaultMessages){
    return _tf(keyPath,messages)(values) || _tf(keyPath,defaultMessages)(values);
  }
};

module.exports = I18nHelpers;