using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<ProfileDto>>
        {
            public Query(string username)
            {
                this.Username = username;
            }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProfileDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                        .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider)
                        .SingleOrDefaultAsync(x => x.Username == request.Username);

                return Result<ProfileDto>.Success(user);
            }
        }
    }
}