using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProfileFormDto
    {
        public string username { get; set; }
        public string? bio { get; set; }
        public string displayName { get; set; }
    }
}