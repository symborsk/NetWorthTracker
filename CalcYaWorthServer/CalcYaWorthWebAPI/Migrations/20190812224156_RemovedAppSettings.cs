using Microsoft.EntityFrameworkCore.Migrations;

namespace CalcYaWorthWebAPI.Migrations
{
    public partial class RemovedAppSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppSettings");

            migrationBuilder.RenameColumn(
                name: "BaseAmount",
                table: "Liabilities",
                newName: "AmountBase");

            migrationBuilder.RenameColumn(
                name: "BaseAmount",
                table: "Assets",
                newName: "AmountBase");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AmountBase",
                table: "Liabilities",
                newName: "BaseAmount");

            migrationBuilder.RenameColumn(
                name: "AmountBase",
                table: "Assets",
                newName: "BaseAmount");

            migrationBuilder.CreateTable(
                name: "AppSettings",
                columns: table => new
                {
                    SettingName = table.Column<string>(maxLength: 255, nullable: false),
                    SettingValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppSettings", x => x.SettingName);
                });
        }
    }
}
