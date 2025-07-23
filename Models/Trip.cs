using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProjectTestD.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string DriverId { get; set; }
        public ApplicationUser Driver { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime TripStart { get; set; }
        public DateTime TripEnd { get; set; }
        public DateTime SubmissionDate { get; set; }
    }

}
