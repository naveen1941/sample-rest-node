var express = require('express');
var router = express.Router();


var users = require('../model/user');
var products = require('../model/products');


/*
User Registration and Login
*/
router.post('/api/v1/register',);
router.post('/api/v1/login',);


/*
Products CRUD
*/
router.post('/api/v1/product/add');
router.get('/api/v1/products');
router.put('/api/v1/product/:id');
router.delete('/api/v1/product/:id');

