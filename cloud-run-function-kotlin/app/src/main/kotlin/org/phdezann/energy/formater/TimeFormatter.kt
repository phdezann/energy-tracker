package org.phdezann.energy.formater

import org.phdezann.energy.support.UnitFormatter
import org.phdezann.energy.support.FormatterUtils.toUnits

class TimeFormatter {

    fun format(valueInHours: Double): String {
        return when {
            valueInHours >= 1 -> toUnits(valueInHours, "h")
            valueInHours >= 1.0 / 60 -> toUnits(valueInHours * 60, "m")
            else -> UnitFormatter.format(valueInHours * 3600, false) + "s"
        }
    }

}