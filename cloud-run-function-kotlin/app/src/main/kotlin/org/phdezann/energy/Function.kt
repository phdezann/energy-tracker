package org.phdezann.energy

import com.google.cloud.functions.HttpFunction
import com.google.cloud.functions.HttpRequest
import com.google.cloud.functions.HttpResponse
import org.phdezann.energy.service.EquivalenceConverter

class Function : HttpFunction {
    override fun service(request: HttpRequest, response: HttpResponse) {
        val optionalMwh = request.getFirstQueryParameter("mwh")
        if (!optionalMwh.isPresent) {
            response.setStatusCode(400, "Bad Request")
            response.writer.write("{\"error\": \"Parameter 'mwh' is required\"}")
            return
        }

        val milliWattHour = optionalMwh.get().toDouble()
        val json = EquivalenceConverter().convert(milliWattHour)
        response.setContentType("application/json")
        response.appendHeader("X-Version", "1.0")
        response.writer.write(json)
    }
}