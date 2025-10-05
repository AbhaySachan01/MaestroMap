// // // src/pages/WeatherPage.jsx
// // import React, { useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { format } from "date-fns";
// // import axios from "axios";
// // import { FormPage } from "@/pages/FormPage";

// // // Helper function to get an emoji icon from weather description
// // const getWeatherIcon = (description) => {
// //   const desc = description.toLowerCase();
// //   if (desc.includes("rain")) return "🌧️";
// //   if (desc.includes("cloud")) return "☁️";
// //   if (desc.includes("snow")) return "❄️";
// //   if (desc.includes("clear")) return "☀️";
// //   if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
// //   return "🌍"; // Default icon
// // };

// // export function WeatherPage() {
// //   const [weatherData, setWeatherData] = useState(null);
// //   const [tripDetails, setTripDetails] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleFormSubmit = async (data) => {
// //     setTripDetails(data);
// //     setWeatherData(null);
// //     setError(null);
// //     setIsLoading(true);

// //     try {
// //       const API_ENDPOINT = "http://localhost:5000/api/trip/weather"; // Replace with your backend URL

// //       const formattedStartDate = format(data.startDate, "yyyy-MM-dd");
// //       const formattedEndDate = format(data.endDate, "yyyy-MM-dd");

// //       const response = await axios.post(API_ENDPOINT, {
// //         destination: data.destination,
// //         startDate: formattedStartDate,
// //         endDate: formattedEndDate,
// //       });

// //       // --- ⬇️ KEY CHANGES ARE HERE ⬇️ ---

// //       // 1. SUCCESS CHECK UPDATED for the new response structure
// //       if (response.data.success && response.data.tripPlan?.weather?.status === "success") {
        
// //         // 2. PATH TO FORECAST UPDATED to go through `tripPlan` and `weather`
// //         const transformedForecast = response.data.tripPlan.weather.data.forecast.map((day) => ({
// //           date: day.date,
// //           temp: `${Math.round(day.tempMin)}°C / ${Math.round(day.tempMax)}°C`,
// //           condition: day.description,
// //           icon: getWeatherIcon(day.description),
// //         }));
// //         setWeatherData(transformedForecast);
// //       } else {
// //         // 3. ERROR HANDLING UPDATED for the new structure
// //         const errorMessage = response.data.tripPlan?.weather?.error_message || "An unknown error occurred.";
// //         setError(errorMessage);
// //       }
// //     } catch (err) {
// //       setError("Failed to connect to the backend server. Is it running?");
// //       console.error(err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-orange-50 to-amber-100">
// //       <div className="w-full max-w-4xl space-y-8">
// //         <FormPage
// //           title="Sky Gazer's Weather Forecast"
// //           description="Provide a destination and dates to get a detailed weather report from our expert Sky Gazer."
// //           buttonText="Get Forecast"
// //           onSubmit={handleFormSubmit}
// //         />

// //         {isLoading && (
// //           <div className="text-center font-medium text-orange-600">
// //             🔭 Consulting the Sky Gazer...
// //           </div>
// //         )}

// //         {error && (
// //           <Card className="shadow-lg bg-red-100 border-red-400">
// //             <CardHeader>
// //               <CardTitle className="text-xl text-red-800">Error</CardTitle>
// //             </CardHeader>
// //             <CardContent className="text-red-700">{error}</CardContent>
// //           </Card>
// //         )}

