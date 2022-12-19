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
    public class CartController : Controller
    {
        private readonly ICart icart;
        private readonly OrderContext orderContext;

        public CartController(ICart icart, OrderContext orderContext)
        {
            this.icart = icart;
            this.orderContext = orderContext;
        }
        [HttpPost]
        [Route("AddCart")]
        public async Task<IActionResult> AddCart([FromBody]Cart cart)
        {
            try
            {
                int res = await icart.AddNewCart(cart);
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
        [Route("GetAllCartProducts")]
        public async Task<IActionResult> ShowAllProducts()
        {
            try
            {
                var ar = await icart.GetAllCart();
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
        [Route("deleteall")]
        public async Task<IActionResult> DeleteAllProducts()
        {
            try
            {
                var ar = await icart.DeleteAll();
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
        [Route("deleteproduct/{productid}")]
        public async Task<IActionResult> DeleteProduct(int productid)
        {
            try
            {
                var ar = await icart.DeleteByProdId(productid);
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
    }
}