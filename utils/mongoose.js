const mongoose = require('mongoose');

module.exports = {
  init:() => {
    const dbOptions = {
      useUnifiedTopology:true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };
    mongoose.connect(process.env.mongoDBTOKEN,dbOptions)
    mongoose.set('useFindAndModify',false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on(`connecting`, () => {
      console.log(`Connecting to MongoDB server...`)
    });

    mongoose.connection.on(`connected`, () => {
      console.log('Mongoose connection established!');
    });

    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error:\n ${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection to MongoDB server disconnected!');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('Mongoose connection to MongoDB server reconnected.')
    });

  }
};
