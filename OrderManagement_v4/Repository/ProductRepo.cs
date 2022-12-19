using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement_v4.Models;

namespace OrderManagement_v4.Repository
{
    public class ProductRepo : IProduct
    {
        private readonly OrderContext orderContext;

        public ProductRepo(OrderContext orderContext)
        {
            this.orderContext = orderContext;
        }
        public async Task<int> AddNewProduct(Product product)
        {
            orderContext.products.Add(product);
            int res = await orderContext.SaveChangesAsync();
            if (res > 0)
            {
                return 1;
            }
            return 0;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            var ar = orderContext.products.ToListAsync();
            return await ar;
        }

       

        public async Task<List<Product>> SearchByProductName(string productname)
        {
            var ar = orderContext.products.Where(x => x.ProductName == productname).ToListAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }
        public async Task<List<Product>> SearchByProductId(int productid)
        {
            var ar = orderContext.products.Where(x => x.Product_id == productid).ToListAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }

    }
}
