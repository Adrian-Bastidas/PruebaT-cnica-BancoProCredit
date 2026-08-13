using BancoProcredit.Infrastructure.Configuration;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
var jwtSettings = configuration.GetSection("Jwt");

// Servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Infraestructura
builder.Services.AddInfrastructureServices(connectionString);

// JWT Auth
builder.Services.AddAuthenticationConfiguration(
    jwtSettings["Secret"] ?? "",
    jwtSettings["Issuer"] ?? "",
    jwtSettings["Audience"] ?? "",
    int.Parse(jwtSettings["ExpireMinutes"] ?? "60")
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();