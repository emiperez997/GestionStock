
namespace Dtos;

public class UpdateProduct
{
  public string? Name { get; set; }
  public string? Description { get; set; }
  public decimal Price { get; set; }

}

public class QuantityUpdate
{
  public int ProductId { get; set; }
  public int Quantity { get; set; }
}