using OrderManagement_v4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement_v4.Repository
{
    public interface ICustomer
    {
        Task<Customer> Login(string username, string password);
        Task<Customer> SearchByUsername(string username);
        Task<int> AddNewCustomer(Customer customer);
        Task<int> UpdateCustomer(int customerid, Customer customer);

    }
}
