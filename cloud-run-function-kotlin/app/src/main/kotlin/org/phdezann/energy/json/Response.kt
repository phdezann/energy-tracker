package org.phdezann.energy.json

import org.phdezann.energy.model.EnergyMatch
import org.phdezann.energy.model.PowerMatch

data class Response(
    var energyMatches: List<EnergyMatch> = listOf(),
    var powerMatches: List<PowerMatch> = listOf()
)