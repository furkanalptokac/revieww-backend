import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';
import normalizeUrl from 'normalize-url';
import gravatar from 'gravatar';
import User from '../models/User';

const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .not()
  .spaces();

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const signup = async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ error: 'User already exists' });
  } else {
    if (schema.validate(req.body.password) && validateEmail(req.body.email)) {
      const avatar = normalizeUrl(
        gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }),
        { forceHttps: true }
      );
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

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

      res.send({ user });
    } else {
      res.status(400).send({ error: 'Invalid email type or password type.' });
    }
  }
};

export { signup };
