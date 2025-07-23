namespace ProjectTestD.DTOs
{
    public class TripReadDto
    {
        public int Id { get; set; }
        public string DriverId { get; set; }
        public int VehicleId { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime TripStart { get; set; }
        public DateTime TripEnd { get; set; }
        public DateTime SubmissionDate { get; set; }
    }
}
