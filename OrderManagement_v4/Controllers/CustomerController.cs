using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderManagement_v4.Models;
using OrderManagement_v4.Repository;

namespace OrderManagement_v4.Controllers
{
  
    public class CustomerController : ControllerBase
    {
        
        private readonly ICustomer cust;
        private readonly OrderContext orderContext;

        public CustomerController(ICustomer cust, OrderContext orderContext)
        {
            this.cust = cust;
            this.orderContext = orderContext;
        }

        [HttpGet]
        [Route("login/{username}/{password}")]
        public async Task<IActionResult> Login(string username, string password)
        {
            try
            {
                var res = await cust.Login(username, password);
                if (res != null)
                {
                    return Ok(res);
                }
                return NotFound();
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
        [HttpGet]
        [Route("customer/{username}")]
        public async Task<IActionResult> CustomerDetails(string username)
        {
            try
            {
                var res = await cust.SearchByUsername(username);
                if (res != null)
                {
                    return Ok(res);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
        [HttpPost]
        [Route("RegisterCustomer")]
        public async Task<IActionResult> RegisterCustomer([FromBody]Customer customer)
        {
            try
            {
                int res = await cust.AddNewCustomer(customer);
                if (res > 0)
                {
                    return Ok(res);
                }

                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
        [HttpPut]
        [Route("updatecustomer/{customerid}")]
        public async Task<IActionResult> EditCustomer(int customerid, Customer customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int res = await cust.UpdateCustomer(customerid, customer);
                    if (res > 0)
                    {
                        return Ok(res);
                    }
                    return NotFound();
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
    }
}