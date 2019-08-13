using Microsoft.EntityFrameworkCore;

namespace CalcYaWorthWebAPI.Models
{

    public class Context : DbContext, IContext
    {

        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Liability> Liabilities { get; set; }
        public DbSet<User> Users { get; set; }
    } 
}
