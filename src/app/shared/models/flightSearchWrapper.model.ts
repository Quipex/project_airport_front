
export class FlightSearchWrapperModel {
  constructor(
    public departureCity?: string,
    public destinationCity?: string,
    public departureDate?: Date,
    public returnDate?: Date
  ) {
  }
}
