import { Router } from 'express';
import { configs } from '../../config';
import { getItem } from '../../dynamoAPI';
import { endpointRespond } from '../../utils';
import { authenticateToken } from '../auth/validate';
import { isFailure } from '../types/guards';
import { updateLimit } from './utils';

export const limit = Router().post(
  '/limit',
  authenticateToken,
  async (req: any, res) => {
    const { username } = req.user.data;
    const respond = endpointRespond(res);

    const userFromDB = await getItem(configs.USER_TABLE, { username });

    const { category, value } = req.body;

    if (!isFailure(userFromDB)) {
      const accountId = userFromDB.Item.accounts[0] as any;
      await updateLimit(accountId, category, value);

      return respond.SuccessResponse({ newLimit: value, category });
    }
    return respond.FailureResponse('Failed to get user from db');
  }
);
