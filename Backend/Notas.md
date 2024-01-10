# Notas de aprendizaje del proyecto

## Resolución de errores o advertencias

- Error por no tener configurado el puerto https

```bash
warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.
```

Este error se produce porque no se ha configurado el puerto https en el proyecto. Para solucionarlo hay que cambiar el orden de las propiedades `http` y `https` en el archivo `launchSettings.json`:

```json
"https": {
  ...
},
"http": {
  ...
}
```

- Error por tener tipo decimal en el modelo

```bash
No store type was specified for the decimal property 'Price' on entity type 'Product'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in 'OnModelCreating' using 'HasColumnType', specify precision and scale using 'HasPrecision', or configure a value converter using 'HasConversion'.
```

La solución es añadir `HasColumnType<decimal>` en el modelo:

```csharp
      ...
      product.Property(p => p.Price).IsRequired().HasConversion<double>();
      ...
```
