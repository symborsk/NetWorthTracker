using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CalcYaWorthWebAPI.Models
{
    [Table("Liabilities")]
    public class Liability
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Identifier { get; set; }

        [ForeignKey("UserRefId")]
        public int UserId { get; set; }
        public User User { get; set; }

        public string Description { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal AmountBase { get; set; }
        public long TimeCreated { get; set; }
        public long TimeModified { get; set; }
    }
}
