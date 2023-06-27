const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const session = require("./session");
const subjectSchema = require("./subjectScheme");
const studentSchema = new Schema({
  roll_no: {
    type: String,
  },
  regd_num:{
    type:String,
  },
  fullname: {
    type: String,
  },
  stu_id: {
    type: Number,
  },
  reg_dtu: {
    type: String,
    enum: ["DTU"],
  },
  reg_year: {
    type: Number,
  },
  reg_group: {
    type: String,
  },
  reg_id: {
    type: Number,
  },
  f_name: {
    type: String,
  },
  m_name: {
    type: String,
  },
  l_name: {
    type: String,
  },
  fathername: {
    type: String,
  },
  rank: {
    type: String,
  },
  scheme_year: {
    type: String,
  },
  sp_code: {
    type: String,
  },
  aprog: {
    type: String,
  },
  photo: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  hindiname: {
    type: String,
  },
  sex: {
    type: String,
  },
  category: {
    type: String,
  },
  dob: {
    type: String,
  },
  gateScore: {
    type: String,
  },
  mothername: {
    type: String,
  },
  aieeeroll: {
    type: String,
  },
  comment: {
    type: String,
  },
  secid: {
    type: String,
  },
  bg: {
    type: String,
  },
  libno: {
    type: String,
  },
  campus: {
    type: String,
  },
  nationality: {
    type: String,
  },
  f_phone: {
    type: String,
  },
  m_phone: {
    type: String,
  },
  dtu_email: {
    type: String,
  },
  password: {
    type: String,
  },
  currentSubjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subjectSchema",
    },
  ],

  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "sessionSchema",
    },
  ],
  passedSubjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subjectSchema",
    },
  ],
  backSubjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subjectSchema",
    },
  ],
  securedCredits: {
    type: Number,
  },
  currentSem: {
    type: Number,
  },
  currentCredits: {
    type: Number,
  },
  currentElectives: {
    type: Number,
  },
  defaultHostelPassword: {
    type: String,
  },
  updatedHostelPassword: {
    type: String,
  },
});
module.exports = mongoose.model("Student", studentSchema);
