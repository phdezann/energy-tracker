package org.phdezann.energy.service

import org.phdezann.energy.formater.TimeFormatter
import org.phdezann.energy.json.PowerEntry
import org.phdezann.energy.model.PowerMatch
import org.phdezann.energy.support.FileUtils

class PowerConverter {

    private val powerEntries: Array<PowerEntry>
    private val timeFormatter = TimeFormatter()

    init {
        val json = FileUtils.read("power.json")
        powerEntries = JsonSerializer().readValue(json, Array<PowerEntry>::class.java)
    }

    fun convert(milliWattHour: Double): List<PowerMatch> {
        val matches = mutableListOf<PowerMatch>()
        val wattHour = milliWattHour / 1000

        for (entry in powerEntries) {
            val hours = wattHour / entry.powerConsumptionWatt
            val msg = timeFormatter.format(hours)
            matches.add(PowerMatch(entry.label, msg))
        }

        return matches
    }

}