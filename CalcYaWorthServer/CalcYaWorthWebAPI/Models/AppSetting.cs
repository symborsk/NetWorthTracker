using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CalcYaWorthWebAPI.Models
{   
    [Table("AppSettings")] 
    public class AppSetting
    {
        [Key]
        [StringLength(255)]
        public string SettingName { get; set; }

        public string SettingValue { get; set; }
    }
}
