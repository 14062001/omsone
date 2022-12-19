using OrderManagement_v4.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Repository
{
    public interface ICart
    {
        Task<List<Cart>> GetAllCart();
        Task<int> AddNewCart(Cart cart);
        Task<int> DeleteAll();
        Task<Cart> DeleteByProdId(int productid);
    }
}
