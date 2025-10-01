// import axios from "axios";

// export default async function eventAgent(destination, startDate, endDate) {
//   const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY || "";
//   const MEETUP_API_KEY = process.env.MEETUP_API_KEY || "";
//   destination = destination ? destination.trim() : "";
//   startDate = startDate ? startDate.trim() : "";
//   endDate = endDate ? endDate.trim() : "";
//   try {
//     // 1️⃣ Geocode destination
//     const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//       destination
//     )}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`;
//     const geoRes = await axios.get(geoUrl);
//     if (!geoRes.data || geoRes.data.length === 0) {
//       return {
//         agent: "EventAgent",
//         status: "error",
//         error_message: "Destination not found",
//       };
//     }
//     const { lat, lon } = geoRes.data[0];

//     let eventData = [];

//     // -------------------------------
//     // 2️⃣ Try Ticketmaster First
//     // -------------------------------
//     if (TICKETMASTER_API_KEY) {
//       try {
//         const tmUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=50&startDateTime=${startDate}T00:00:00Z&endDateTime=${endDate}T23:59:59Z`;
//         const tmRes = await axios.get(tmUrl);
//         const events = tmRes.data._embedded?.events || [];

//         eventData = events.map((e) => ({
//           name: e.name,
//           date: e.dates.start.localDate,
//           time: e.dates.start.localTime || "Not specified",
//           venue: e._embedded?.venues?.[0]?.name || "Unknown Venue",
//           city: e._embedded?.venues?.[0]?.city?.name || "",
//           country: e._embedded?.venues?.[0]?.country?.name || "",
//           url: e.url,
//           source: "Ticketmaster",
//         }));
//       } catch (err) {
//         console.log("Ticketmaster failed:", err.message);
//       }
//     }

//     // -------------------------------
//     // 3️⃣ Fallback to Eventbrite if no events
//    if (eventData.length === 0 && SEATGEEK_CLIENT_ID) {
//       console.log("No events found in Ticketmaster, trying SeatGeek...");
      
//       try {
//         // SeatGeek uses 'datetime_local' for filtering in the user's timezone
//         const seatGeekUrl = `https://api.seatgeek.com/2/events?lat=${lat}&lon=${lon}&range=50mi&datetime_local.gte=${startDate}&datetime_local.lte=${endDate}&client_id=${SEATGEEK_CLIENT_ID}`;
        
//         const sgRes = await axios.get(seatGeekUrl);
//         let events = sgRes.data.events || [];

//         eventData = events.map((e) => {
//           const eventDate = new Date(e.datetime_local);
//           return {
//             name: e.title,
//             date: eventDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
//             time: eventDate.toTimeString().split(' ')[0], // Format to HH:MM:SS
//             venue: e.venue?.name || "Unknown Venue",
//             city: e.venue?.city || "",
//             country: e.venue?.country || "",
//             url: e.url,
//             source: "SeatGeek",
//           };
//         });
//       } catch (err) {
//         if (err.response) {
//           console.error("SeatGeek API Error:", err.response.status, err.response.data);
//         } else {
//           console.error("SeatGeek failed:", err.message);
//         }
//       }
//     }

//     // -------------------------------
//     // 4️⃣ Return MCP format
//     // -------------------------------
//     if (eventData.length === 0) {
//       return {
//         agent: "EventAgent",
//         status: "success",
//         data: { events: [] },
//         message: "No events found for this location/date range",
//       };
//     }

//     return {
//       agent: "EventAgent",
//       status: "success",
//       data: { events: eventData },
//     };
//   } catch (error) {
//     return {
//       agent: "EventAgent",
//       status: "error",
//       error_message: error.message,
//     };
//   }
// }


import axios from "axios";

export default async function eventAgent(destination, startDate, endDate) {
  const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY || "";

  destination = destination ? destination.trim() : "";
  startDate = startDate ? startDate.trim() : "";
  endDate = endDate ? endDate.trim() : "";

  try {
    // 1️⃣ Geocode destination
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      destination
    )}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`;
    const geoRes = await axios.get(geoUrl);
    if (!geoRes.data || geoRes.data.length === 0) {
      return {
        agent: "EventAgent",
        status: "error",
        error_message: "Destination not found",
      };
    }
    const { lat, lon } = geoRes.data[0];

    let eventData = [];

    if (TICKETMASTER_API_KEY) {
      try {
        const tmUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&latlong=${lat},${lon}&radius=50&startDateTime=${startDate}T00:00:00Z&endDateTime=${endDate}T23:59:59Z`;
        const tmRes = await axios.get(tmUrl);
        const events = tmRes.data._embedded?.events || [];

        eventData = events.map((e) => ({
          name: e.name,
          date: e.dates.start.localDate,
          time: e.dates.start.localTime || "Not specified",
          venue: e._embedded?.venues?.[0]?.name || "Unknown Venue",
          city: e._embedded?.venues?.[0]?.city?.name || "",
          country: e._embedded?.venues?.[0]?.country?.name || "",
          url: e.url,
          source: "Ticketmaster",
        }));
      } catch (err) {
        console.log("Ticketmaster failed:", err.message);
      }
    }

    if (eventData.length === 0) {
      return {
        agent: "EventAgent",
        status: "success",
        data: { events: [] },
        message: "No events found for this location/date range",
      };
    }

    return {
      agent: "EventAgent",
      status: "success",
      data: { events: eventData },
    };
  } catch (error) {
    return {
      agent: "EventAgent",
      status: "error",
      error_message: error.message,
    };
  }
}

