import 'dotenv/config';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import normalizeUrl from 'normalize-url';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { registerValidation, loginValidation } from '../middlewares';

const register = async (req: Request, res: Response) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send({ error: 'User already exists' });
  }

  const avatar = normalizeUrl(
    gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }),
    { forceHttps: true }
  );

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: hashedPassword,
    bio: req.body?.bio,
    languages: req.body?.languages,
    avatar,
  });

  await user.save();
  res.send(user);
};

const login = async (req: Request, res: Response) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET || '',
    { expiresIn: '1h' }
  );

  res.header('x-auth-token', token).send(user);
};

export { register, login };
