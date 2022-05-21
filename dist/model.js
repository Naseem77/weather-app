class City {
  constructor() {
    this.citiesArray = [];
  }
  
  async getDataFromDB() {
    this.citiesArray = await $.get("/cities");
  }

   async getCityData(cityName) {
    let newCity = await $.get(`city/?cityName=${cityName}`);
    this.citiesArray.push(newCity)
  }

  async saveCity(cityName) {
    $.post("/city", {cityName: cityName}, function (response) {
    });
  }
  async removeCity(cityName) {
        return $.ajax({
            method: "DELETE",
            url: `city/?cityName=${cityName}`,
            data: { cityName: cityName },
            success: (response) => {
                this.DeletedCityInArray(cityName)
            },
        })
    }

  DeletedCityInArray(cityName) {
    for (let i = 0; i < this.citiesArray.length; i++) {
      if (cityName === this.citiesArray[i].name) {
        this.citiesArray.splice(i,1)
      }
    }
  }

  getCityArray() {
    return this.citiesArray.slice();
  }
}
