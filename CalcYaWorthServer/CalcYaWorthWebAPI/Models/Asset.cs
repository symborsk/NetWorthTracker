using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CalcYaWorthWebAPI.Models
{
    [Table("Assets")]
    public class Asset
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Identifier { get; set; }

        [ForeignKey("UserRefId")]
        public int UserId { get; set; }
        public User User { get; set; }

        public string Description { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal BaseAmount { get; set; }
        public long TimeCreated { get; set; }   
        public long TimeModified { get; set; }
    }
}
