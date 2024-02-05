// Any MX switch
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh MX hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible 
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//
// note: hotswap and reverse can be used simultaneously

module.exports = {
    params: {
        designator: 'SW',

        mx_spacing: 1,
        millmax_diameter: 1.6, // {YMD: 1.6, other_aliexpress: 2(?), actual_millmax: 1.5}

        mx: 1,
        mx_hotswap: 0,
        mx_millmax: 0,
        mx_reverse: 0,
        mx_pth: 0,
        mx_rev_pad: 0,
        mx_neg_y: 0,

        choc: 0,
        choc_hotswap: 0,
        choc_millmax: 0,
        choc_reverse: 0,
        choc_pth: 0,
        choc_neg_y: 1,

        gateron_lp: 0,
        gateron_lp_hotswap: 0,
        gateron_lp_millmax: 0,
        gateron_lp_reverse: 0,
        gateron_lp_pth: 0,
        gateron_lp_rev_pad: 0,
        gateron_lp_neg_y: 1,

        keycaps: 0,
        from: undefined,
        to: undefined
    },
    body: p => {
        const standard = `
        (module key-switches (layer F.Cu) (tedit 5DD4F656)
        ${p.at /* parametric position */}
  
        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        `
        const mx_corner_marks = `
        ${''/* corner marks */}
        (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))
      `
        const choc_corner_marks = `
        ${''/* corner marks */}
        (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))
      `

        const mx_shafts = `
        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.9878 3.9878) (drill 3.9878) (layers *.Cu *.Mask))
  
        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        `

        const gateron_lp_shaft = `
        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 5.25 5.25) (drill 5.25) (layers *.Cu *.Mask))
        `

        const choc_shaft = `
        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))
            
        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      `
        const mx_keycap = `
        ${'' /* keycap marks */}
        (fp_line (start -9.5 -9.5) (end 9.5 -9.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9.5 -9.5) (end 9.5 9.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9.5 9.5) (end -9.5 9.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -9.5 9.5) (end -9.5 -9.5) (layer Dwgs.User) (width 0.15))
        `
        const choc_keycap = `
        ${'' /* keycap marks */}
        (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
      `

        function mx_pins(def_neg, def_pos, def_side) {
            let pad_1 = '1'
            let pad_2 = '2'
            let pad_1_net = p.from.str
            let pad_2_net = p.to.str
            const y_neg_sign = p.mx_neg_y ? '-' : ''
                
            if (p.mx_pth | p.mx_rev_pad){
                pad_1 = (def_side == 'B') ? '1' : '2'
                pad_2 = (def_side == 'B') ? '2' : '1'
                pad_1_net = (def_side == 'B') ? p.from.str : p.to.str
                pad_2_net = (def_side == 'B') ? p.to.str : p.from.str
            }
            if (p.mx_pth){
                return `
                ${'' /* holes */}
                (pad ${pad_1} thru_hole circle (at ${def_pos}2.54 ${y_neg_sign}5.08) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask) ${pad_1_net})
                (pad ${pad_2} thru_hole circle (at ${def_neg}3.81 ${y_neg_sign}2.54) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask) ${pad_2_net})
                
                ${'' /* net pads */}
                (pad ${pad_2} smd rect (at ${def_neg}7.085 ${y_neg_sign}2.54 ${p.rot}) (size 2.5 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}5.842 ${y_neg_sign}5.08 ${p.rot}) (size 2.5 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                ${'' /* net pads to connect to holes */}
                (pad ${pad_2} smd rect (at ${def_neg}6 ${y_neg_sign}2.54 ${p.rot}) (size 3 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}4.5 ${y_neg_sign}5.08 ${p.rot}) (size 3 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                `
            }
            else if (p.mx_hotswap) {
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}2.54 ${y_neg_sign}5.08) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at ${def_neg}3.81 ${y_neg_sign}2.54) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                
                ${'' /* net pads */}
                (pad ${pad_2} smd rect (at ${def_neg}7.085 ${y_neg_sign}2.54 ${p.rot}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}5.842 ${y_neg_sign}5.08 ${p.rot}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                `
            } else {
                const drill_d = p.mx_millmax ? p.millmax_diameter : 1.4986
                const copper_d = p.mx_millmax ? p.millmax_diameter + 0.8 : 2.286
                return `
                ${''/* pins */}
                (pad ${pad_2} thru_hole circle (at ${def_pos}2.54 ${y_neg_sign}5.08) (size ${copper_d} ${copper_d}) (drill ${drill_d}) (layers *.Cu *.Mask) ${pad_2_net})
                (pad ${pad_1} thru_hole circle (at ${def_neg}3.81 ${y_neg_sign}2.54) (size ${copper_d} ${copper_d}) (drill ${drill_d}) (layers *.Cu *.Mask) ${pad_1_net})
                `
            }
        }

        function choc_pins(def_neg, def_pos, def_side) {
            const y_neg_sign = p.choc_neg_y ? '-' : ''
            if (p.choc_pth){
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}5 ${y_neg_sign}3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad 1 thru_hole circle (at 0 ${y_neg_sign}5.95) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask)  ${p.from.str})
            
                ${'' /* net pads */}
                (pad 1 smd rect (at ${def_neg}2.8 ${y_neg_sign}5.95 ${p.rot}) (size 1.7 1.8) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.from.str})
                (pad 2 smd rect (at ${def_pos}8.275 ${y_neg_sign}3.75 ${p.rot}) (size 2 2) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.to.str})
                ${'' /* net pads to connect to holes */}
                (pad 1 smd rect (at ${def_neg}2 ${y_neg_sign}5.95  ${p.rot}) (size 2 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.from.str})
                (pad 2 smd rect (at ${def_pos}7 ${y_neg_sign}3.75 ${p.rot}) (size 2 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.to.str})
                `
            }
            else if (p.choc_hotswap) {
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}5 ${y_neg_sign}3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at 0 ${y_neg_sign}5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))
            
                ${'' /* net pads */}
                (pad 1 smd rect (at ${def_neg}3.275 ${y_neg_sign}5.95 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.from.str})
                (pad 2 smd rect (at ${def_pos}8.275 ${y_neg_sign}3.75 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.to.str})
                `
            } else {
                const drill_d = p.choc_millmax ? p.millmax_diameter : 1.27
                const copper_d = p.choc_millmax ? p.millmax_diameter + 0.8 : 2.032
                return `
                ${''/* pins */}
                (pad 1 thru_hole circle (at ${def_pos}0 ${y_neg_sign}5.9) (size ${copper_d} ${copper_d}) (drill ${drill_d}) (layers *.Cu *.Mask) ${p.from.str})
                (pad 2 thru_hole circle (at ${def_pos}5 ${y_neg_sign}3.8) (size ${copper_d} ${copper_d}) (drill ${drill_d}) (layers *.Cu *.Mask) ${p.to.str})
                `
            }
        }

        function gateron_lp_pins(def_neg, def_pos, def_side) {
            let pad_1 = '1'
            let pad_2 = '2'
            let pad_1_net = p.from.str
            let pad_2_net = p.to.str
            const y_neg_sign = p.gateron_lp_neg_y ? '-' : ''
                
            if (p.gateron_lp_pth | p.gateron_lp_rev_pad){
                pad_1 = (def_side == 'B') ? '1' : '2'
                pad_2 = (def_side == 'B') ? '2' : '1'
                pad_1_net = (def_side == 'B') ? p.from.str : p.to.str
                pad_2_net = (def_side == 'B') ? p.to.str : p.from.str
            }
            if (p.gateron_lp_pth){
                return `
                ${'' /* holes */}
                (pad ${pad_1} thru_hole circle (at ${def_pos}2.6 ${y_neg_sign}5.57) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask) ${pad_1_net})
                (pad ${pad_2} thru_hole circle (at ${def_neg}4.4 ${y_neg_sign}4.70) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask) ${pad_2_net})
                
                ${'' /* net pads */}
                (pad ${pad_2} smd rect (at ${def_neg}8.075 ${y_neg_sign}4.70 ${p.rot}) (size 2.5 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}6.275 ${y_neg_sign}5.75 ${p.rot}) (size 2.5 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                ${'' /* net pads to connect to holes */}
                (pad ${pad_2} smd rect (at ${def_neg}4.475 ${y_neg_sign}4.70 ${p.rot}) (size 3 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}6.350 ${y_neg_sign}5.75 ${p.rot}) (size 3 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                `
            }
            else if (p.gateron_lp_hotswap) {
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}2.6 ${y_neg_sign}5.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at ${def_neg}4.4 ${y_neg_sign}4.70) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                
                ${'' /* net pads */}
                (pad ${pad_2} smd rect (at ${def_neg}8.075 ${y_neg_sign}4.70 ${p.rot}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}6.275 ${y_neg_sign}5.75 ${p.rot}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                `
            } else {
                const drill_d = p.gateron_lp_millmax ? p.millmax_diameter : 1.27
                const copper_d = p.gateron_lp_millmax ? p.millmax_diameter + 0.8 : 2.032
                return `
                ${''/* pins */}
                (pad ${pad_2} thru_hole circle (at ${def_pos}2.6 ${y_neg_sign}5.75) (size ${copper_d} ${copper_d}) (drill ${drill_d}) (layers *.Cu *.Mask) ${pad_2_net})
                (pad ${pad_1} thru_hole circle (at ${def_neg}4.4 ${y_neg_sign}4.70) (size ${copper_d} ${copper_d}) (drill ${drill_d}) (layers *.Cu *.Mask) ${pad_1_net})
                `
            }
        }


        let return_val = `${standard}`

        if (p.mx | p.mx_spacing){
            return_val += `
            ${mx_corner_marks}
            ${p.keycaps ? mx_keycap : ''}
            `
        }
        else{
            return_val += `
            ${choc_corner_marks}
            ${p.keycaps ? choc_keycap : ''}
            `
        }

        if (p.mx){
            return_val += `
            ${mx_shafts}
            ${mx_pins('', '-', 'B')}
            `
            if (p.mx_reverse){
                return_val += `${mx_pins('-', '', 'F')}`
            }
        }

        if (p.choc){
            return_val += `
            ${choc_shaft}
            ${choc_pins('-', '', 'B')}
            `
            if (p.choc_reverse){
                return_val += `${choc_pins('', '-', 'F')}`
            }
        }
        
        if (p.gateron_lp){
            return_val += `
            ${gateron_lp_shaft}
            ${gateron_lp_pins('', '-', 'B')}
            `
            if (p.gateron_lp_reverse){
                return_val += `${gateron_lp_pins('-', '', 'F')}`
            }
        }
        
        return `
        ${return_val})
        `
    }
}