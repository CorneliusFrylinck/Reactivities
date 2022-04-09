using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities
{
    public class List 
    {
        public class Query : IRequest<List<Activity>> {}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _context = context;
                _logger = logger;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                try 
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    return await _context.Activities.ToListAsync(cancellationToken);
                }catch (Exception ex) when (ex is TaskCanceledException) {
                    _logger.LogInformation("Operation cancelled");
                }

                return await _context.Activities.ToListAsync();
            }
        }
    }
}