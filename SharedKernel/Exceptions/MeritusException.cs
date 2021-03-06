﻿using SharedKernel;
using System;
using System.Runtime.Serialization;

namespace Domain.SharedKernel.Exceptions
{
    public abstract class MeritusException : Exception
    {
        public MeritusException() => Logger.Log(Message);

        public MeritusException(string message) : base(message)
        {
        }

        public MeritusException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected MeritusException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
