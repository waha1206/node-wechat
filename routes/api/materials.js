// @login & registerModule
const express = require('express');
const router = express.Router();
const passport = require('passport');

// 引入 User 才可以做查詢
const Material = require('../../models/Material');

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
    // console.log(req.body);
    console.log(req.body.length);

    // res.json('msg:chats works');
    // return;

    const materials = new Array();

    for (let i = 0; i < req.body.length; i++) {
      let material = new Material({
        old_serial_numbers: req.body[i]['old_serial_numbers'],
        product_name: req.body[i]['product_name'],
        unit_price: req.body[i]['unit_price'],
        company_profit: req.body[i]['company_profit'],
        unit: req.body[i]['unit'],
        product_category: req.body[i]['product_category'],
        the_cost: req.body[i]['the_cost'],
        retail_price: req.body[i]['retail_price'],
        product_profit: req.body[i]['product_profit'],
        product_description: req.body[i]['product_description'],
        storage: req.body[i]['storage'],
        various_elements: req.body[i]['various_elements'],
        length: req.body[i]['length'],
        extra_freight: req.body[i]['extra_freight'],
        lead_time: req.body[i]['lead_time'],
        raw_material: req.body[i]['raw_material'],
        minimum_order_quantity: req.body[i]['minimum_order_quantity'],
        supplier: req.body[i]['supplier'],
        supplier_contact_person: req.body[i]['supplier_contact_person'],
        supplier_phone_number: req.body[i]['supplier_phone_number'],
        supplier_fax_number: req.body[i]['supplier_fax_number'],
        supplier_cell_phone: req.body[i]['supplier_cell_phone'],
        supplier_address: req.body[i]['supplier_address'],
        supplier_email: req.body[i]['supplier_email'],
        remark: req.body[i]['remark'],
        supplier_bank_information: req.body[i]['supplier_bank_information'],
        product_website: req.body[i]['product_website']
      });
      materials.push(material);
    }

    Material.insertMany(materials)
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
