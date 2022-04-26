using Application.Activities;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.Middleware;
using API.SignalR;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace API
{
    public class Startup
    {
        public IConfiguration _config { get; }
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(config => {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny()); //prevent from being used in iFrame
            app.UseCsp(opt => opt
                .BlockAllMixedContent()
                .DefaultSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "data:"))
                .ChildSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css", "https://fonts.gstatic.com"))
                .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"))
                .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com",
                    "https://cdn.jsdelivr.net", "data:"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "data:"))
                .ScriptSources(s => s.Self().CustomSources("https://cdn.jsdelivr.net"))
            ); // get info about what would not work with CSP in console
//default-src https:; img-src * 'self' data: https:; style-src 'self' 'unsafe-inline' www.google.com platform.twitter.com cdn.syndication.twimg.com fonts.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.google.com cse.google.com cdn.syndication.twimg.com platform.twitter.com platform.instagram.com www.instagram.com cdn1.developermedia.com cdn2.developermedia.com apis.google.com www.googletagservices.com adservice.google.com securepubads.g.doubleclick.net ajax.aspnetcdn.com ssl.google-analytics.com az416426.vo.msecnd.net/;
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }else {
            //app.UseStrictTransportSecurity(new HstsOptions(TimeSpan.FromDays(365), includeSubDomains: true, preload: true));
                app.UseHsts(h => h.IncludeSubdomains());
                app.Use(async (context, next) => {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();  // look in wwwroot folder
            app.UseStaticFiles();   // serve static files; if folder is wwwroot, no config required

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback"); // unrecognised routes
            });
        }
    }
}
