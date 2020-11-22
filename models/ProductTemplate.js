const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const ProductTemplateSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  last_archive_person: {
    type: Date,
    default: Date.now
  },
  old_serial_numbers: {
    type: String
  },
  unit_price: {
    type: String
  },
  company_profit: {
    type: String
  },
  unit: {
    type: String
  },
  product_category: {
    type: String
  },
  the_cost: {
    type: String
  },
  retail_price: {
    type: String
  },
  product_profit: {
    type: String
  },
  product_description: {
    type: String
  },
  storage: {
    type: String
  },
  product_color: {
    type: String
  },
  various_elements: {
    type: String
  },
  length: {
    type: String
  },
  extra_freight: {
    type: String
  },
  lead_time: {
    type: String
  },
  raw_material: {
    type: String
  },
  minimum_order_quantity: {
    type: String
  },
  supplier: {
    type: String
  },
  supplier_contact_person: {
    type: String
  },
  supplier_phone_number: {
    type: String
  },
  supplier_fax_number: {
    type: String
  },
  supplier_cell_phone: {
    type: String
  },
  supplier_address: {
    type: String
  },
  supplier_email: {
    type: String
  },
  remark: {
    type: String
  },
  supplier_bank_information: {
    type: String
  },
  product_website: {
    type: String
  },
  supplier_number: {
    type: String
  },
  product_picture_website: {
    type: String
  },
  last_edit_person: {
    type: String
  },
  stock_alert: {
    type: String
  }
});

// eslint-disable-next-line no-undef
module.exports = ProductTemplate = mongoose.model(
  'product_templates',
  ProductTemplateSchema
);
