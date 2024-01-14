import { IGenericObject } from '../handlers/db/helper';

// Function to check if a user is authenticated
export async function isAuthenticated(args: any) {
  // Destructure necessary variables from the arguments
  const { dataBase, jwtAccess, request, set }: IGenericObject = args;

  // Get the 'authorization' header from the request
  const authorization = request.headers.get('authorization');

  // If there's no 'authorization' header, set the status to 401 and throw an error
  if (!authorization) {
    set.status = 401;
    throw new Error('Unauthorized');
  }

  // The 'authorization' header should be in the format 'Bearer [token]'
  // Split the header into a 'Bearer' part and a 'token' part
  const token = authorization.split(' ')[1];

  // If there's no token, set the status to 401 and throw an error
  if (!token) {
    set.status = 401;
    throw new Error('Unauthorized');
  }

  // Verify the token using the jwtAccess object
  const payload = await jwtAccess.verify(token);

  // If the token is invalid, set the status to 401 and throw an error
  if (!payload) {
    set.status = 401;
    throw new Error('Unauthorized');
  }

  // Destructure the 'id' from the payload
  const { id = null } = payload;

  // If there's no 'id' in the payload, set the status to 401 and throw an error
  if (!id) {
    set.status = 401;
    throw new Error('Unauthorized');
  }

  // This can be added to check for user existance in db
  // const query = `SELECT id FROM userdb WHERE id=${id}`;
  // const user = await dataBase().executeQuery(query);

  // Return the 'id' from the payload
  return {
    id,
  };
}
