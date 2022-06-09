using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.Filters
{
    public class ReservationValidatorFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // our code before action executes
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // our code after action executes
            context.HttpContext.Response.Headers.Add("custom-header", "headerContent");
        }
    }
}
