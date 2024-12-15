package org.phdezann.energy.service

import org.phdezann.energy.formater.DistanceFormatter
import org.phdezann.energy.formater.VolumeFormatter
import org.phdezann.energy.json.EnergyEntry
import org.phdezann.energy.json.EnergyEntryType
import org.phdezann.energy.model.EnergyMatch
import org.phdezann.energy.support.FileUtils

class EnergyConverter {

    private val distanceFormatter = DistanceFormatter()
    private val volumeFormatter = VolumeFormatter()
    private val energyEntries: Array<EnergyEntry>

    init {
        val json = FileUtils.read("energy.json")
        energyEntries = JsonSerializer().readValue(json, Array<EnergyEntry>::class.java)
    }

    fun convert(milliWattHour: Double): List<EnergyMatch> {
        val matches = mutableListOf<EnergyMatch>()
        val kiloWattHour = milliWattHour / 1_000_000

        for (entry in energyEntries) {
            val amount = kiloWattHour / entry.energyCapacityKwh
            val msg = format(entry, amount)
            matches.add(EnergyMatch(entry.label, msg))
        }

        return matches
    }

    private fun format(entry: EnergyEntry, value: Double): String {
        return when (entry.type) {
            EnergyEntryType.VOLUME -> volumeFormatter.format(value)
            EnergyEntryType.DISTANCE -> distanceFormatter.format(value)
        }
    }
}