
using Microsoft.EntityFrameworkCore;
using Models;
using Utils;

namespace Data;

public class ApiContext(DbContextOptions<ApiContext> options) : DbContext(options)
{
  public DbSet<Transaction> Transactions { get; set; }
  public DbSet<Product> Products { get; set; }

  public DbSet<User> Users { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {

    List<User> users = [
      new User{UserId = 1, Username = "admin", Email = "admin@gmail.com", Password = PasswordOperations.HashPassword("admin"), IsActivated = true, UserRole = UserRoles.Admin},
      new User{UserId = 2, Username = "user", Email = "user@gmail.com", Password = PasswordOperations.HashPassword("user"), IsActivated = true, UserRole = UserRoles.Manager},
      new User{UserId = 3, Username = "user2", Email = "user_2@gmail.com", Password = PasswordOperations.HashPassword("user2"), IsActivated = true, UserRole = UserRoles.Manager}
    ];
    List<Product> products = [
      new Product{ProductId = 1, Name = "Iphone 7", Description = "Iphone 7 by Apple", Price = 199m, AvailableQuantity = 100, UserId = 1},
      new Product{ProductId = 2, Name = "Iphone 8", Description = "Iphone 8 by Apple", Price = 299m, AvailableQuantity = 100, UserId = 2},
      new Product{ProductId = 3, Name = "Lenovo Thinkpad", Description = "Lenovo Thinkpad", Price = 499m, AvailableQuantity = 100, UserId = 2},
      new Product{ProductId = 4, Name = "Dell XPS", Description = "Dell XPS", Price = 599m, AvailableQuantity = 100, UserId = 2},
      new Product{ProductId = 5, Name = "HP Elitebook", Description = "HP Elitebook", Price = 699m, AvailableQuantity = 100, UserId = 3},
    ];


    modelBuilder.Entity<Product>(product =>
    {
      product.HasKey(p => p.ProductId);
      product.Property(p => p.ProductId).ValueGeneratedOnAdd();
      product.Property(p => p.Name).IsRequired();
      product.Property(p => p.Description).IsRequired();
      product.Property(p => p.Price).IsRequired().HasConversion<double>();
      product.Property(p => p.AvailableQuantity).IsRequired();
      product.Property(p => p.UserId).IsRequired();

      product.HasData(products);

    });

    modelBuilder.Entity<Transaction>(transaction =>
    {
      // Add autoincremental Primary key to TransactionId
      transaction.HasKey(t => t.TransactionId);
      transaction.Property(t => t.TransactionId).ValueGeneratedOnAdd();
      // Add foreign key to ProductId
      transaction.HasOne(t => t.Product).WithMany(p => p.Transactions).HasForeignKey(t => t.ProductId);
      transaction.Property(t => t.PreviousQuantity).IsRequired();
      transaction.Property(t => t.NewQuantity).IsRequired();
      transaction.Property(t => t.TransactionDate).IsRequired();
      transaction.Property(t => t.TransactionType).IsRequired();
      transaction.Property(t => t.UserId).IsRequired();
    });

    modelBuilder.Entity<User>(user =>
    {
      user.HasKey(u => u.UserId);
      user.Property(u => u.UserId).ValueGeneratedOnAdd();
      user.Property(u => u.Username).IsRequired();

      user.HasIndex(u => u.Email).IsUnique();
      user.Property(u => u.Email).IsRequired();

      user.Property(u => u.Password).IsRequired();
      user.Property(u => u.IsActivated).IsRequired().HasDefaultValue(false);
      user.Property(u => u.UserRole).IsRequired().HasDefaultValue(UserRoles.Manager);

      user.HasMany(u => u.Products).WithOne(p => p.User).HasForeignKey(p => p.UserId);
      user.HasMany(u => u.Transactions).WithOne(t => t.User).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.NoAction);

      user.HasData(users);
    });
  }
}