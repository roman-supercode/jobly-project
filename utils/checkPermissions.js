import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourseUserId) => {
  // resourseUserId ist vom Typ "object" und muss vor der Prüfung in ein "string" umgewandelt werden
  if (requestUser.userId === resourseUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
