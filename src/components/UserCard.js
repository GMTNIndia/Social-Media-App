import * as React from "react";

function CardProfile({ src, name, friends, posts }) {
  return (
    <section className="flex flex-col grow justify-center items-center px-2 py-4 mx-auto w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 max-md:mt-5">
      <img loading="lazy" src={src} alt={`Profile of ${name}`} className="rounded-full aspect-square w-[98px]" />
      <h2 className="mt-2 font-semibold text-neutral-900">{name}</h2>
      <div className="flex gap-5 justify-between self-stretch mt-6 font-medium text-zinc-600">
        <span>{friends} Friends</span>
        <span>{posts} Posts</span>
      </div>
    </section>
  );
}

function FriendSuggestion({ src, name }) {
  return (
    <div className="flex gap-5 justify-between mt-3.5 w-full">
      <div className="flex gap-2.5 font-medium text-neutral-900">
        <img loading="lazy" src={src} alt={`Profile of ${name}`} className="shrink-0 w-8 rounded-full aspect-square" />
        <span className="my-auto">{name}</span>
      </div>
      <button className="justify-center self-start p-3 font-semibold text-gray-100 whitespace-nowrap bg-purple-700 rounded-md">Show</button>
    </div>
  );
}

function Trend({ hashtag, posts }) {
  return (
    <div className="flex gap-5 justify-between mt-3.5">
      <div className="flex flex-col font-medium">
        <span className="text-xs text-neutral-900">{hashtag}</span>
        <span className="mt-1.5 text-xs text-zinc-500">{posts} Posts</span>
      </div>
      <button className="justify-center p-2.5 my-auto text-xs font-semibold text-gray-100 whitespace-nowrap bg-purple-700 rounded-md">Explore</button>
    </div>
  );
}

function MyComponent({ searchTerm }) {
  const profiles = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e505ea34f83a46156c747fa90e1a65c0be825a41e3e575d541a8a42c93e193f4?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein", friends: 180, posts: 120 },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e505ea34f83a46156c747fa90e1a65c0be825a41e3e575d541a8a42c93e193f4?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein", friends: 180, posts: 120 },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e505ea34f83a46156c747fa90e1a65c0be825a41e3e575d541a8a42c93e193f4?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein", friends: 180, posts: 120 },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e505ea34f83a46156c747fa90e1a65c0be825a41e3e575d541a8a42c93e193f4?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein", friends: 180, posts: 120 },
  ];

  const suggestions = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/78d58aeb4a28c9dfb67dc18b5f9b974caf5abd3d716733a130d97886d83a0250?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a841ce5867c96ac8444d3d0e023c96be68b8c37ea7bca0cc3df3c6aebac264cd?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/133ef32931c4ab4a1349729db09297dd0c1927e246712c7406ba1d6760133dd9?apiKey=87da4b67ae5046fdba58e532f6a97e48&", name: "Code With Stein" },
  ];

  const trends = [
    { hashtag: "#Code With Stein", posts: 120 },
    { hashtag: "#Code With Stein", posts: 120 },
    { hashtag: "#Code With Stein", posts: 120 },
    { hashtag: "#Code With Stein", posts: 120 },
    { hashtag: "#Code With Stein", posts: 120 }
  ];

  // Filter data based on search term
  const filteredProfiles = profiles.filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredTrends = trends.filter(trend => trend.hashtag.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col pb-20 bg-gray-100">
      <main className="self-center mt-9 w-full max-w-[1043px] max-md:max-w-full">
        <section className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col grow max-md:mt-5 max-md:max-w-full">
              <section className="flex flex-col px-4 pt-4 pb-20 mt-3.5 bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:max-w-full">
                <header className="max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {filteredProfiles.map((profile, index) => (
                      <CardProfile key={index} src={profile.src} name={profile.name} friends={profile.friends} posts={profile.posts} />
                    ))}
                  </div>
                </header>
                <section className="flex flex-col justify-center items-center px-2 py-4 mt-5 mb-4 max-w-full text-xs rounded-lg border border-solid bg-zinc-200 border-zinc-200 w-[166px]">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e505ea34f83a46156c747fa90e1a65c0be825a41e3e575d541a8a42c93e193f4?apiKey=87da4b67ae5046fdba58e532f6a97e48&" alt="Code With Stein" className="rounded-full aspect-square w-[98px]" />
                  <h2 className="mt-2 font-semibold text-neutral-900">Code With Stein</h2>
                  <div className="flex gap-5 justify-between self-stretch mt-6 font-medium text-zinc-600">
                    <span>180 Friends</span>
                    <span>120 Post</span>
                  </div>
                </section>
              </section>
            </section>
          </section>
          <aside className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <section className="flex flex-col max-md:mt-5">
              <section className="flex flex-col p-4 w-full text-xs bg-white rounded-lg border border-solid shadow-sm border-zinc-200">
                <h2 className="text-sm font-semibold text-neutral-900">People you may know</h2>
                {filteredSuggestions.map((suggestion, index) => (
                  <FriendSuggestion key={index} src={suggestion.src} name={suggestion.name} />
                ))}
              </section>
              <section className="flex flex-col p-4 mt-3.5 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200">
                <h2 className="text-sm font-semibold text-neutral-900">Trends</h2>
                {filteredTrends.map((trend, index) => (
                  <Trend key={index} hashtag={trend.hashtag} posts={trend.posts} />
                ))}
              </section>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default MyComponent;
