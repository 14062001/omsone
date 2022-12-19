using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement_v4.Models;

namespace OrderManagement_v4.Repository
{
    public class CartRepo : ICart
    {
        private readonly OrderContext orderContext;

        public CartRepo(OrderContext orderContext)
        {
            this.orderContext = orderContext;
        }
        public async Task<int> AddNewCart(Cart cart)
        {
            orderContext.cart.Add(cart);
            int res = await orderContext.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        }
        public async Task<int> DeleteAll()
        {
            var data =await orderContext.cart.ToListAsync();
            foreach(var i in data)
            {
                orderContext.cart.Remove(i);
            }
           int res= orderContext.SaveChanges();
            return res;

        }

        public async Task<Cart> DeleteByProdId(int productid)
        {
            var ar = await orderContext.cart.FirstOrDefaultAsync(x => x.Product_id == productid);
            if (ar != null)
            {
                orderContext.cart.Remove(ar);
                await orderContext.SaveChangesAsync();
                return ar;
            }
            return null;
        }

        public async Task<List<Cart>> GetAllCart()
        {
            var ar = orderContext.cart.ToListAsync();
            return await ar;
        }
    }
}
