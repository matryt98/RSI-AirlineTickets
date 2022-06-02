using WebAPI.Models;
using WebAPI.Models.Database;

namespace WebAPI.Helpers
{
    public static class DataGenerator
    {
        public static void Initialize(DataContext context)
        {
            context.SaveChanges();
        }
    }
}