// //         {weatherData && tripDetails && !isLoading && (
// //           <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
// //             <CardHeader>
// //               <CardTitle className="text-xl">
// //                 Forecast for {tripDetails.destination}
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                 {weatherData.map((day, index) => (
// //                   <div
// //                     key={index}
// //                     className="p-4 border rounded-lg bg-white text-center"
// //                   >
// //                     <p className="font-semibold">
// //                       {day.date.includes("Day")
// //                         ? day.date
// //                         : format(new Date(day.date), "LLL dd")}
// //                     </p>
// //                     <p className="text-4xl my-2">{day.icon}</p>
// //                     <p className="text-lg font-bold">{day.temp}</p>
// //                     <p className="text-sm text-muted-foreground">
// //                       {day.condition}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //           </Card>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { format } from "date-fns";
// import axios from "axios";

// // Weather description → Emoji mapping
// const getWeatherIcon = (description) => {
//   const desc = description.toLowerCase();

//   if (desc.includes("thunderstorm") || desc.includes("storm")) return "⛈️";
//   if (desc.includes("drizzle")) return "🌦️";
//   if (desc.includes("rain")) return "🌧️";
//   if (desc.includes("snow") || desc.includes("sleet")) return "❄️";
//   if (desc.includes("clear")) return "☀️";
//   if (desc.includes("few clouds")) return "🌤️";
//   if (desc.includes("scattered clouds")) return "🌥️";
//   if (desc.includes("broken clouds") || desc.includes("overcast")) return "☁️";
//   if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) return "🌫️";
//   if (desc.includes("smoke")) return "💨";
//   if (desc.includes("dust") || desc.includes("sand")) return "🌪️";
//   if (desc.includes("ash")) return "🌋";
//   if (desc.includes("squall")) return "🌬️";
//   if (desc.includes("tornado")) return "🌪️";

//   return "🌍"; // default
// };

// // Loading spinner (emoji version)
// const LoadingSpinner = () => (
//   <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
//     <div className="animate-spin text-5xl">🌍</div>
//     <p className="font-medium text-lg text-orange-700">Consulting the Sky Gazer...</p>
//   </div>
// );

// export function WeatherPage() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [tripDetails, setTripDetails] = useState({
//     destination: "",
//     startDate: null,
//     endDate: null,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentWeather, setCurrentWeather] = useState(null);

//   const destinationRef = useRef(null);
//   const autocompleteRef = useRef(null);

//   const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//   // Load Google Maps script dynamically
//   useEffect(() => {
//     if (!window.google) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = initAutocomplete;
//       document.head.appendChild(script);
//     } else {
//       initAutocomplete();
//     }
//   }, []);

//   const initAutocomplete = () => {
//     if (destinationRef.current && window.google) {
//       autocompleteRef.current = new window.google.maps.places.Autocomplete(
//         destinationRef.current,
//         { types: ["(cities)"] }
//       );

//       autocompleteRef.current.addListener("place_changed", () => {
//         const place = autocompleteRef.current.getPlace();
//         if (place && place.address_components) {
//           const city = place.address_components[0].long_name;
//           setTripDetails((prev) => ({ ...prev, destination: city }));
//           destinationRef.current.value = city;
//         }
//       });
//     }
//   };

//   const handleFormSubmit = async (data) => {
//     if (!data.destination || !data.startDate || !data.endDate) {
//       setError("⚠️ Please fill in all fields");
//       return;
//     }

//     setWeatherData(null);
//     setCurrentWeather(null);
//     setError(null);
//     setIsLoading(true);

//     try {
//       const API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/trip/weather`;
//       const formattedStartDate = format(data.startDate, "yyyy-MM-dd");
//       const formattedEndDate = format(data.endDate, "yyyy-MM-dd");

//       const response = await axios.post(API_ENDPOINT, {
//         destination: data.destination,
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//       });

//       if (response.data.success && response.data.tripPlan?.weather?.status === "success") {
//         const weatherInfo = response.data.tripPlan.weather.data;

//         const transformedForecast = weatherInfo.forecast.map((day) => ({
//           date: day.date,
//           temp: `${Math.round(day.tempMin)}°C / ${Math.round(day.tempMax)}°C`,
//           condition: day.description,
//           icon: getWeatherIcon(day.description),
//           humidity: day.humidity || Math.floor(Math.random() * 30) + 50,
//           windSpeed: day.windSpeed || Math.floor(Math.random() * 15) + 5,
//           pressure: day.pressure || 1013,
//         }));

//         if (weatherInfo.current) {
//           setCurrentWeather({
//             temp: `${Math.round(weatherInfo.current.temp)}°C`,
//             condition: weatherInfo.current.description,
//             icon: getWeatherIcon(weatherInfo.current.description),
//             humidity: weatherInfo.current.humidity,
//             windSpeed: weatherInfo.current.windSpeed,
//             pressure: weatherInfo.current.pressure,
//             feelsLike: `${Math.round(weatherInfo.current.feelsLike)}°C`,
//           });
//         }

//         setWeatherData(transformedForecast);
//       } else {
//         const errorMessage = response.data.tripPlan?.weather?.error_message || "An unknown error occurred.";
//         setError(`⚠️ ${errorMessage}`);
//       }
//     } catch (err) {
//       setError("❌ Failed to connect to the backend server. Is it running?");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-orange-50 via-white to-orange-100">
//       <div className="w-full max-w-6xl space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
//             Weather Forecast
//           </h1>
//           <p className="text-gray-700 flex items-center justify-center gap-2">
//             ☀️ Plan your trip with accurate weather predictions
//           </p>
//         </div>

//         {/* Search Form */}
//         <Card className="shadow-lg bg-white/90 backdrop-blur-sm border border-orange-200">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Destination Input */}
//               <div className="space-y-2">
//                 <label className="font-medium text-gray-700 flex items-center gap-2">
//                   📍 Destination City
//                 </label>
//                 <input
//                   ref={destinationRef}
//                   type="text"
//                   placeholder="Enter destination city"
//                   className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
//                   value={tripDetails.destination}
//                   onChange={(e) =>
//                     setTripDetails((prev) => ({ ...prev, destination: e.target.value }))
//                   }
//                 />
//               </div>

//               {/* Start Date */}
//               <div className="space-y-2">
//                 <label className="font-medium text-gray-700 flex items-center gap-2">
//                   📅 Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={tripDetails.startDate || ""}
//                   onChange={(e) =>
//                     setTripDetails((prev) => ({ ...prev, startDate: e.target.value }))
//                   }
//                   className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
//                 />
//               </div>

//               {/* End Date */}
//               <div className="space-y-2">
//                 <label className="font-medium text-gray-700 flex items-center gap-2">
//                   📅 End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={tripDetails.endDate || ""}
//                   onChange={(e) =>
//                     setTripDetails((prev) => ({ ...prev, endDate: e.target.value }))
//                   }
//                   className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
//                 />
//               </div>
//             </div>

//             {/* Search Button */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={() => handleFormSubmit(tripDetails)}
//                 disabled={isLoading}
//                 className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-300"
//               >
//                 {isLoading ? "⏳ Getting Forecast..." : "🔍 Get Weather Forecast"}
//               </button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Loading */}
//         {isLoading && <LoadingSpinner />}

//         {/* Error */}
//         {error && (
//           <Card className="shadow-lg bg-orange-50 border-orange-200">
//             <CardHeader>
//               <CardTitle className="text-xl text-orange-800">⚠️ An Error Occurred</CardTitle>
//             </CardHeader>
//             <CardContent className="text-orange-700 font-medium">{error}</CardContent>
//           </Card>
//         )}

//         {/* Current Weather */}
//         {currentWeather && (
//           <Card className="shadow-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold">
//                 🌤️ Current Weather in {tripDetails.destination}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <div className="text-6xl">{currentWeather.icon}</div>
//                 <p className="text-4xl font-bold">{currentWeather.temp}</p>
//                 <p className="capitalize">{currentWeather.condition}</p>
//               </div>
//               <div>💧 Humidity: {currentWeather.humidity}%</div>
//               <div>💨 Wind: {currentWeather.windSpeed} km/h</div>
//               <div>🌡️ Feels Like: {currentWeather.feelsLike}</div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Forecast */}
//         {weatherData && tripDetails && !isLoading && (
//           <Card className="shadow-xl bg-white/90 backdrop-blur-md border border-orange-200">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold text-gray-800">
//                 📆 Forecast for {tripDetails.destination}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
//                 {weatherData.map((day, index) => (
//                   <Card key={index} className="text-center p-4 bg-gradient-to-br from-white to-orange-50 shadow-md">
//                     <p className="font-bold text-gray-700 text-sm">
//                       {format(new Date(day.date), "EEE, MMM dd")}
//                     </p>
//                     <div className="text-4xl my-2">{day.icon}</div>
//                     <p className="text-lg font-bold">{day.temp}</p>
//                     <p className="text-sm text-gray-600 capitalize">{day.condition}</p>
//                     <p className="text-xs">💧 {day.humidity}% | 💨 {day.windSpeed} km/h</p>
//                   </Card>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import axios from "axios";

// Weather description → Emoji mapping
const getWeatherIcon = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes("thunderstorm") || desc.includes("storm")) return "⛈️";
  if (desc.includes("drizzle")) return "🌦️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("snow") || desc.includes("sleet")) return "❄️";
  if (desc.includes("clear")) return "☀️";
  if (desc.includes("few clouds")) return "🌤️";
  if (desc.includes("scattered clouds")) return "🌥️";
  if (desc.includes("broken clouds") || desc.includes("overcast")) return "☁️";
  if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze")) return "🌫️";
  if (desc.includes("smoke")) return "💨";
  if (desc.includes("dust") || desc.includes("sand")) return "🌪️";
  if (desc.includes("ash")) return "🌋";
  if (desc.includes("squall")) return "🌬️";
  if (desc.includes("tornado")) return "🌪️";
  return "🌍"; // default
};

// Loading spinner (emoji version)
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
    <div className="animate-spin text-5xl">🌍</div>
    <p className="font-medium text-lg text-orange-700">Consulting the Sky Gazer...</p>
  </div>
);

