using System.ComponentModel.DataAnnotations;
using Data;
using Microsoft.EntityFrameworkCore;
using Models;
using Utils;

namespace Services;

public class UserServices(ApiContext dataContext) : IUserServices
{
  private readonly ApiContext _context = dataContext;

  public async Task<List<User>> GetAllUsers()
  {
    return await _context.Users.ToListAsync();
  }

  public async Task<User> GetUserById(int id)
  {
    return await _context.Users.FirstOrDefaultAsync(user => user.UserId == id) ?? throw new Exception("User not found");
  }

  public async Task<User> GetUserByEmail(string email)
  {
    return await _context.Users.FirstOrDefaultAsync(user => user.Email == email) ?? throw new Exception("User not found");
  }

  public async Task<User> CreateUser(User user)
  {
    // Check if email is valid
    if (!new EmailAddressAttribute().IsValid(user.Email))
    {
      throw new Exception("Invalid email");
    }

    var userExists = await _context.Users.AnyAsync(userDb => userDb.Email == user.Email);

    Console.WriteLine(userExists);

    if (userExists)
    {
      throw new Exception("User already exists");
    }

    user.Password = PasswordOperations.HashPassword(user?.Password!);

    await _context.Users.AddAsync(user!);
    await _context.SaveChangesAsync();

    return user!;
  }

  public async Task<User> UpdateUser(int id, User user)
  {

    if (!new EmailAddressAttribute().IsValid(user.Email))
    {
      throw new Exception("Invalid email");
    }
    var userToUpdate = await _context.Users.FirstOrDefaultAsync(user => user.UserId == id);

    if (userToUpdate is null)
    {
      throw new Exception("User not found");
    }

    userToUpdate.Username = user.Username;
    userToUpdate.Email = user.Email;
    userToUpdate.UserRole = user.UserRole;

    Console.WriteLine(user.UserRole == userToUpdate.UserRole);
    Console.WriteLine(user.UserRole == UserRoles.Manager);
    Console.WriteLine(user.UserRole == UserRoles.Admin);
    Console.WriteLine(user.UserRole);

    await _context.SaveChangesAsync();

    return userToUpdate;
  }

  public async Task DeleteUser(int id)
  {
    var userToDelete = await _context.Users.FirstOrDefaultAsync(user => user.UserId == id);

    if (userToDelete is null)
    {
      throw new Exception("User not found");
    }

    _context.Users.Remove(userToDelete);
    await _context.SaveChangesAsync();
  }

  // Activate user
  public async Task<User> ActivateUser(string email)
  {
    var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email) ?? throw new Exception("User not found");

    user.IsActivated = true;

    await _context.SaveChangesAsync();

    return user;
  }

  // Deactivated user
  public async Task<User> DeactivateUser(string email)
  {
    var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email) ?? throw new Exception("User not found");

    user.IsActivated = false;

    await _context.SaveChangesAsync();

    return user;
  }
}

public interface IUserServices
{
  Task<List<User>> GetAllUsers();
  Task<User> GetUserById(int id);
  Task<User> GetUserByEmail(string email);
  Task<User> CreateUser(User user);
  Task<User> UpdateUser(int id, User user);
  Task DeleteUser(int id);
  Task<User> ActivateUser(string email);
  Task<User> DeactivateUser(string email);
}