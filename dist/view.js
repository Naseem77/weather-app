const source = $("#cities-template").html();
const template = Handlebars.compile(source);

class Renderer {
  renderData() {}

  render(citiesArray) {
    const citiesInfo = { cities: citiesArray };
    $(".weather-container").empty();
    const newHTML = template(citiesInfo);
    $(".weather-container").append(newHTML);
  }
}
