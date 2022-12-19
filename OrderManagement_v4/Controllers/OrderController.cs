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

   
    public class OrderController : ControllerBase
    {
        private readonly IOrder orderi;
        private readonly OrderContext orderContext;
       

        public OrderController(IOrder orderi,OrderContext orderContext)
        {
            this.orderi = orderi;
            this.orderContext = orderContext;
        }
        [HttpGet]   
        [Route("GetAllOrders")]
        public async Task<IActionResult> ShowAllOrders()
        {
            try
            {
                var ar = await orderi.GetAllOrders();
                if (ar != null)
                {
                    return Ok(ar);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
        [HttpGet]
        [Route("GetAllOrderofcustomer/{Cust_id}")]
        public async Task<IActionResult> CustomerOrders(int Cust_id)
        {
            try
            {
                var ar = await orderi.GetAllOrderofCustomer(Cust_id);
                if (ar != null)
                {
                    return Ok(ar);
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
        [Route("AddNewOrder")]
        public async Task<IActionResult> AddNewOrder([FromBody]Order order)
        {
            try
            {
                int ar = await orderi.AddNewOrder(order);
                if (ar > 0)
                {
                    return Ok(ar);

                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }

        }
        [HttpGet]
        [Route("GetByOrderid/{orderid}")]
        public async Task<IActionResult> FindByOrderId(int orderid)
        {
            try
            {
                var ar = await orderi.SearchByOrderId(orderid);
                if (ar != null)
                {
                    return Ok(ar);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
        [HttpGet]
        [Route("GetByCustid/{custid}/{orderid}")]
        public async Task<IActionResult> FindByCustId(int custid,int orderid)
        {
            try
            {
                var ar = await orderi.SearchByCustId(custid, orderid);
                if (ar != 0)
                {
                    return Ok(ar);
                }
                return Ok(0);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error retrieving data from the database");
            }
        }
        [HttpPut]
        [Route("updateorder/{id}")]
        public async Task<IActionResult> update(int id, [FromBody] Order order)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = await orderi.UpdateOrder(id, order);
                    if (res != null)
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
        [HttpPut]
        [Route("updatepaymentmethod/{id}")]
        public async Task<IActionResult> updatepaymentmethod(int id, [FromBody] Order order)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = await orderi.UpdatePaymentMethod(id, order);
                    if (res != null)
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
        [HttpGet]
        [Route("orderbystatus")]
        public async Task<IActionResult> Statusview()
        {
            try
            {
                var res = await orderi.SearchByStatus();
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

        [HttpDelete]
        [Route("DeleteOrder/{orderid}")]
        public async Task<IActionResult> DeleteManager(int orderid)
        {
            try
            {
                int res = await orderi.DeleteOrder(orderid);
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
    }
}