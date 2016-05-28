define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/product/add",
    "title": "Add Product",
    "name": "AddProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>product name atleast 1 length</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description atleast 50 length</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>cost non negative</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "category",
            "description": "<p>tags</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\": {\n     \"__v\": 0,\n      \"updatedat\": 1464449250,\n     \"createdat\": 1464449250,\n      \"createdname\": \"user2\",\n      \"createdby\": \"574923e62d4071502460e9bf\",\n      \"isdeleted\": false,\n      \"price\": 50,\n      \"description\": \"this is sample product\",\n      \"name\": \"wfvd \",\n      \"_id\": \"5749b8e2462871941a99e826\",\n      \"tags\": [\n      \"tag1\",\n      \"tag2\"\n      ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoToken",
            "description": "<p>token not provided</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongToken",
            "description": "<p>wrong token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailure",
            "description": "<p>validation failure</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadJSon",
            "description": "<p>incorrect json input</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"No token provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Failed to authenticate token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"Product validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"name key is missing or empty\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "delete",
    "url": "/api/v1/product/delete/:id",
    "title": "Delete Product",
    "name": "DeleteProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>product id, a valid id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\":\"Delete successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoToken",
            "description": "<p>token not provided</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongToken",
            "description": "<p>wrong token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAuthenticated",
            "description": "<p>only owner of product can edit</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoProductFound",
            "description": "<p>wrong id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"No token provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Failed to authenticate token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Not Authorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"No product exists.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "put",
    "url": "/api/v1/product/edit/:id",
    "title": "Edit Product",
    "name": "EditProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>product id, a valid id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\": {\n     \"__v\": 0,\n      \"updatedat\": 1464449250,\n     \"createdat\": 1464449250,\n      \"createdname\": \"user2\",\n      \"createdby\": \"574923e62d4071502460e9bf\",\n      \"isdeleted\": false,\n      \"price\": 50,\n      \"description\": \"this is sample product\",\n      \"name\": \"wfvd \",\n      \"_id\": \"5749b8e2462871941a99e826\",\n      \"tags\": [\n      \"tag1\",\n      \"tag2\"\n      ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoToken",
            "description": "<p>token not provided</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongToken",
            "description": "<p>wrong token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAuthenticated",
            "description": "<p>only owner of product can edit</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoProductFound",
            "description": "<p>wrong id</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailure",
            "description": "<p>wrong id</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadJsonInput",
            "description": "<p>bad json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"No token provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Failed to authenticate token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Not Authorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"No product exists.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"ID is not correct\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"Nothing is given to edit.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/v1/product/get/:id",
    "title": "Get Product",
    "name": "GetProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>product id, a valid id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\": {\n     \"__v\": 0,\n      \"updatedat\": 1464449250,\n     \"createdat\": 1464449250,\n      \"createdname\": \"user2\",\n      \"createdby\": \"574923e62d4071502460e9bf\",\n      \"isdeleted\": false,\n      \"price\": 50,\n      \"description\": \"this is sample product\",\n      \"name\": \"wfvd \",\n      \"_id\": \"5749b8e2462871941a99e826\",\n      \"tags\": [\n      \"tag1\",\n      \"tag2\"\n      ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoToken",
            "description": "<p>token not provided</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongToken",
            "description": "<p>wrong token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailure",
            "description": "<p>wrong id</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoProductFound",
            "description": "<p>wrong id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"No token provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Failed to authenticate token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"ID is not correct\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"No product exists.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/api/v1/product/search?",
    "title": "Search Products",
    "name": "SearchProducts",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\":[{result 1},{result 2}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoToken",
            "description": "<p>token not provided</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongToken",
            "description": "<p>wrong token</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadQuery",
            "description": "<p>bad query params</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"No token provided.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"Failed to authenticate token.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"Bad query at tags\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/v1/user/authenticate",
    "title": "User authentication",
    "name": "UserAuthentication",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\": {\n     \"username\": \"user3\",\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadJSon",
            "description": "<p>incorrect json input</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>wrong username.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordWrong",
            "description": "<p>wrong password entered</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"username key is missing or empty\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"No user found.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"Passwords dont match.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/user/register",
    "title": "User registration",
    "name": "UserRegistration",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique ID, alteast 4 in length</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>alteast 8 in length</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": false,\n  \"data\": \"Registration successfull.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>already username taken by someone.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationFailure",
            "description": "<p>username or password not alreast required length.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadJSon",
            "description": "<p>incorrect json input</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"User already exists.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n  \"data\": \"User validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": true,\n   \"data\": \"username key is missing or empty\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
