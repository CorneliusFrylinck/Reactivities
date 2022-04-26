using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
//dotnet ef database drop -p Persistence -s API
namespace Persistence
{
    public class Seed 
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && ! context.Activities!.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Ainz",
                        UserName = "momonga",
                        Email = "ainz@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Demiurge",
                        UserName = "demiurge",
                        Email = "demiurge@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Albedo",
                        UserName = "albedo",
                        Email = "albedo@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Cocytus",
                        UserName = "cocytus",
                        Email = "cocytus@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Aura Bella Fiora",
                        UserName = "aura",
                        Email = "aura@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Sebas Tian",
                        UserName = "sebas",
                        Email = "sebas@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Padora's actor",
                        UserName = "pandora",
                        Email = "pandora@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Mare Bello Fiore",
                        UserName = "mare",
                        Email = "mare@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Victim",
                        UserName = "victim",
                        Email = "victim@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Gargantuan",
                        UserName = "gargantuan",
                        Email = "gargantuan@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Narberal Gamma",
                        UserName = "narberal",
                        Email = "narberal@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Shalltear Bloodfallen",
                        UserName = "shalltear",
                        Email = "shalltear@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Emergency meeting",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Gather the Guardians and discuss a plan of action",
                        Category = "standup",
                        City = "Re-Estize",
                        Venue = "GreatTomb",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[3],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[4],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[5],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[6],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[7],
                                IsHost = false
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[8],
                                IsHost = false
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Rescue Carne Villiage",
                        Date = DateTime.Now.AddMonths(-8),
                        Description = "Use the slaughter in a nearby village as an excuse to test powers from Yggdrasil",
                        Category = "diplomacy",
                        City = "Re-Estize",
                        Venue = "CarneVillage",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Information gathering",
                        Date = DateTime.Now.AddMonths(-7),
                        Description = "Investigation needs to be done on items and skills in the new world, especially regarding items from Yggdrasil",
                        Category = "investigation",
                        City = "Re-Estize",
                        Venue = "GreatTomb",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[5],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[11],
                                IsHost = false
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Become adventurers",
                        Date = DateTime.Now.AddMonths(-6),
                        Description = "To earn money and gather information, members of the Great Tomb need to become adventurers",
                        Category = "quest",
                        City = "Re-Estize",
                        Venue = "Adventurer's Guild",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[10],
                                IsHost = false
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Find a job",
                        Date = DateTime.Now.AddMonths(-3),
                        Description = "The currency from Yggdrasil is worthless, someone from the Great Tomb needs to earn some money",
                        Category = "quest",
                        City = "Re-Estize",
                        Venue = "Adventurer's Guild",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[10],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Tame the Wise King",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Find and tame the Wise King of the forest",
                        Category = "hamsuke",
                        City = "Re-Estize",
                        Venue = "CarneVillage",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[10],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Gather rare fighters",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Infiltrate the Death Spreading Brigade and look for strong fighters",
                        Category = "hideout",
                        City = "Re-Estize",
                        Venue = "DSB Hideout",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[5],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[11],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Find NFirea",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Rescue NFirea from Khajiit",
                        Category = "rescue",
                        City = "Re-Estize",
                        Venue = "Cemetery",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[10],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Investigate Shalltear",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Investigate Shalltear's supposed betrayal",
                        Category = "investigation",
                        City = "Re-Estize",
                        Venue = "Forest",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Gather World Items",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Gather the strongest items from Yggdrasil to prepare for an ambush",
                        Category = "preperation",
                        City = "Re-Estize",
                        Venue = "Nazarick",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[4],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Create lasting peace",
                        Date = DateTime.Now.AddMonths(50),
                        Description = "Orchestrate a summit to form lasting peace",
                        Category = "diplomacy",
                        City = "Re-Estize",
                        Venue = "Neutral ground",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Take over Re-Estize",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Take over Nazarick's surrounding lands to protect the denizens of Nazarick",
                        Category = "diplomacy",
                        City = "Re-Estize",
                        Venue = "Battlefield",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Intice workers to attack the Great Tomb",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Find and use a cause to legitimize the creation of the Sorcerer Kingdom",
                        Category = "diplomacy",
                        City = "Re-Estize",
                        Venue = "Nazarick",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[10],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Activities!.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
