package org.phdezann.energy.service

import org.phdezann.energy.json.Response

class EquivalenceConverter {

    private val energyConverter = EnergyConverter()
    private val powerConverter = PowerConverter()
    private val jsonSerializer = JsonSerializer()

    fun convert(milliWattHour: Double): String {
        val energyMatches = energyConverter.convert(milliWattHour)
        val powerMatches = powerConverter.convert(milliWattHour)
        val response = Response(energyMatches, powerMatches)
        return jsonSerializer.writeValue(response)
    }
}