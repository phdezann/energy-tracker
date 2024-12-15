package org.phdezann.energy.support

object FormatterUtils {

    fun toUnits(value: Double, unit: String): String {
        return String.format("%d%s", value.toInt(), unit)
    }

}