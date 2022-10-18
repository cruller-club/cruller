function rand_cruller() {
  const MAX_BYTES = 256;
  const HEX_RADIX = 16;

  // Red
  r_dec = Math.floor(Math.random() * MAX_BYTES);
  r_hex = r_dec.toString(HEX_RADIX).padStart(2, "0");
  
  // Green
  g_dec = Math.floor(Math.random() * MAX_BYTES);
  g_hex = g_dec.toString(HEX_RADIX).padStart(2, "0");

  // Blue
  b_dec = Math.floor(Math.random() * MAX_BYTES);
  b_hex = b_dec.toString(HEX_RADIX).padStart(2, "0");

  cruller = {};
  cruller["red"] = r_dec;
  cruller["green"] = g_dec;
  cruller["blue"] = b_dec;
  cruller["avg"] = (r_dec + g_dec + b_dec) / 3;
  cruller["hex"] = (r_hex + g_hex + b_hex).toUpperCase();

  console.log("Color: #", cruller);

  return cruller;
}

function parse_cruller() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  const CRULLER = /^[0-9a-f]{6}$/i;
  
  cruller = params.c;

  if(cruller == null) {
    return rand_cruller();
  } else if(CRULLER.test(cruller)) {
    console.log(`Cruller from query string: ${cruller}`);

    parsed_cruller = {};
    parsed_cruller["red"] = parseInt(cruller.substring(0,2), 16);
    parsed_cruller["green"] = parseInt(cruller.substring(2,4), 16);
    parsed_cruller["blue"] = parseInt(cruller.substring(4,6), 16);
    parsed_cruller["avg"] = (parsed_cruller["red"] + parsed_cruller["green"] + parsed_cruller["blue"]) / 3;
    parsed_cruller["hex"] = cruller.toUpperCase();

    return parsed_cruller;
  } else {
    // Break out.
    window.location.replace("404.html");
  }
}

function paint(cruller) {
  $("body").css("background-color", "#" + cruller["hex"]);
  
  $("#color-hex").text("#" + cruller["hex"]);
  
  $("#meta-r-dec").text(String(cruller["red"]).padStart(3, "0"));
  $("#meta-g-dec").text(String(cruller["green"]).padStart(3, "0"));
  $("#meta-b-dec").text(String(cruller["blue"]).padStart(3, "0"));

  meta_color = "";
  if(cruller["avg"] < 128) {
    meta_color = "ffffff";
  } else {
    meta_color = "000000";
  }

  $("#meta-link").html(
    `<a href="/?c=${cruller["hex"]}" title="#${cruller["hex"]}">
      <div style="color: #${meta_color}; opacity: 0.50;">
        <i class="fa-regular fa-link"></i> https://cruller.club?c=${cruller["hex"]}
      </div>
    </a>`
  );

  $("#beaukeh-link").html(
    `<a href="https://beaukeh.cruller.club/static/${cruller["hex"]}" target=_blank>
      <i class="fa-regular fa-circle-exclamation"></i>
    </a>`
  );
}