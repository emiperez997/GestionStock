
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("/api/transactions")]
[Authorize(Roles = "Admin, Manager")]
public class TransactionController(ITransactionService service) : ControllerBase
{

  private readonly ITransactionService _service = service;

  [HttpGet]
  public async Task<List<Transaction>> Get()
  {
    return await _service.GetTransactions();
  }

  [HttpGet("{id}")]
  public async Task<Transaction> Get(int id)
  {
    return await _service.GetTransactionById(id);
  }
}