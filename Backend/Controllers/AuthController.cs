using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Utils;

namespace Controllers;

[Route("/api/auth")]
[ApiController]
public class AuthController(IUserServices userServices) : ControllerBase
{

  private readonly IUserServices _userServices = userServices;

  [HttpPost]
  [Route("login")]
  public async Task<ActionResult<string>> Login([FromBody] LoginModel loginModel)
  {
    try
    {
      var user = await _userServices.GetUserByEmail(loginModel.Email!);

      if (PasswordOperations.VerifyPassword(loginModel.Password!, user.Password) == false)
      {
        return Unauthorized("Invalid Password");
      }

      var jwt = JwtOperations.GenerateToken(user);

      return Ok(new { token = jwt });
    }
    catch (Exception e)
    {
      return NotFound(e.Message);
    }
  }

  [HttpGet]
  [Route("current")]
  [Authorize]
  public async Task<ActionResult<User>> GetCurrentUser()
  {
    try
    {
      var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

      if (email == null)
      {
        return Unauthorized();
      }

      var user = await _userServices.GetUserByEmail(email);

      return Ok(user);
    }
    catch (Exception e)
    {
      return NotFound(e.Message);
    }
  }
}
