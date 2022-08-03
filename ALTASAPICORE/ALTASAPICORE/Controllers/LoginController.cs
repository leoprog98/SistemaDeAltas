using ALTASAPICORE.Clases;
using ALTASAPICORE.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ALTASAPICORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public RespuestaLogin Autenticar([FromBody] Usuario usuario)
        {
            ClsCRD consulta = new ClsCRD(_configuration.GetConnectionString("CadConexion"));
            string strQuery = "ApiLogin '" + usuario.CUsuario + "','" + usuario.Contrasena +"'";
            return consulta.ConsultaUsuario(strQuery);
        }
    }
}
