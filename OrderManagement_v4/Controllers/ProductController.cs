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
   
    public class ProductController : ControllerBase
    {
        private readonly IProduct prod;
        private readonly OrderContext orderContext;

        public ProductController(IProduct prod, OrderContext orderContext)
        {
            this.prod = prod;
            this.orderContext = orderContext;
        }
        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> ShowAllProducts()
        {
            try
            {
                var ar = await prod.GetAllProducts();
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
        [Route("GetProductByName")]
        public async Task<IActionResult> ShowProductsByName(string productname)
        {
            try
            {
                var ar = await prod.SearchByProductName(productname);
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
        [Route("GetProductById/{productid}")]
        public async Task<IActionResult> ShowProductsById(int productid)
        {
            try
            {
                var ar = await prod.SearchByProductId(productid);
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
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody]Product product)
        {
            try
            {
                int res = await prod.AddNewProduct(product);
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