export function formError(user) {
  if (!user.email && !user.password) {
    return "Please fill in all required fields.";
  }

  if (!user.email) {
    return "Email address is required.";
  }

  if (!user.password) {
    return "Password is required.";
  }

  if (user.password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  return null; // hech qanday xato bo‘lmasa
}
