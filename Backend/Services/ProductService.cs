
using Data;
using Dtos;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services;

public class ProductService(ApiContext context) : IProductService
{
  private readonly ApiContext _context = context;

  public async Task<List<Product>> GetProducts()
  {
    return await _context.Products.Include(p => p.Transactions).Include(p => p.User).ToListAsync();
  }
  public async Task<Product> GetProductById(int id)
  {
    var product = await _context.Products.FindAsync(id) ?? throw new Exception("Product not found");
    return product;
  }

  public async Task<Product> CreateProduct(Product product, User user)
  {
    // Create and save a new product
    var productNew = _context.Products.Add(product);

    Console.WriteLine(productNew.Entity.ProductId);



    await _context.SaveChangesAsync();

    // Create a new transaction
    var transaction = new Transaction
    {
      ProductId = productNew.Entity.ProductId,
      PreviousQuantity = 0,
      NewQuantity = product.AvailableQuantity,
      TransactionDate = DateTime.Now,
      TransactionType = TransactionType.Inflow,
      UserId = user.UserId
    };

    _context.Transactions.Add(transaction);

    await _context.SaveChangesAsync();

    return product;
  }

  public async Task<Product> UpdateProduct(int id, UpdateProduct product)
  {
    var existingProduct = await _context.Products.FindAsync(id) ?? throw new Exception("Product not found");

    existingProduct.Name = product.Name ?? existingProduct.Name;
    existingProduct.Description = product.Description ?? existingProduct.Description;
    existingProduct.Price = product.Price == 0 ? existingProduct.Price : product.Price;

    try
    {
      await _context.SaveChangesAsync();
      return existingProduct;
    }
    catch (DbUpdateConcurrencyException e)
    {
      Console.WriteLine(e);
      throw new Exception("The product was updated by another user. Please refresh and try again.");
    }
  }

  public async Task<Product> DeleteProduct(int id)
  {
    var product = await _context.Products.FindAsync(id) ?? throw new Exception("Product not found");
    _context.Products.Remove(product);
    await _context.SaveChangesAsync();

    return product;
  }

  public async Task<Product> SellProduct(int id, QuantityUpdate product, User user)
  {

    if (product.Quantity <= 0) throw new Exception("Quantity must be greater than 0");

    var existingProduct = await _context.Products.FindAsync(id) ?? throw new Exception("Product not found");

    int PreviousQuantity = existingProduct.AvailableQuantity;
    int NewQuantity = existingProduct.AvailableQuantity - product.Quantity < 0
        ? throw new Exception("Not enough inventory to sell")
        : existingProduct.AvailableQuantity - product.Quantity;

    existingProduct.AvailableQuantity = NewQuantity;

    if (PreviousQuantity != NewQuantity)
    {
      var transaction = new Transaction
      {
        ProductId = existingProduct.ProductId,
        PreviousQuantity = PreviousQuantity,
        NewQuantity = NewQuantity,
        TransactionDate = DateTime.Now,
        TransactionType = TransactionType.Outflow,
        UserId = user.UserId
      };
      _context.Transactions.Add(transaction);
    }

    try
    {
      await _context.SaveChangesAsync();
      return existingProduct;
    }
    catch (DbUpdateConcurrencyException e)
    {
      Console.WriteLine(e);
      throw new Exception("The product was updated by another user. Please refresh and try again.");
    }
  }

  public async Task<List<Product>> UpdateQuantity(List<QuantityUpdate> products, User user)
  {
    foreach (var product in products)
    {
      var existingProduct = await _context.Products.FindAsync(product.ProductId) ?? throw new Exception("Product not found");

      int PreviousQuantity = existingProduct.AvailableQuantity;
      int NewQuantity = product.Quantity;

      existingProduct.AvailableQuantity = product.Quantity;

      if (PreviousQuantity != NewQuantity)
      {
        var transaction = new Transaction
        {
          ProductId = existingProduct.ProductId,
          PreviousQuantity = PreviousQuantity,
          NewQuantity = NewQuantity,
          TransactionDate = DateTime.Now,
          TransactionType = PreviousQuantity > NewQuantity ? TransactionType.Outflow : TransactionType.Inflow,
          UserId = user.UserId
        };
        _context.Transactions.Add(transaction);
      }

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException e)
      {
        Console.WriteLine(e);
        throw new Exception("The product was updated by another user. Please refresh and try again.");
      }
    }

    // Return the updated products only
    List<Product> updatedProducts = [];

    foreach (var product in products)
    {
      var updatedProduct = await _context.Products.FindAsync(product.ProductId) ?? throw new Exception("Product not found");
      updatedProducts.Add(updatedProduct);
    }

    return updatedProducts;

  }
}

public interface IProductService
{
  Task<List<Product>> GetProducts();
  Task<Product> GetProductById(int id);
  Task<Product> CreateProduct(Product product, User user);
  Task<Product> UpdateProduct(int id, UpdateProduct product);
  Task<Product> DeleteProduct(int id);
  Task<List<Product>> UpdateQuantity(List<QuantityUpdate> products, User user);
}