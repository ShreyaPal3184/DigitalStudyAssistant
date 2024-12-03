//let key = "FFISl85WUnSBnmraA6skyPs0mzDfEf3RI0kOiwvixF41oogcScrNJQQJ99ALACYeBjFXJ3w3AAAAACOG7Sik";
//let location = "eastus";

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

let key = "FFISl85WUnSBnmraA6skyPs0mzDfEf3RI0kOiwvixF41oogcScrNJQQJ99ALACYeBjFXJ3w3AAAAACOG7Sik";
let endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using an Azure AI multi-service resource.
let location = "eastus";

let params = new URLSearchParams();
params.append("api-version", "3.0");
params.append("from", "en");
params.append("to", "es");

axios({
    baseURL: endpoint,
    url: '/dictionary/lookup',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': key,
        // location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: params,
    data: [{
        'text': 'sunlight'
    }],
    responseType: 'json'
}).then(function(response){
    console.log(JSON.stringify(response.data, null, 4));
})