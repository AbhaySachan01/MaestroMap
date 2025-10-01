import eventAgent from "../agents/Events.js";
import weatherAgent from "../agents/Weather.js";

export const orchestrateTrip = async (req, res) => {
  try {
    const { destination, startDate,endDate, budgetPreference } = req.body;

    const weather = await weatherAgent(destination, startDate,endDate);
    const event=await eventAgent(destination,startDate,endDate);
    const tripPlan = {
      destination,
      startDate,
      endDate,
      weather,
      event
    };

    res.json({ success: true, tripPlan });
  } catch (error) {
    console.error("Orchestrator error:", error.message);
    res.status(500).json({ success: false, error: "Trip planning failed" });
  }
};
