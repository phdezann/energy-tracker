package org.phdezann.energy.support

import java.text.DecimalFormat

object UnitFormatter {

    private const val ONE_KILO = 1e3
    private const val ONE_CENTI = 1e-2
    private const val ONE_MILLI = 1e-3
    private const val ONE_MICRO = 1e-6
    private const val ONE_NANO = 1e-9
    private const val ONE_PICO = 1e-12
    private val df = DecimalFormat("#")

    fun format(value: Double): String {
        return format(value, true)
    }

    fun format(value: Double, supportCentiUnit: Boolean = true): String {
        return when {
            value >= ONE_KILO -> df.format(value / ONE_KILO) + "k"
            value >= 1 -> df.format(value)
            value >= ONE_CENTI && supportCentiUnit -> df.format(value / ONE_CENTI) + "c"
            value >= ONE_MILLI -> df.format(value / ONE_MILLI) + "m"
            value >= ONE_MICRO -> df.format(value / ONE_MICRO) + "µ"
            value >= ONE_NANO -> df.format(value / ONE_NANO) + "n"
            value >= ONE_PICO -> df.format(value / ONE_PICO) + "p"
            else -> "-"
        }
    }
}