terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 6.13.0"
    }
  }
}

provider "google" {
  project = "phdezann-sandbox"
  region  = "europe-west2"
}

resource "google_storage_bucket" "function_bucket" {
  name     = "kotlin-function-bucket-${random_id.suffix.hex}"
  location = "EU"
}

resource "random_id" "suffix" {
  byte_length = 4
}

resource "google_storage_bucket_object" "function_code" {
  name   = "kotlin-function.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "../app/build/distributions/app.zip"
  detect_md5hash = "true"
}

resource "google_cloudfunctions2_function" "kotlin_function" {
  name     = "kotlin-function"
  location = "europe-west2"


  build_config {
    runtime     = "java21"
    entry_point = "org.phdezann.energy.Function"

    source {
      storage_source {
        bucket = google_storage_bucket.function_bucket.name
        object = google_storage_bucket_object.function_code.name
      }
    }
  }

  lifecycle {
    replace_triggered_by = [
      google_storage_bucket_object.function_code
    ]
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
  }

}

resource "google_cloud_run_service_iam_member" "member" {
  service  = google_cloudfunctions2_function.kotlin_function.name
  location = google_cloudfunctions2_function.kotlin_function.location
  role     = "roles/run.invoker"
  member   = "allUsers"

  lifecycle {
    replace_triggered_by = [
      google_cloudfunctions2_function.kotlin_function
    ]
  }
}

output "function_uri" {
  value = google_cloudfunctions2_function.kotlin_function.service_config[0].uri
}

