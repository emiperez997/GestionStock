
using System.Text.Json.Serialization;

namespace Models;

public class Transaction
{
  public int TransactionId { get; set; }
  public int ProductId { get; set; }
  public int PreviousQuantity { get; set; }
  public int NewQuantity { get; set; }
  public DateTime TransactionDate { get; set; }
  public TransactionType TransactionType { get; set; }

  [JsonIgnore]
  public Product? Product { get; set; }
  public int UserId { get; set; }
  public User? User { get; set; }
}

public enum TransactionType
{
  Inflow,
  Outflow
}