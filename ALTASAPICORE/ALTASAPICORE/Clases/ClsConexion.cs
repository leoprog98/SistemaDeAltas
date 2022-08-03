using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace ALTASAPICORE.Clases
{
    static class Conexion
    {
        public static string CadConexion;
        //public static string CadCon;
        public static SqlConnection connection;
        //public static SqlConnection conn;
        public static SqlConnection getConexion()
        {
            try
            {
                return connection;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static void AbrirConexion()
        {
            try
            {
                connection = new SqlConnection(CadConexion);
                connection.Open();
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error al abrir la conexion");
                Console.WriteLine(e);
            }
            //conn = new SqlConnection(CadCon);
            //conn.Open(); 
        }
        public static void CerrarConexion()
        {
            connection.Close();
            //conn.Close();
        }

        public static SqlDataReader SelectCommand(string queryString, SqlConnection conne)
        {
            SqlDataReader reader = null;
            SqlCommand command = new SqlCommand(queryString, conne);
            try
            {
                reader = command.ExecuteReader();
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error en el select");
                Console.WriteLine(e);
            }
            return reader;
        }

    }
}
