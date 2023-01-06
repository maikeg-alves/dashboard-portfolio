// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  switch (req.method) {
    case 'POST':
      const auth =
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD;
      /*    const adminToken = jwt.sign({ email, admin: true }, 'secretkey'); */

      const adminToken = jwt.sign({ auth }, process.env.SECRET_API, {
        expiresIn: '1h',
      });

      res.status(202).send(`login acess ${adminToken}, value ${auth}`);

      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json('Method not allowed');
      break;
  }
}
