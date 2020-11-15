const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const CustomerSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
  customer_type: {
    type: String
  },
  company: {
    type: String
  },
  tax_ID_number: {
    type: String
  },
  contact_person_name: {
    type: String
  },
  contact_person_cell_phone: {
    type: String
  },
  company_telephone: {
    type: String
  },
  company_fax: {
    type: String
  },
  company_email: {
    type: String
  },
  company_address: {
    type: String
  },
  invoice_address: {
    type: String
  },
  sample_address: {
    type: String
  },
  payment_terms: {
    type: String
  },
  remarks: {
    type: String
  },
  invoice_contact_person_name: {
    type: String
  },
  invoice_contact_person_phone: {
    type: String
  },
  postal: {
    type: String
  },
  invoice_type: {
    type: String
  },
  order: {
    type: String
  },
  level: {
    type: String
  },
  area: {
    type: String
  },
  facebook: {
    type: String
  },
  website: {
    type: String
  },
  instagram: {
    type: String
  },
  pinkoi: {
    type: String
  }
});

// eslint-disable-next-line no-undef
module.exports = Customer = mongoose.model('customers', CustomerSchema);
