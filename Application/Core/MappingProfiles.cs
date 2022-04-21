using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, o =>
                o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, ProfileDto>()
                .ForMember(u => u.Username, o => o.MapFrom(x => x.AppUser.UserName))
                .ForMember(u => u.DisplayName, o => o.MapFrom(x => x.AppUser.DisplayName))
                .ForMember(u => u.Bio, o => o.MapFrom(x => x.AppUser.Bio));
        }
    }
}