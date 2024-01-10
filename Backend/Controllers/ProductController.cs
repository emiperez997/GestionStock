
using System.Security.Claims;
using Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("/api/products")]
[Authorize(Roles = "Admin, Manager")]
public class ProductController(IProductService service, IUserServices userServices) : ControllerBase
{

  private readonly IProductService _service = service;
  private readonly IUserServices _userServices = userServices;

  [HttpGet]
  public Task<List<Product>> Get()
  {
    return _service.GetProducts();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Product>> Get(int id)
  {
    try
    {
      return await _service.GetProductById(id);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest(e.Message);
    }
  }

  [HttpPost]
  public async Task<ActionResult<Product>> Post(Product product)
  {
    try
    {
      var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

      if (email == null)
      {
        return Unauthorized();
      }

      var user = await _userServices.GetUserByEmail(email);
      return await _service.CreateProduct(product, user);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest(e.Message);
    }
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<Product>> Put(int id, UpdateProduct product)
  {
    try
    {
      return await _service.UpdateProduct(id, product);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest(e.Message);
    }
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult<Product>> Delete(int id)
  {
    try
    {
      return await _service.DeleteProduct(id);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest(e.Message);
    }
  }

  [HttpPost("update-quantity")]
  public async Task<ActionResult<List<Product>>> UpdateQuantity(List<QuantityUpdate> products)
  {
    try
    {
      var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

      if (email == null)
      {
        return Unauthorized();
      }

      var user = await _userServices.GetUserByEmail(email);

      return await _service.UpdateQuantity(products, user);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest(e.Message);
    }
  }
}