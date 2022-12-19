using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement_v4.Models;

namespace OrderManagement_v4.Repository
{
    public class CustomerRepo : ICustomer
    {
        private readonly OrderContext orderContext;

        public CustomerRepo(OrderContext orderContext)
        {
            this.orderContext = orderContext;
        }
        public async Task<int> AddNewCustomer(Customer customer)
        {
            var _Customer = new Customer
            {
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Address = customer.Address,
                Email = customer.Email,
                Password = customer.Password,
                State = customer.State,
                City = customer.City,
                Pincode = customer.Pincode,
                Gender = customer.Gender,
                Mobileno = customer.Mobileno
            };
            orderContext.customers.Add(_Customer);

            await orderContext.SaveChangesAsync();
            return _Customer.Cust_id;
        }

        public async Task<Customer> Login(string Username, string Password)
        {
            var ar = await orderContext.customers.Where(x => x.Email == Username && x.Password == Password).FirstOrDefaultAsync();
            if (ar != null)
            {
                return ar;
            }
            return null;
        }

        public async Task<Customer> SearchByUsername(string username)
        {
            var ar = orderContext.customers.Where(x => x.Email == username).FirstOrDefaultAsync();
            if (ar != null)
            {
                return await ar;
            }
            return null;
        }

        public async Task<int> UpdateCustomer(int customerid, Customer customer)
        {
            var data = await orderContext.customers.Where(x => x.Cust_id == customerid).FirstOrDefaultAsync();
            if (data != null)
            {

                data.City = customer.City;
                data.Address = customer.Address;
                data.FirstName = customer.FirstName;
                data.Gender = customer.Gender;
                data.LastName = customer.LastName;
                data.Mobileno = customer.Mobileno;
                data.Pincode = customer.Pincode;
                data.State = data.State;
                int res = await orderContext.SaveChangesAsync();
                if (res > 0)
                {
                    return (int)customer.Cust_id;
                }
                return 0;
            }
            return 0;
        }
    }
}
