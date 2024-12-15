package org.phdezann.energy.json

data class EnergyEntry(
    var label: String = "",
    var unit: String = "",
    var type: EnergyEntryType = EnergyEntryType.VOLUME,
    var energyCapacityKwh: Double = 0.0
)