
using System.Security.Cryptography;
using System.Text;

namespace Utils;

public static class PasswordOperations
{
  public static string HashPassword(string password)
  {
    var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));

    return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
  }

  public static bool VerifyPassword(string password, string hashedPassword)
  {
    var hashedPasswordToVerify = HashPassword(password);

    return hashedPasswordToVerify == hashedPassword;
  }
}