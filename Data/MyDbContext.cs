using Microsoft.EntityFrameworkCore;
using CDI.Models;

namespace CDI.Data;

public class MyDbContext : DbContext {
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { 

    }

    public DbSet<Note> Notes {get; set;}
}