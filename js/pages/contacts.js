function initMap() {
    // The location of wic
    const wic = { lat: 40.61733482708021, lng: -8.6551074 };
    // The map, centered at wic
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: wic,
    });
    // The marker, positioned at wic
    const marker = new google.maps.Marker({
      position: wic,
      map: map,
    });
  }