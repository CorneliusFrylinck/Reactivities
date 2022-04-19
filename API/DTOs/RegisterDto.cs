using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string? DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z]).{4,8}$", ErrorMessage = "Why so weak?")]
        public string? Password { get; set; }
        [Required]
        public string? UserName { get; set; }
    }
}