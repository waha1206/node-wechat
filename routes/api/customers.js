// @login & registerModule
const express = require('express');
const router = express.Router();
const passport = require('passport');

// 引入 User 才可以做查詢
const Customer = require('../../models/Customer');

// $router GET api/users/test
// @desc   返回的請求的 json 數據
// @access public
router.get('/test', (req, res) => {
  res.json('msg:login works');
});

// $router POST api/users/register
// @desc   返回的請求的 json 數據
// @access public
router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body);
    console.log(req.body.length);

    const customers = new Array();

    for (let i = 0; i < req.body.length; i++) {
      let customer = new Customer({
        create_date: req.body[i]['create_date'],
        customer_type: req.body[i]['customer_type'],
        company: req.body[i]['company'],
        contact_person_name: req.body[i]['contact_person_name'],
        contact_person_cell_phone: req.body[i]['contact_person_cell_phone'],
        company_telephone: req.body[i]['company_telephone'],
        company_fax: req.body[i]['company_fax'],
        company_email: req.body[i]['company_email'],
        company_address: req.body[i]['company_address'],
        invoice_address: req.body[i]['invoice_address'],
        sample_address: req.body[i]['sample_address'],
        payment_terms: req.body[i]['payment_terms'],
        invoice_contact_person_name: req.body[i]['invoice_contact_person_name'],
        invoice_contact_person_phone:
          req.body[i]['invoice_contact_person_phone'],
        postal: req.body[i]['postal']
      });
      customers.push(customer);
    }

    Customer.insertMany(customers)
      .then((ok) => {
        res.json('msg:chats works');
      })
      .catch((err) => {
        return console.log(err);
      });
  }
);

// $router POST api/users/login
// @desc   返回 token jwt passport
// @access public

// $router GET api/customer/all
// @desc   取得所有使用者資料
// @access Private
router.post(
  '/search',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Customer.find({ company: { $regex: req.body.key } }).then((customers) => {
      res.json(customers);
    });
  }
);

module.exports = router;
