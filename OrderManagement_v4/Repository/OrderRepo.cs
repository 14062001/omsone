using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement_v4.Models;

namespace OrderManagement_v4.Repository
{
    public class OrderRepo : IOrder
    {
        private readonly OrderContext orderContext;
        public OrderRepo(OrderContext orderContext)
        {
            this.orderContext = orderContext;
        }
        public async Task<int> AddNewOrder(Order order)
        {
            orderContext.orders.Add(order);
            int res = await orderContext.SaveChangesAsync();
            if (res > 0)
            {
                return order.Order_id;
            }
            return 0;
            
        }

        public async Task<int> DeleteOrder(int orderid)
        {
            var ar = orderContext.orders.Where(x => x.Order_id == orderid).FirstOrDefaultAsync();
            if (ar != null)
            {
                orderContext.orders.Remove(await ar);
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return 1;
                }
                return 0;
            }
            return 0;
        }

       

        public async Task<List<Order>> GetAllOrders()
        {
            var ar = orderContext.orders.ToListAsync();
            return await ar;
        }

        public async Task<Order> SearchByOrderId(int orderid)
        {
            var ar = orderContext.orders.Where(x => x.Order_id == orderid).FirstOrDefaultAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }
        public async Task<int> SearchByCustId(int custid, int orderid)
        {
            var ar = await orderContext.orders.Where(x => x.Order_id == orderid && x.Cust_id==custid).FirstOrDefaultAsync();
            if (ar != null)
            {
                return 1;
            }
            return 0;
        }

        public async Task<List<Order>> SearchByStatus()
        {
            var ar = orderContext.orders.Where(x => x.Status == "Pending" || x.Status == "Confirmed").ToListAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }

        public async Task<Order> UpdateOrder(int orderid, Order order)
        {
            var data = await orderContext.orders.Where(x => x.Order_id == orderid).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Status = order.Status;
                data.Shipment_date = order.Shipment_date;
                data.Total_Price = order.Total_Price;
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return data;
                }
                return null;
            }
            return null;
        }

        public async Task<Order> UpdatePaymentMethod(int orderid, Order order)
        {
            var data = await orderContext.orders.Where(x => x.Order_id == orderid).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Payment_method = order.Payment_method;
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return data;
                }
                return null;
            }
            return null;
        }

        public async Task<List<Order>> GetAllOrderofCustomer(int Cust_id)
        {
            var ar = orderContext.orders.Where(x => x.Cust_id == Cust_id && x.Status == "Pending" || x.Status == "Confirmed").ToListAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }
    }
}
