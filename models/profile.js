const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
      maxlength: 30,
    },
    website: {
      type: String,
    },
    country: {
      type: String,
    },
    languages: {
      type: [String],
      required: true,
    },
    portfolio: {
      type: String,
    },
    workrole: [
      {
        role: {
          type: String,
          required: true,
        },
        company: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        details: {
          type: String,
        },
      },
    ],
    social: {
      youtube: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Profile", profileSchema);
