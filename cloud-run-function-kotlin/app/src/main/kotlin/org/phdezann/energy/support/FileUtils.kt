package org.phdezann.energy.support

import java.io.BufferedReader

object FileUtils {

    fun read(fileName: String): String {
        val classLoader = javaClass.classLoader
        val inputStream = classLoader.getResourceAsStream(fileName)
            ?: throw RuntimeException("File not found: $fileName")
        return inputStream.bufferedReader().use(BufferedReader::readText)
    }

}