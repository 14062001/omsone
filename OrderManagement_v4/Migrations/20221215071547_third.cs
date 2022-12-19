using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OrderManagement_v4.Migrations
{
    public partial class third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cart",
                columns: table => new
                {
                    cart_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Product_id = table.Column<int>(nullable: false),
                    ProductName = table.Column<string>(type: "varchar(30)", nullable: true),
                    Size = table.Column<string>(type: "varchar(10)", nullable: true),
                    Color = table.Column<string>(type: "varchar(20)", nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Product_details = table.Column<string>(type: "varchar(70)", nullable: true),
                    ImageUrl = table.Column<string>(type: "varchar(30)", nullable: true),
                    ProductPrice = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cart", x => x.cart_id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cart");
        }
    }
}
