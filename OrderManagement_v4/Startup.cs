using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
//using Microsoft.OpenApi.Models;
using OrderManagement_v4.Models;
using OrderManagement_v4.Repository;
using Swashbuckle.AspNetCore.Swagger;

namespace OrderManagement_v4
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ICustomer, CustomerRepo>();
            services.AddScoped<IProduct, ProductRepo>();
            services.AddScoped<IOrder, OrderRepo>();
            services.AddScoped<IOrderItems, OrderItemsRepo>();
            services.AddScoped<ICart, CartRepo>();
            services.AddCors(option =>
            {
                option.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContextPool<OrderContext>(options => options.UseSqlServer
            (Configuration.GetConnectionString("OrderConnectionString")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info {  Version = "v1", Title = "OrderManagement_v4", Description="ASP.NET Core 2.0 Web API"});
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // public void ConfigureProduction(IApplicationBuilder app, IHostingEnvironment env)
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
           
        {
            if (env.IsDevelopment())
                //if (env.IsProduction())
                {
                app.UseDeveloperExceptionPage();

            }
            else
            {
                app.UseHsts();
            }
            app.UseCors();
            app.UseHttpsRedirection();
            
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "OrderManagement_v4 v1");
                c.RoutePrefix = string.Empty;
            });

        

        }
    }
}
