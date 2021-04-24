const request = require('postman-request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicG9vamFhc2h1MTIiLCJhIjoiY2tuZGY3ZG1vMmFweDJubzZ0Y3B6YmVhMSJ9.mrKJxKcSchcPoS98_exeuQ'
    request({url , json: true}, (error, { body }) => {//destructuring response
            if(error){
                callback('Unable to connect to location service', undefined)
                   }
               else if (body.features.length === 0) {//destructuring response
                   callback('Unable to find location.Try another search', undefined)
               
               }
               else {
                   callback( undefined,{
                       latitude: body.features[0].center[1],//destructing response
                       longitude: body.features[0].center[0],
                       location: body.features[0].place_name
                   })



                }
            })}

module.exports = geocode