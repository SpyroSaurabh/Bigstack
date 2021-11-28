const User = require("../models/person");
const Profile = require("../models/profile");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      res.json({
        error: "User not found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.encry_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// exports.updateProfile = (req, res) => {
// const profileValues = {};
// profileValues.user = req.profile._id;
// if (req.body.username) {
//   profileValues.username = req.body.username;
// }
// if (req.body.website) {
//   profileValues.website = req.body.website;
// }
// if (req.body.country) {
//   profileValues.country = req.body.country;
// }
// if (req.body.portfolio) {
//   profileValues.portfolio = req.body.portfolio;
// }
// if (typeof req.body.languages !== undefined) {
//   profileValues.languages = req.body.languages;
// }
// if (req.body.youtube) {
//   profileValues.youtube = req.body.youtube;
// }
// if (req.body.facebook) {
//   profileValues.facebook = req.body.facebook;
// }
// if (req.body.instagram) {
//   profileValues.instagram = req.body.instagram;
// }

//Database Stuff

//   Profile.findByIdAndUpdate(
//     { _id: req.profile._id },
//     { $set: req.body },
//     { new: true, useFindAndModify: false },
//     // console.log(profile),
//     (err, profile) => {
//       if (err || !profile) {
//         return res.json({
//           error: "Problem in fetching profile",
//           message: err,
//         });
//       }
//       res.json(profile);
//     }
//   );

// Profile.findOne({ user: req.profile._id }, (err, profile) => {
//   if (err || !profile) {
//     return res.json({
//       error: "Problem in fetching profile",
//     });
//   }
//   if (profile) {
//     Profile.findOneAndUpdate(
//       { user: req.profile._id },
//       { $set: profileValues },
//       { new: true },
//       (err, profile) => {
//         if (err || !profile) {
//           return res.json({
//             error: "Problem in updating profile",
//           });
//         }
//         res.json(profile);
//       }
//     );
//   } else {
//     Profile.findOne(
//       { username: req.profileValues.username },
//       (err, profile) => {
//         if (err) {
//           return res.json({
//             error: "Please update profile",
//           });
//         }
//         if (profile) {
//           return res.status(400).json({
//             username: "Username already exist",
//           });
//         }
//Profile Save
//         new Profile(profileValues).save((err, profile) => {
//           if (err || !profile) {
//             return res.status(400).json({
//               error: "Not able to save",
//             });
//           }
//           res.json(profile);
//         });
//       }
//     );
//   }
// });
// };

exports.createProfile = (req, res) => {
  // const profile = new Profile(req.body);

  const profileValues = {};
  profileValues.user = req.profile._id;
  if (req.body.username) {
    profileValues.username = req.body.username;
  }
  if (req.body.website) {
    profileValues.website = req.body.website;
  }
  if (req.body.country) {
    profileValues.country = req.body.country;
  }
  if (typeof req.body.languages !== undefined) {
    profileValues.languages = req.body.languages.split(",");
  }

  //get the social links
  profileValues.social = {};

  if (req.body.youtube) {
    profileValues.social.youtube = req.body.youtube;
  }
  if (req.body.facebook) {
    profileValues.social.facebook = req.body.facebook;
  }
  if (req.body.instagram) {
    profileValues.social.instagram = req.body.instagram;
  }
  // profile.save((err, pro) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Profile not created in DB",
  //     });
  //   }
  //   // pro.language.split(",");
  //   res.json({ pro });
  // });
  new Profile(profileValues).save((err, pro) => {
    if (err || !pro) {
      return res.status(400).json({
        error: "Not able to save",
      });
    }
    res.json(pro);
  });
};

exports.getProfileById = (req, res, next, id) => {
  Profile.findById(id).exec((err, pro) => {
    if (err) {
      res.json({
        error: "Profile not found in DB",
      });
    }
    req.userProfile = pro;
    next();
  });
};

exports.updateUserProfile = (req, res) => {
  Profile.findByIdAndUpdate(
    { _id: req.userProfile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, prof) => {
      if (err || !prof) {
        return res.status(400).json({
          err: "Profile Updation Failed",
        });
      }
      res.json(prof);
    }
  );
};

exports.getUserProfile = (req, res) => {
  Profile.findOne({ username: req.params.username })
    .populate("user", ["name"])
    .exec((err, prof) => {
      if (err || !prof) {
        return res.status(400).json({
          err: "Error in fetching username",
        });
      }
      res.json(prof);
    });
};

exports.deleteUser = (req, res) => {
  Profile.findOne({ _id: req.userProfile._id });
  Profile.findOneAndRemove({ _id: req.userProfile._id }).exec((err, pro) => {
    if (err || !pro) {
      return res.status(400).json({
        err: "No profile found",
      });
    }

    User.findOneAndRemove({ _id: req.profile._id }).exec((err, per) => {
      if (err || !per) {
        return res.status(400).json({
          err: "NO person found",
        });
      }
      res.json({
        success: "Deleted successfully",
      });
    });
  });
};

exports.createWorkRole = (req, res) => {
  Profile.findOne({ _id: req.userProfile._id }).exec((err, pro) => {
    if (err || !pro) {
      return res.json({
        err: "Profile not found",
      });
    }
    const newWork = {
      role: req.body.role,
      company: req.body.company,
      details: req.body.role,
    };
    pro.workrole.unshift(newWork);
    console.log(pro);
    pro.save((err, p) => {
      if (err) {
        return res.json({
          err: "No workrole added",
        });
      } else {
        return res.json({
          message: "Workrole successfully added",
        });
      }
    });
    // pro.save((err, pro) => {
    //   if (err) {
    //     return res.json({
    //       err: "Workrole not saved",
    //     });
    //   }
    //   res.json(pro.workrole);
    // });
  });
};

exports.deleteWorkrole = (req, res) => {
  Profile.findOne({ _id: req.userProfile._id }).exec((err, pro) => {
    if (err || !pro) {
      return res.json({
        err: "No profile found",
      });
    }
    const removeThis = pro.workrole
      .map((item) => item._id)
      .indexOf(req.params.w_id);
    pro.workrole.splice(removeThis, 1);
    pro.save((err, p) => {
      if (err) {
        return res.json({
          err: "No workrole deleted",
        });
      } else {
        return res.json({
          message: "Workrole deleted successfully",
        });
      }
    });
  });
};
