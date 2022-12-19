using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Models
{
    public class OrderItems
    {
        [Key]
        public int ReferenceId { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string OrderStatus { get; set; }
        public int quantity { get; set; }
        public int Price { get; set; }
        [ForeignKey("Order")]
        public int Order_id { get; set; }
        public virtual Order order { get; set; }
        [ForeignKey("Product")]
        public int Product_id { get; set; }
        public virtual Product product { get; set; }

        public static implicit operator int(OrderItems v)
        {
            throw new NotImplementedException();
        }
    }
}
