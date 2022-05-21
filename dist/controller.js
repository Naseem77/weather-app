city = new City();
renderer = new Renderer();

async function loadPage() {
  await city.getDataFromDB();
  renderer.render(city.getCityArray());
}
loadPage();

$(".searchBtn").on("click", function () {
  let cityName = $("#input").val();
  city.getCityData(cityName)
  renderer.render(city.getCityArray());
});

$(".weather-container").on("click", ".removeBtn", function () {
  let name = $(this).closest(".weather-card").find("h2").text();
  city.removeCity(name);
  loadPage();
});

$(".weather-container").on("click", ".saveBtn", function () {
  let name = $(this).closest(".weather-card").find("h2").text();
  city.saveCity(name);
});



