using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CalcYaWorthWebAPI.Models
{
    [Table("Users")] 
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [StringLength(255)]
        public string Username { get; set; }

        [StringLength(3)]
        public string CurrencyIsoCode { get; set; }

        public ICollection<Asset> Assets { get; set; }
        public ICollection<Liability> Liabilities { get; set; }
    }
}
