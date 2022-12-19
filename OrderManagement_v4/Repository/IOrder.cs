using OrderManagement_v4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Repository
{
    public  interface IOrder
    {
        Task<List<Order>> GetAllOrders();
        Task<List<Order>> GetAllOrderofCustomer(int Cust_id);
        Task<int> AddNewOrder(Order order);
        Task<Order> SearchByOrderId(int orderid);
        Task<int> SearchByCustId(int custid,int orderid);
        Task<Order> UpdateOrder(int orderid, Order order);
        Task<Order> UpdatePaymentMethod(int orderid, Order order);
        Task<List<Order>> SearchByStatus();
        //  Task<int> UpdateStatus(int orderid, Order status);
        Task<int> DeleteOrder(int orderid);
       
    }
}
