plugins {
    alias(libs.plugins.kotlin.jvm)
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.guava)
    implementation(libs.commonsIo)
    implementation(libs.jackson)
    implementation(libs.functionsFrameworkApi)
    implementation(libs.functionsFramework)
}

tasks.register<Jar>("fatJar") {
    group = "build"
    archiveClassifier.set("fat")
    from(sourceSets.main.get().output)
    dependsOn(configurations.runtimeClasspath)
    from({
        configurations.runtimeClasspath.get().filter { it.name.endsWith(".jar") }.map { zipTree(it) }
    })
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

tasks.register<Zip>("zipJar") {
    val jarTask = tasks.named<Jar>("fatJar")
    dependsOn(jarTask)

    from(jarTask.map { it.archiveFile })
}

tasks.withType<JavaExec> {
    environment("FUNCTION_TARGET", "org.phdezann.energy.Function")
}

testing {
    suites {
        @Suppress("UnstableApiUsage")
        val test by getting(JvmTestSuite::class) {
            useJUnitJupiter()
        }
    }
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

application {
    mainClass.set("com.google.cloud.functions.invoker.runner.Invoker")
}
