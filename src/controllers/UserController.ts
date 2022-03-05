import { Request, Response } from 'express';
import User from '../models/User';

const signup = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send({ error: 'User already exists' });
  } else {
    user = new User(req.body);
    await user.save();
    res.send({ user });
  }
};

export { signup };
