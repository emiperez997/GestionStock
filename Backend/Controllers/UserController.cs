using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[Route("/api/users")]
[ApiController]
[Authorize(Policy = "Admin")]
public class UserController(IUserServices userServices) : ControllerBase
{
  private readonly IUserServices _userServices = userServices;


  [HttpGet]
  public async Task<ActionResult<List<User>>> GetUsers()
  {

    try
    {
      return await _userServices.GetAllUsers();

    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpGet]
  [Route("{id}")]
  public async Task<ActionResult<User>> GetUserById(int id)
  {
    try
    {
      return await _userServices.GetUserById(id);
    }
    catch (Exception e)
    {
      return NotFound(e.Message);
    }
  }

  [HttpGet("email/{email}")]
  public async Task<ActionResult<User>> GetUserByEmail(string email)
  {
    try
    {
      return await _userServices.GetUserByEmail(email);
    }
    catch (Exception e)
    {
      return NotFound(e.Message);
    }
  }

  [HttpPost]
  public async Task<ActionResult<User>> CreateUser([FromBody] User user)
  {
    try
    {
      return await _userServices.CreateUser(user);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] User user)
  {
    try
    {

      if (user.UserRole == UserRoles.Admin)
      {
        return BadRequest("Cannot update admin");
      }

      return await _userServices.UpdateUser(id, user);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteUser(int id)
  {
    try
    {

      var user = await _userServices.GetUserById(id);

      if (user.UserRole == UserRoles.Admin)
      {
        return BadRequest("Cannot delete admin");
      }

      await _userServices.DeleteUser(id);
      return Ok();
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  // Activate account
  [HttpPut("activate/{email}")]
  public async Task<ActionResult<User>> ActivateUser(string email)
  {
    try
    {
      return await _userServices.ActivateUser(email);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }

  // Deactivate account
  [HttpPut("deactivate/{email}")]
  public async Task<ActionResult<User>> DeactivateUser(string email)
  {
    try
    {
      return await _userServices.DeactivateUser(email);
    }
    catch (Exception e)
    {
      return BadRequest(e.Message);
    }
  }
}