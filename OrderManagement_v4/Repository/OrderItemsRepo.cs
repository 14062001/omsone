using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement_v4.Models;

namespace OrderManagement_v4.Repository
{

    public class OrderItemsRepo : IOrderItems
    {
        private readonly OrderContext orderContext;
        public OrderItemsRepo(OrderContext orderContext)
        {
            this.orderContext = orderContext;
        }

        public async Task<int> AddNewOrderItems(OrderItems orderItems)
        {
            orderContext.OrderItems.Add(orderItems);   
            int res = await orderContext.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        }

        public async Task<OrderItems> DeleteByProdId(int orderid, int productid)
        {
            var ar = await orderContext.OrderItems.FirstOrDefaultAsync(x => x.Product_id == productid && x.Order_id==orderid);
            if (ar != null)
            {
                orderContext.OrderItems.Remove(ar);
                await orderContext.SaveChangesAsync();
                return ar;
            }
            return null;
        }
    

        public async Task<OrderItems> UpdateOrderid(int orderid, OrderItems orderItems)
        {
            var data = await orderContext.OrderItems.Where(x => x.Order_id == orderid).FirstOrDefaultAsync();
            if (data != null)
            {

                data.Order_id = orderItems.Order_id;
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return data;
                }
                return null;
            }
            return null;
        }

        public async Task<OrderItems> UpdateOrderStatus(int orderid, int productid, OrderItems orderItems)
        {
            var data = await orderContext.OrderItems.Where(x => x.Order_id == orderid ).FirstOrDefaultAsync();
            if (data != null)
            {
                data.Product_id = orderItems.Product_id;
                data.OrderStatus = orderItems.OrderStatus;
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return data;
                }
                return null;
            }
            return null;
        }

        public async Task<OrderItems> UpdateProductid(int orderid, int productid, OrderItems orderItems)
        {
            var data = await orderContext.OrderItems.Where(x => x.Order_id == orderid).FirstOrDefaultAsync();
            if (data != null)
            {

                data.Order_id = orderItems.Order_id;
                data.Product_id = orderItems.Product_id;
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return data;
                }
                return null;
            }
            return null;
        }

        async Task<List<OrderItems>> IOrderItems.FindByOrderIdCustId(int orderid)
        {
            var ar = orderContext.OrderItems.Where(x => x.Order_id == orderid).ToListAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }
    }
}
