using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CalcYaWorthWebAPI.Models
{
    public interface IContext
    {
        DbSet<AppSetting> AppSettings { get; set; }
        DbSet<Asset> Assets { get; set; }
        DbSet<Liability> Liabilities { get; set; }
        DbSet<User> Users { get; set; }

        Task<int> SaveChangesAsync(CancellationToken token = default);
    }
}
