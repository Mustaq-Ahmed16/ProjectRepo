using System.ComponentModel.DataAnnotations;

namespace ProjectTestD.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string VehicleNumber { get; set; }
        public List<Trip> Trips { get; set; }
    }
}
