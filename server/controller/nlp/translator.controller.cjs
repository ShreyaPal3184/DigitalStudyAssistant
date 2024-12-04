const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.AZURE_KEY;
const location = process.env.AZURE_LOCATION;
const endpoint = process.env.AZURE_TRANSLATE_ENDPOINT;

//translate text
const translateText = async (req, res) => {
    const { text, from, to } = req.body;
    // console.log(key);
    // console.log(endpoint);
    // console.log(location);
    if(!text || !from || !to) {
        return res.status(400).json({ message: 'Please provide text, from and to language.' });
    }

    try {
     const response = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': from,
            'to': to
        },
        data: [{ text }],
        responseType: 'json'
    });

    res.status(200).json(response.data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Translation failed.', error: error.message });
    }
};


//detect language
const detectLanguage = async (req, res) => {
    const { text } = req.body;

    if(!text) {
        return res.status(400).json({ message: 'Please provide text.' });
    }

    let params = new URLSearchParams();
    params.append("api-version", "3.0");

    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/detect',
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
                'text': text
            }],
            responseType: 'json'
         });

        res.status(200).json(response.data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Detection failed.', error: error.message });
    }
};


module.exports = { translateText, detectLanguage }