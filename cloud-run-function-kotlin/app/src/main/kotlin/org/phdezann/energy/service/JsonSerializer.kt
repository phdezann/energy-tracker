package org.phdezann.energy.service

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.json.JsonMapper

class JsonSerializer {

    private val mapper = JsonMapper.builder()
        .enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS)
        .propertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
        .build()

    fun <T> readValue(json: String, valueType: Class<T>): T {
        return try {
            mapper.readValue(json, valueType)
        } catch (e: JsonProcessingException) {
            throw RuntimeException(e)
        }
    }

    fun writeValue(value: Any): String {
        return try {
            mapper.writerWithDefaultPrettyPrinter().writeValueAsString(value)
        } catch (e: JsonProcessingException) {
            throw RuntimeException(e)
        }
    }

}