using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace Utils;

public static class JwtOperations
{
  public static string GenerateToken(User user)
  {
    var tokenHandler = new JwtSecurityTokenHandler();

    var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")!);

    var claims = new[]
    {
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
      new Claim(JwtRegisteredClaimNames.Email, user.Email!),
      new Claim("userid", user.UserId.ToString()),
      new Claim(ClaimTypes.Role, user.UserRole.ToString()),
    };

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(claims),
      Expires = DateTime.UtcNow.AddHours(1),
      SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
      Issuer = "https://localhost:7157",
      Audience = "https://localhost:7157",
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);

    var jwt = tokenHandler.WriteToken(token);

    return jwt;
  }
}