using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Comments;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, o =>
                o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(u => u.Username, o => o.MapFrom(x => x.AppUser.UserName))
                .ForMember(u => u.DisplayName, o => o.MapFrom(x => x.AppUser.DisplayName))
                .ForMember(u => u.Bio, o => o.MapFrom(x => x.AppUser.Bio))
                .ForMember(p => p.Image, o => 
                    o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(f => f.FollowersCount, o => o.MapFrom(x => x.AppUser.Followers.Count))
                .ForMember(f => f.FollowingCount, o => o.MapFrom(x => x.AppUser.Followings.Count))
                .ForMember(x => x.Following,
                    o => o.MapFrom(u => u.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));
                
            CreateMap<AppUser, ProfileDto>()
                .ForMember(p => p.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(f => f.FollowersCount, o => o.MapFrom(x => x.Followers.Count))
                .ForMember(f => f.FollowingCount, o => o.MapFrom(x => x.Followings.Count))
                .ForMember(x => x.Following,
                    o => o.MapFrom(u => u.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>()
                .ForMember(x => x.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(x => x.CreatedAt, o => o.MapFrom(s => s.CreatedAt))
                .ForMember(x => x.Id, o => o.MapFrom(s => s.Id))
                .ForMember(x => x.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.Username, o => o.MapFrom(s => s.Author.UserName));

            CreateMap<ActivityAttendee, UserActivityDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s =>
                    s.Activity.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
                    s.Activity.Attendees.FirstOrDefault(x =>
                    x.IsHost).AppUser.UserName));
            
        }
    }
}