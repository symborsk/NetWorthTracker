using Microsoft.EntityFrameworkCore.Migrations;

namespace CalcYaWorthWebAPI.Migrations
{
    public partial class UpdateNetworthTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "BaseAmount",
                table: "Liabilities",
                type: "decimal(18, 4)",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "BaseAmount",
                table: "Assets",
                type: "decimal(18, 4)",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "BaseAmount",
                table: "Liabilities",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 4)");

            migrationBuilder.AlterColumn<int>(
                name: "BaseAmount",
                table: "Assets",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 4)");
        }
    }
}
