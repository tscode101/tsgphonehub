// storage.js

export function fetchAndStoreData() {
  fetch("utils.json")
    .then((response) => response.json())
    .then((utils) => {
      // Convert the array to a JSON string
      const utilsString = JSON.stringify(utils);

      // Store the JSON string in local storage
      localStorage.setItem("utilsData", utilsString);
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
}

export function getStoredData() {
  const storedUtilsString = localStorage.getItem("utilsData");
  const storedUtils = JSON.parse(storedUtilsString) || [];
  return storedUtils;
}
