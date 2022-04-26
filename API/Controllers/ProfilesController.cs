using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query(username)));
        }

        [HttpPost]
        public async Task<IActionResult> UpdateProfile(ProfileFormDto profile) 
        {
            return HandleResult(await Mediator.Send(new Update.Command(profile.username, profile.bio, profile.displayName)));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username,
            string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query
            {Username = username, Predicate = predicate}));
        }
    }
}