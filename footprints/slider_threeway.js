module.exports = {
    params: {
        designator: 'T', // for Toggle
        side: 'F',
        from: undefined,
        left: undefined,
        right: undefined,
        reversible: false,
        reverse_left_right: false
    },
    body: p => {
        const info = `                
            (module E73:SPDT_C128955 (layer F.Cu) (tstamp 5BF2CC3C)

            ${p.at /* parametric position */}

            ${'' /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        `
        function get_slider(_side, net1, net2, pad_1=1, pad_3=3){
            const left = _side == 'F' ? '-' : ''
            const right = _side == 'F' ? '' : '-'

            return `
                
                ${'' /* outline */}
                (fp_line (start 1.95 -1.35) (end -1.95 -1.35) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start 0 -1.35) (end -3.3 -1.35) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start -3.3 -1.35) (end -3.3 1.5) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start -3.3 1.5) (end 3.3 1.5) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start 3.3 1.5) (end 3.3 -1.35) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start 0 -1.35) (end 3.3 -1.35) (layer ${_side}.SilkS) (width 0.15))
                
                ${'' /* extra indicator for the slider */}
                (fp_line (start -1.95 -3.85) (end 1.95 -3.85) (layer Dwgs.User) (width 0.15))
                (fp_line (start 1.95 -3.85) (end 1.95 -1.35) (layer Dwgs.User) (width 0.15))
                (fp_line (start -1.95 -1.35) (end -1.95 -3.85) (layer Dwgs.User) (width 0.15))
                
                ${'' /* bottom cutouts */}
                (pad "" np_thru_hole circle (at 1.5 0) (size 1 1) (drill 0.9) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at -1.5 0) (size 1 1) (drill 0.9) (layers *.Cu *.Mask))

                ${'' /* pins */}
                (pad ${pad_1} smd rect (at ${right}2.25 2.075 ${p.rot}) (size 0.9 1.25) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask) ${net1})
                (pad 2 smd rect (at ${left}0.75 2.075 ${p.rot}) (size 0.9 1.25) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask) ${p.from.str})
                (pad ${[pad_3]} smd rect (at ${left}2.25 2.075 ${p.rot}) (size 0.9 1.25) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask) ${net2})
                
                ${'' /* side mounts */}
                (pad "" smd rect (at 3.7 -1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
                (pad "" smd rect (at 3.7 1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
                (pad "" smd rect (at -3.7 1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
                (pad "" smd rect (at -3.7 -1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
            
            `
        }
        
        if (p.reversible){
            const slider_r = p.reverse_left_right ? get_slider('B', p.left.str, p.right.str, pad_1=3, pad_3=1) : get_slider('B', p.right.str, p.left.str)

            return `
            ${info}
            ${get_slider('F', p.right.str, p.left.str)}
            ${slider_r})
            `
        }
        else{
            return `
            ${info}
            ${get_slider(p.side, p.right.str, p.left.str)})
            `
        }
    }
}
