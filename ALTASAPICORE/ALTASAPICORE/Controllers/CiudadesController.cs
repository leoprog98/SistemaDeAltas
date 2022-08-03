using ALTASAPICORE.Clases;
using ALTASAPICORE.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ALTASAPICORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CiudadesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CiudadesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        IList<Ciudad> ciudades = new List<Ciudad>();

        [HttpGet("{estado}")]
        public IEnumerable<Ciudad> Get(int estado)
        {
            Conexion.CadConexion = _configuration.GetConnectionString("CadConexion");
            SqlDataReader reader;
            string strQuery;
            try
            {
                Conexion.AbrirConexion();
                if (Conexion.getConexion() != null)
                {
                    strQuery = "ApiCiudad " + estado;
                    reader = Conexion.SelectCommand(strQuery, Conexion.connection);
                    while (reader.Read())
                    {
                        Ciudad ciudad = new();
                        ciudad.IdCiudad = Convert.ToInt32(reader[0].ToString());
                        ciudad.DescripcionCiudad = reader[1].ToString();
                        ciudad.Estado = Convert.ToInt32(reader[2].ToString());
                        ciudades.Add(ciudad);
                    }
                }
                return ciudades;
            }
            finally
            {
                Conexion.CerrarConexion();
            }
        }
    }
}
