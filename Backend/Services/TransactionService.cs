
using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services;

public class TransactionService(ApiContext context) : ITransactionService
{
  private readonly ApiContext _context = context;

  public async Task<List<Transaction>> GetTransactions()
  {
    return await _context.Transactions.Include(it => it.Product).Include(it => it.User).ToListAsync();
  }

  public async Task<Transaction> GetTransactionById(int id)
  {
    return await _context.Transactions.FindAsync(id) ?? throw new Exception("Transaction not found");
  }

  public async Task<Transaction> CreateTransaction(Transaction Transaction)
  {
    _context.Transactions.Add(Transaction);
    await _context.SaveChangesAsync();
    return Transaction;
  }
}

public interface ITransactionService
{
  Task<List<Transaction>> GetTransactions();
  Task<Transaction> GetTransactionById(int id);
  Task<Transaction> CreateTransaction(Transaction Transaction);
}