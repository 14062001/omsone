using OrderManagement_v4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Repository
{
    public interface IProduct
    {
        Task<List<Product>> GetAllProducts();
        Task<List<Product>> SearchByProductName(string productname);
        Task<List<Product>> SearchByProductId(int productid);
        Task<int> AddNewProduct(Product product);
       
       
    }
}
