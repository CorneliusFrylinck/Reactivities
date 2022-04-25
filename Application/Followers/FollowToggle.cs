using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Command(string targetUsername)
            {
                this.TargetUsername = targetUsername;
            }
            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (observer == null) return Result<Unit>.Failure("No logged in user");

                var target = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == request.TargetUsername);

                if (target == null) return Result<Unit>.Failure("User not found");

                var following = _context.UserFollowings
                    .FirstOrDefault(f => f.ObserverId == observer.Id 
                                            && f.TargetId == target.Id);

                if (following == null) {
                    following = new UserFollowing {Observer = observer, Target = target};
                    _context.UserFollowings.Add(following);
                }else {
                    _context.Remove(following);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem following user");
            }
        }
    }
}