package org.phdezann.energy.formater

import org.phdezann.energy.support.UnitFormatter

class DistanceFormatter {

    fun format(valueInKilometers: Double): String {
        return UnitFormatter.format(valueInKilometers * 1000) + "m"
    }

}