import taxiData from "./admin/Places/taxiData";

const taxis = taxiData
  .filter((taxi) => taxi.status === "Active")
  .map((taxi) => ({
    ...taxi,
    price: `₹${taxi.pricePerKm}/km`,
    service: "Call",
  }));

export default taxis;