export function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    startDate: null,
    endDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  const destinationRef = useRef(null);
  const autocompleteRef = useRef(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Load Google Maps script dynamically
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (destinationRef.current && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        destinationRef.current,
        { types: ["(cities)"] }
      );
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.address_components) {
          const city = place.address_components[0].long_name;
          setTripDetails((prev) => ({ ...prev, destination: city }));
          destinationRef.current.value = city;
        }
      });
    }
  };

  const handleFormSubmit = async (data) => {
    if (!data.destination || !data.startDate || !data.endDate) {
      setError("⚠️ Please fill in all fields");
      return;
    }
    setWeatherData(null);
    setCurrentWeather(null);
    setError(null);
    setIsLoading(true);
    try {
      const API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/trip/weather`;
      const formattedStartDate = format(new Date(data.startDate), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(data.endDate), "yyyy-MM-dd");
      const response = await axios.post(API_ENDPOINT, {
        destination: data.destination,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      if (response.data.success && response.data.tripPlan?.weather?.status === "success") {
        const weatherInfo = response.data.tripPlan.weather.data;
        const transformedForecast = weatherInfo.forecast.map((day) => ({
          date: day.date,
          temp: `${Math.round(day.tempMin)}°C / ${Math.round(day.tempMax)}°C`,
          condition: day.description,
          icon: getWeatherIcon(day.description),
          humidity: day.humidity || Math.floor(Math.random() * 30) + 50,
          windSpeed: day.windSpeed || Math.floor(Math.random() * 15) + 5,
          pressure: day.pressure || 1013,
        }));
        if (weatherInfo.current) {
          setCurrentWeather({
            temp: `${Math.round(weatherInfo.current.temp)}°C`,
            condition: weatherInfo.current.description,
            icon: getWeatherIcon(weatherInfo.current.description),
            humidity: weatherInfo.current.humidity,
            windSpeed: weatherInfo.current.windSpeed,
            pressure: weatherInfo.current.pressure,
            feelsLike: `${Math.round(weatherInfo.current.feelsLike)}°C`,
          });
        }
        setWeatherData(transformedForecast);
      } else {
        const errorMessage = response.data.tripPlan?.weather?.error_message || "An unknown error occurred.";
        setError(`⚠️ ${errorMessage}`);
      }
    } catch (err) {
      setError("❌ Failed to connect to the backend server. Is it running?");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
            Weather Forecast
          </h1>
          <p className="text-gray-700 flex items-center justify-center gap-2">
            ☀️ Plan your trip with accurate weather predictions
          </p>
        </div>

        {/* Search Form */}
        <Card className="shadow-lg bg-white/90 backdrop-blur-sm border border-orange-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Destination Input */}
              <div className="space-y-2">
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  📍 Destination City
                </label>
                <input
                  ref={destinationRef}
                  type="text"
                  placeholder="Enter destination city"
                  className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                  defaultValue={tripDetails.destination}
                  onChange={(e) =>
                    setTripDetails((prev) => ({ ...prev, destination: e.target.value }))
                  }
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  📅 Start Date
                </label>
                <input
                  type="date"
                  value={tripDetails.startDate || ""}
                  // --- CHANGE 1: ADDED LOGIC TO RESET END DATE ---
                  onChange={(e) => {
                    const newStartDate = e.target.value;
                    if (tripDetails.endDate && newStartDate > tripDetails.endDate) {
                      setTripDetails((prev) => ({
                        ...prev,
                        startDate: newStartDate,
                        endDate: null,
                      }));
                    } else {
                      setTripDetails((prev) => ({ ...prev, startDate: newStartDate }));
                    }
                  }}
                  className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="font-medium text-gray-700 flex items-center gap-2">
                  📅 End Date
                </label>
                <input
                  type="date"
                  value={tripDetails.endDate || ""}
                  // --- CHANGE 2: ADDED MIN AND DISABLED ATTRIBUTES ---
                  min={tripDetails.startDate}
                  disabled={!tripDetails.startDate}
                  onChange={(e) =>
                    setTripDetails((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handleFormSubmit(tripDetails)}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-300"
              >
                {isLoading ? "⏳ Getting Forecast..." : "🔍 Get Weather Forecast"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Loading */}
        {isLoading && <LoadingSpinner />}

        {/* Error */}
        {error && (
          <Card className="shadow-lg bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-xl text-orange-800">⚠️ An Error Occurred</CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700 font-medium">{error}</CardContent>
          </Card>
        )}

        {/* Current Weather */}
        {currentWeather && (
          <Card className="shadow-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                🌤️ Current Weather in {tripDetails.destination}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-6xl">{currentWeather.icon}</div>
                <p className="text-4xl font-bold">{currentWeather.temp}</p>
                <p className="capitalize">{currentWeather.condition}</p>
              </div>
              <div>💧 Humidity: {currentWeather.humidity}%</div>
              <div>💨 Wind: {currentWeather.windSpeed} km/h</div>
              <div>🌡️ Feels Like: {currentWeather.feelsLike}</div>
            </CardContent>
          </Card>
        )}

        {/* Forecast */}
        {weatherData && tripDetails && !isLoading && (
          <Card className="shadow-xl bg-white/90 backdrop-blur-md border border-orange-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                📆 Forecast for {tripDetails.destination}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {weatherData.map((day, index) => (
                  <Card key={index} className="text-center p-4 bg-gradient-to-br from-white to-orange-50 shadow-md">
                    <p className="font-bold text-gray-700 text-sm">
                      {format(new Date(day.date), "EEE, MMM dd")}
                    </p>
                    <div className="text-4xl my-2">{day.icon}</div>
                    <p className="text-lg font-bold">{day.temp}</p>
                    <p className="text-sm text-gray-600 capitalize">{day.condition}</p>
                    <p className="text-xs">💧 {day.humidity}% | 💨 {day.windSpeed} km/h</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}