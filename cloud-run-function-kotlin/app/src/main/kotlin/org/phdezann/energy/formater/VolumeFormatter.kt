package org.phdezann.energy.formater

import org.phdezann.energy.support.UnitFormatter

class VolumeFormatter {

    fun format(valueInLiters: Double): String {
        return UnitFormatter.format(valueInLiters) + "L"
    }

}