module.exports = {
  params: {
    side: "F",
    text: "",
    h_size: 1,
    v_size: 1,
    thickness: 0.15,
    justify: ""
  },
  body: (p) => {
    let justify = "";
    if (p.justify != "") {
      if (p.justify.includes("mirror") & p.side == 'B'){
        var p_justify = p.justify.replace("mirror", '');
        justify = p_justify != "" ? `(justify ${p_justify}` : "";
      }
      else{
        justify = `(justify ${p.justify} ${p.side == 'F' ? "" : "mirror"})`;
      }
    }
    else{
      justify =  p.side == 'F' ? "" : `(justify mirror)`
    }
    
    return `
            (gr_text "${p.text}" ${p.at} (layer ${p.side}.SilkS)
                (effects (font (size ${p.h_size} ${p.v_size}) (thickness ${p.thickness})  ) ${justify})
            )
        `;
  },
};
