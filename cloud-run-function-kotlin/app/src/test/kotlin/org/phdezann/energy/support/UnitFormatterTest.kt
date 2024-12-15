package org.phdezann.energy.support

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class UnitFormatterTest {


    @Test
    fun testFormat() {
        assertEquals("1k", UnitFormatter.format(1000.0))
        assertEquals("1", UnitFormatter.format(1.0))
        assertEquals("1c", UnitFormatter.format(0.01))
        assertEquals("1m", UnitFormatter.format(0.001))
        assertEquals("1µ", UnitFormatter.format(0.000001))
        assertEquals("1n", UnitFormatter.format(0.000000001))
        assertEquals("1p", UnitFormatter.format(0.000000000001))
        assertEquals("-", UnitFormatter.format(0.0000000000001))
    }

    @Test
    fun testFormatWithoutCenti() {
        assertEquals("10m", UnitFormatter.format(0.01, supportCentiUnit = false))
    }
}