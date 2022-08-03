namespace ALTASAPICORE.Modelos
{
    public class Usuario
    {
        public int IdUsuario { get; set; }
        public string? CUsuario { get; set; }
        public string? Nombre { get; set; } 
        public string? Direccion { get; set; } 
        public string? Telefono { get; set; }
        public string? CodigoPostal { get; set; } 
        public int TipoUsuario { get; set; }
        public string? DescripcionTipo { get; set; } 
        public int Estado { get; set; }
        public string? DescripcionEstado { get; set; }
        public int ciudad { get; set; }
        public string? DescripcionCiudad { get; set; }

        public string? Contrasena { get; set; }
    }
}
