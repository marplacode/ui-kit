export function loadLibrary(url, name) {
  return new Promise((resolve, reject) => {
    // Check if the library is already loaded
    if (window[name]) {
      resolve(window[name]);
      return;
    }

    // Create a script element
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    // Handle script loading
    script.onload = () => {
      if (window[name]) {
        resolve(window[name]);
      } else {
        reject(new Error(`Library ${name} failed to load from ${url}`));
      }
    };

    // Handle script loading errors
    script.onerror = () =>
      reject(new Error(`Failed to load script from ${url}`));

    // Append the script to the document
    document.head.appendChild(script);
  });
}

// Example usage:
// loadLibrary(
//   "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js",
//   "moment"
// )
//   .then((lib) => {
//     console.log("Library loaded:", lib);
//     // You can now use the library as window[name]

//     // supoused temp1 is a runtime var on browser console
//     var result = temp1.map(({ client, date, city, location }) => ({
//       client: client,
//       date: moment(date).format("DD/MM/YYYY"),
//       week: moment(date).isoWeek(),
//       time: date,
//       city: city?.name,
//       location: location?.name,
//     }));
//     console.log("RESULT", result);
//   })
//   .catch((err) => console.error(err));
