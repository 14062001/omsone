using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Models
{
    public class Customer
    {
        [Key]

        public int Cust_id { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string FirstName { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string LastName { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Gender { get; set; }

        public long Mobileno { get; set; }

        [Column(TypeName = "varchar(30)")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string State { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string City { get; set; }
        public int Pincode { get; set; }
        [Column(TypeName = "varchar(70)")]
        public string Address { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string Password { get; set; }
       
        
    }
}
