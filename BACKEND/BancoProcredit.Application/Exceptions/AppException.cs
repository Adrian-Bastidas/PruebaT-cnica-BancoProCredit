using System;
using System.Collections.Generic;
using System.Text;

namespace BancoProcredit.Application.Exceptions
{
    public class AppException : Exception
    {
        public AppException(string message) : base(message)
        {
        }

        public AppException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}