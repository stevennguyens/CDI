using CDI.Data;
using Microsoft.EntityFrameworkCore;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy
                            .WithOrigins("https://localhost:7080", "https://localhost:44477");
                      });
});

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<MyDbContext>(opt => opt.UseNpgsql(builder.Configuration["DefaultConnection"]));
builder.Services.AddDbContext<ChronicDiseaseIndicatorContext>(opt => opt.UseNpgsql(builder.Configuration["DefaultConnection"]));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);

// app.MapControllers().RequireCors(MyAllowSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
