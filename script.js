let waktuSolat = {
  //fetch waktu solat from api
  fetchWaktuSolat: function (cityName) {
    fetch(
      `http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=malaysia`
    )
      .then((response) => response.json())
      .then((data) => this.displayWaktuSolat(data));
  },
  displayWaktuSolat: function (data) {
    //destucturing day name
    const { en: dayName } = data.data.date.gregorian.weekday;
    //destructuring roman date
    const { readable: romanDate } = data.data.date;
    //destructuring hijri date
    const { day: hijriDay } = data.data.date.hijri;
    const { en: hijriMonth } = data.data.date.hijri.month;
    const { year: hijriYear } = data.data.date.hijri;
    const hijriDate = `${hijriDay} ${hijriMonth} ${hijriYear}`;

    //destructuring waktusolaton current day;
    const {
      Fajr: Subuh,
      Sunrise: Syuruk,
      Dhuhr: Zohor,
      Asr: Asar,
      Maghrib,
      Isha: Isyak,
      Imsak,
    } = data.data.timings;
    //append data from api to the respective div
    //info-header part
    document.querySelector(".day").innerText = `${dayName}`;
    document.querySelector(".roman-date").innerText = `${romanDate}`;
    document.querySelector(".hijri-date").innerText = `${hijriDate}`;
    //info timing
    document.querySelector(".imsak").innerText = `${Imsak}`;
    document.querySelector(".subuh").innerText = `${Subuh}`;
    document.querySelector(".syuruk").innerText = `${Syuruk}`;
    document.querySelector(".zohor").innerText = `${Zohor}`;
    document.querySelector(".asar").innerText = `${Asar}`;
    document.querySelector(".maghrib").innerText = `${Maghrib}`;
    document.querySelector(".isyak").innerText = `${Isyak}`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?mosque')";
  },
  search: function () {
    this.fetchWaktuSolat(document.querySelector(".search-bar").value);
  },
  displayCity: function () {
    document.querySelector(".location").innerText = document.querySelector(
      ".search-bar"
    ).value;
  },
  clearInput: function () {
    document.querySelector("input").value = "";
  },
  currentTime: function (){
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    return (m < 10? `${h}:0${m}`: h < 10? `0${h}:${m}`: `${h}:${m}`);
  },
  currentTimeLive: function (){
    document.querySelector(".clock").innerText = this.currentTime();
  },
  changeBackground: function () {
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?mosque')";
  }
};

//search by hitting search icon
document.querySelector(".search button").addEventListener("click", () => {
  waktuSolat.displayCity();
  waktuSolat.search();
  waktuSolat.clearInput();
  waktuSolat.currentTimeLive();
  waktuSolat.changeBackground();
});

//search by hitting enter key
document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    waktuSolat.displayCity();
    waktuSolat.search();
    waktuSolat.clearInput();
    waktuSolat.currentTimeLive();
    waktuSolat.changeBackground();
  }
});