
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;
using System.Text.Json.Serialization;

namespace Models;

public class User
{
  public int UserId { get; set; }
  public string Username { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public bool IsActivated { get; set; }

  [DatabaseGenerated(DatabaseGeneratedOption.None)]
  public UserRoles UserRole { get; set; }
  [JsonIgnore]
  public List<Product> Products { get; set; } = [];
  [JsonIgnore]
  public List<Transaction> Transactions { get; set; } = [];
}

public enum UserRoles
{
  Admin,
  Manager,
}