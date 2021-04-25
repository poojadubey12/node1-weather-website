const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=d565bd2f4a4198fc8bfde2e0ff4674ed&query=' + latitude + ',' + longitude + '&units=m'
    request ({url, json: true},(error,{ body } = {}) => { //destructuring response
            if(error){
         callback('Unable to connect to weather stack',undefined)
            }
            else if(body.error) {
               callback ('Unable to find location',undefined)
            }
            else{
                callback(undefined,body.current.weather_descriptions[0]   + '   Current Time:' + body.location.localtime + '     It is ' + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + ' degrees and ' + body.current.precip + ' % chances of rain today')
                
            }

        }
    )}



module.exports = forecast