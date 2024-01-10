
using System.Text.Json.Serialization;

namespace Models;

public class Product
{
  public int ProductId { get; set; }
  public required string Name { get; set; }
  public required string Description { get; set; }
  public decimal Price { get; set; }
  public int AvailableQuantity { get; set; }
  public List<Transaction> Transactions { get; set; } = [];
  public int UserId { get; set; }

  public User? User { get; set; }

}