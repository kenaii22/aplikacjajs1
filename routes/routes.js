const express = require('express')
const router = express.Router()

const Schema = require('../models/schema')
const Response = require('../response');

router.get('/', function(req, res, next) {
    res.render('index');
  });

  router.get('/get-all-users-api', function(req, res, next) {
    Schema.find({}, function(err, posts) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User Listing!', res, posts);
        }
    });

});

router.post('/add-users-api', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile
    }
    var data = Schema(mybodydata);
    //var data = Schema(req.body);
    data.save(function(err) {
        if (err) {
            Response.errorResponse(err, res);
           
        } else {

            Response.successResponse('User Added!', res, {});
        }
    })
});


/* GET SINGLE POST BY ID */
router.get('/get-users-details-api/:id', function(req, res, next) {
  Schema.findById(req.params.id, function (err, post) {
    if(err){
      Response.errorResponse(err,res);
  }else{
      Response.successResponse('User Detail!',res,post);
  }
  });
});

/* DELETE POST BY ID */
router.delete('/delete-users-api', function(req, res, next) {
  Schema.findByIdAndRemove(req.body._id, function (err, post) {
    if (err) {
      Response.errorResponse(err,res);
    } else {
      Response.successResponse('User deleted!',res,{});
    }
  });
});

/* UPDATE POST */
router.post('/update-users-api', function(req, res, next) {
  console.log(req.body._id);
  Schema.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
  if (err) {
    Response.errorResponse(err,res);
  } else {
    Response.successResponse('User updated!',res,{});
  }
});
});









//List Table Data
router.get('/', function(req, res) {
    Schema.find(function(err, numery) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { numery: numery });
            console.log(numery);
        }
    });
});


//Display Form 
router.get('/add', function(req, res, next) {
    res.render('add-form');
});


/* POST Data. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile
    }
    var data = Schema(mybodydata);
    //var data = Schema(req.body);
    data.save(function(err) {
        if (err) {

            res.render('add-form', { message: 'User registered not successfully!' });
        } else {

            res.render('add-form', { message: 'User registered successfully!' });
        }
    })
});

/* DELETE User BY ID */
router.get('/delete/:id', function(req, res) {
    Schema.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {

            req.flash('error_msg', 'Record Not Deleted');
            res.redirect('../display');
        } else {

            req.flash('success_msg', 'Record Deleted');
            res.redirect('../display');
        }
    });
});

/* GET SINGLE User BY ID */
router.get('/show/:id', function(req, res) {
    console.log(req.params.id);
    Schema.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('show', { users: user });
        }
    });
});

/* GET SINGLE User BY ID */
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    Schema.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('edit-form', { users: user });
        }
    });
});

/* UPDATE User */
router.post('/edit/:id', function(req, res) {
    Schema.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
            req.flash('error_msg', 'Something went wrong! User could not updated.');
            res.redirect('edit/' + req.params.id);
        } else {
            req.flash('success_msg', 'Record Updated');
            res.redirect('../display');
        }
    });
});

module.exports = router;