import { Response } from 'express';
import {
  createPostValidation,
  IExtendedRequest,
  UserType,
} from '../middlewares';
import { Post, User } from '../models';

const createPost = async (req: IExtendedRequest, res: Response) => {
  const { error } = createPostValidation(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    req.user = req.user as UserType;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      uid: user._id,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar,
    });

    await post.save();

    res.send(post);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

export { createPost };
