using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;
using WebAPI.Models.Database;

namespace WebAPI.Filters
{
    public class AuthenticationFilter : IActionFilter
    {
        private static readonly Encoding ISO_8859_1_ENCODING = Encoding.GetEncoding("ISO-8859-1");

        private readonly DataContext _context;
        public AuthenticationFilter(DataContext context)
        {
            _context = context;
        }
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue("Authorization", out var headerResult))
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            // our code before action executes
            string authorization = headerResult.ToString();
            if (authorization == null || !authorization.Contains("Basic "))
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            string encodedUsernamePassword = authorization.Substring("Basic ".Length).Trim();
            string usernamePassword = ISO_8859_1_ENCODING.GetString(Convert.FromBase64String(encodedUsernamePassword));
            string username = usernamePassword.Split(':')[0];
            string password = usernamePassword.Split(':')[1];

            //var user = _context.User.Where(u => u.Login == username && u.Password == password);//if (username != "aaa" || password != "bbb")
            if (!_context.User.Any(u => u.Login == username && u.Password == password))
                context.Result = new UnauthorizedResult();
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // our code after action executes
        }
    }
}
