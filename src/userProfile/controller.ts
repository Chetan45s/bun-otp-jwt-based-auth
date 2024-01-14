import { tableName } from '../handlers/db';
import { IGenericObject } from '../handlers/db/helper';
import { getUserById } from './helpers';

export async function getProfile({ authCheck, set, dataBase, jwtAccess, request }: IGenericObject) {
  try {
    const { id: userId } = await authCheck({ set, dataBase, jwtAccess, request });
    const userDetails = await getUserById(userId, dataBase);

    set.status = 200;
    return {
      message: 'Success',
      userDetails,
    };
  } catch (err: any) {
    return new Error(err);
  }
}

export async function updateProfile({ authCheck, body, set, dataBase, jwtAccess, request }: IGenericObject) {
  try {
    const { id: userId } = await authCheck({ set, dataBase, jwtAccess, request });
    const conditionBody = {
      id: userId,
    };
    await dataBase().updateRow(tableName.USER, body, conditionBody);

    set.status = 200;
    return {
      message: 'Success',
    };
  } catch (err: any) {
    return new Error(err);
  }
}
