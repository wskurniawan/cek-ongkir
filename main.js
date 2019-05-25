const express = require('express');
const body_parser = require('body-parser');
const joi = require('joi');
const axios = require('axios').default;

const key = 'cc0a1f581638a96d0ec42c6d7508d365';
const base_url = 'https://api.rajaongkir.com/starter';

const app = express();

app.use(body_parser.json());

app.get('/provinsi', async function(req, res, next){
   const header = {
      key: key
   }

   try {
      var response = await axios.get(base_url + '/province', { headers: header});
   } catch (error) {
      res.status(400).send({ error: error.message });
   }

   const response_data = response.data;
   res.send(response_data.rajaongkir.results);
});

app.get('/city', async function(req, res, next){
   const schema = joi.object().keys({
      idProvinsi: joi.string().required()
   });

   try {
      await joi.validate(req.query, schema);
   } catch (error) {
      return res.status(400).send({
         error: error.message
      });
   }

   next();
}, function(req, res, next){
   const request_query = req.query;


   res.send('ok');
});

app.listen(process.env.PORT || 5023, function(){
   console.log('app ready');
});