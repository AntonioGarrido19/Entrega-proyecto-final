
const ROLES = ['user', 'admin', 'premium'];

export const authMiddleware = requiredRole => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      // Get the index of the user's role and the required role
      const userRoleIndex = ROLES.indexOf(userRole);
      const requiredRoleIndex = ROLES.indexOf(requiredRole);
  
      // Check if the user's role is at least as privileged as the required role
      if (userRoleIndex === -1 || userRoleIndex < requiredRoleIndex) {
        res.status(401).json({ message: "Action not authorized" });
      } else {
        next();
      }
    };
  };


