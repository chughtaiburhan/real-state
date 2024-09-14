import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js'; // Import Listing correctly

export const test = (req, res) => {
  res.json({
    message: 'API router is working',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json({
      success: true,
      message: 'User has been deleted!',
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  console.log('req.user.id:', req.user.id);
  console.log('req.params.id:', req.params.id);

  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      console.log('Listings found:', listings);
      res.status(200).json(listings);
    } catch (error) {
      console.error('Database query failed:', error);
      next(error);
    }
  } else {
    console.error('Unauthorized access attempt');
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};
