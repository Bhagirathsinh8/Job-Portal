const User = require('../../model/user.model');

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select('-__v');
  if (!user) throw new Error("User not found");
  return user;
};

exports.updateProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  }).select('-__v');
  if (!user) throw new Error("User not found or update failed");
  return user;
};
