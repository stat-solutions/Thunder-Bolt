
const momo = require('mtn-momo');

 
const { Collections } = momo.create({
    callbackHost: 'https://edadtokenapp-email.firebaseapp.com/'
  });
   
  const collections = Collections({
    userSecret: 'f838e0f205d84f3f81d6dd057e6fa2a2',
    userId: '2d08be08-1c81-41ae-bea8-41f828769c69',
    primaryKey: 'aca26965df894d3882a72816f2ad230e'
  });

  module.exports = collections;