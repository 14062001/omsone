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

    public class OrderItemsController : Controller
    {
        private readonly IOrderItems itemsi;
        private readonly OrderContext orderContext;

        public OrderItemsController(IOrderItems itemsi, OrderContext orderContext)
        {
            this.itemsi = itemsi;
            this.orderContext = orderContext;
        }
        [HttpPost]
        [Route("AddnewOrderItem")]
        public async Task<IActionResult> AddnewOrderItem([FromBody]OrderItems orderItems)
        {
            try
            {
                int res = await itemsi.AddNewOrderItems(orderItems);
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
        [HttpGet]
        [Route("ViewCart/{orderid}")]
        public async Task<IActionResult> ShowProductsByName(int orderid)
        {
            try
            {
                var ar = await itemsi.FindByOrderIdCustId(orderid);
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
        [HttpDelete]
        [Route("deleteproductid/{orderid}/{productid}")]
        public async Task<IActionResult> DeleteProduct(int orderid,int productid)
        {
            try
            {
                var ar = await itemsi.DeleteByProdId(orderid, productid);
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
        [HttpPut]
        [Route("updateorderstatus/{productid}/{orderid}")]
        public async Task<IActionResult> updatestatus(int orderid,int productid, OrderItems orderitems)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int res = await itemsi.UpdateOrderStatus(orderid, productid, orderitems);
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
        [HttpPut]
        [Route("updatproductid/{productid}/{orderid}")]
        public async Task<IActionResult> updateproductid(int orderid, int productid, OrderItems orderitems)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int res = await itemsi.UpdateProductid(orderid, productid, orderitems);
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
        [HttpPut]
        [Route("updateorderid/{productid}/{orderid}")]
        public async Task<IActionResult> updateorderidnew(int orderid, OrderItems orderitems)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int res = await itemsi.UpdateOrderid(orderid, orderitems);
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