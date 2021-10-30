import * as express from 'express';
import * as path from 'path';

const router: express.Router = express.Router();

router.post(
  '/login/id',
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {},
);

export = router;
