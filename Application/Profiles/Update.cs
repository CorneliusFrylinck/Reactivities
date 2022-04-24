using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Command(string username, string? bio, string displayName) {
                this.profile = new ProfileFormDto () {
                    username = username,
                    bio = bio,
                    displayName = displayName
                };
            }
            public ProfileFormDto profile { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                        .FirstOrDefaultAsync(u => u.UserName == request.profile.username);

                if (user == null) return null!;
                
                user.Bio = request.profile.bio;
                user.DisplayName = request.profile.displayName;

                var result = await _context.SaveChangesAsync() > 0;

                if (! result) return Result<Unit>.Failure("Failed to update details");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}