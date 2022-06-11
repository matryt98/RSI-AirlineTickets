using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Models.Database;

namespace WebAPI.Filters
{
    public class ReservationValidatorFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var body = context.ActionArguments["reservation"] as Reservation;
            if (String.IsNullOrEmpty(body.Surname) || String.IsNullOrEmpty(body.Name) || body.Tickets < 1 || String.IsNullOrEmpty(body.Email))
            {
                context.Result = new BadRequestObjectResult("One or more of the necessarry reservation fields are empty");
                return;
            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // our code after action executes
        }
    }
}
