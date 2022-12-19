using OrderManagement_v4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Repository
{
   public interface IOrderItems
    {
        Task<int> AddNewOrderItems(OrderItems orderItems);
        Task<List<OrderItems>> FindByOrderIdCustId(int orderid);
        Task<OrderItems> UpdateOrderStatus(int orderid,int productid, OrderItems orderItems);
        Task<OrderItems> UpdateProductid(int orderid, int productid, OrderItems orderItems);
        Task<OrderItems> UpdateOrderid(int orderid, OrderItems orderItems);
        Task<OrderItems> DeleteByProdId(int orderid,int productid);
    }
}
