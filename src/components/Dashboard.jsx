const Dashboard = ({ apiData, error, loading, noData, search, onSelectFood, darkMode }) => {
  const dm = darkMode;

  const ScoreBar = ({ label, val, color }) => (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className={dm ? "text-[#666]" : "text-[#999]"}>{label}</span>
        <span className={`font-semibold ${dm ? "text-[#aaa]" : "text-[#555]"}`}>{Math.round(val)}</span>
      </div>
      <div className={`h-[3px] rounded-full overflow-hidden ${dm ? "bg-[#2a2a2a]" : "bg-[#f0f0f0]"}`}>
        <div className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${Math.min(val, 100)}%`, backgroundColor: color }}/>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors ${dm ? "bg-[#0e0e0e]" : "bg-[#f7f7f5]"}`}>
      <div className="px-7 py-8">

        {!loading && !error && !noData && apiData.length > 0 && (
          <div className="mb-7">
            <p className="text-[12px] font-semibold text-[#888] tracking-[2px] uppercase mb-1">
              Search results
            </p>
            <h2 className={`text-[clamp(20px,3vw,30px)] font-extrabold tracking-tight ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}>
              "{search}"
              <span className="text-sm font-normal text-[#888] ml-2">
                — {apiData.length} recipes found
              </span>
            </h2>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
            <div className={`w-10 h-10 border-[3px] rounded-full animate-spin
              ${dm ? "border-[#333] border-t-white" : "border-[#e0e0e0] border-t-[#111]"}`} />
            <p className="text-sm text-[#888]">Finding recipes…</p>
          </div>

        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-2">
            <div className="text-5xl mb-2">⚠️</div>
            <h2 className={`text-xl font-bold ${dm ? "text-[#e0e0e0]" : "text-[#222]"}`}>{error}</h2>
            <p className="text-sm text-[#888]">Please try again later</p>
          </div>

        ) : noData ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-2">
            <div className="text-5xl mb-2">🍽️</div>
            <h2 className={`text-xl font-bold ${dm ? "text-[#e0e0e0]" : "text-[#222]"}`}>No recipes found</h2>
            <p className="text-sm text-[#888]">Try searching for something else</p>
          </div>

        ) : (

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {apiData.map((item) => {
              const priceINR = ((item.pricePerServing / 100) * 84).toFixed(0);
              const tags = [
                item.glutenFree && "Gluten Free",
                item.dairyFree && "Dairy Free",
                item.vegan && "Vegan",
                item.vegetarian && "Vegetarian",
                item.veryHealthy && "Very Healthy",
                item.cheap && "Budget",
              ].filter(Boolean);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectFood(item)}
                  className={`rounded-[18px] overflow-hidden cursor-pointer border flex flex-col
                    transition-all duration-200 hover:-translate-y-1
                    ${dm
                      ? "bg-[#141414] border-[#222] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                      : "bg-white border-[#ebebeb] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                    }`}
                >

                  <div className="relative aspect-video overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover block" />

                    {tags.length > 0 && (
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        {tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                            bg-black/55 backdrop-blur-sm text-white tracking-[0.3px]">
                            {t}
                          </span>
                        ))}
                        {tags.length > 2 && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                            bg-black/55 backdrop-blur-sm text-white">
                            +{tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="absolute bottom-2.5 right-2.5 bg-black/55 backdrop-blur-sm text-white
                      text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {item.readyInMinutes} min
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-3 flex-1">

                    <div>
                      <p className="text-[11px] text-[#888] capitalize tracking-[0.3px] mb-1">
                        {item.dishTypes?.[0] || "—"} · {item.cuisines?.[0] || "International"}
                      </p>
                      <h3 className={`text-[15px] font-bold leading-snug line-clamp-2
                        ${dm ? "text-[#f0f0f0]" : "text-[#111]"}`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Total Cost", val: `₹${priceINR}` },
                        { label: "Servings", val: item.servings },
                        { label: "Likes", val: item.aggregateLikes },
                      ].map(({ label, val }) => (
                        <div key={label} className={`rounded-xl p-2.5 border
                          ${dm ? "bg-[#1e1e1e] border-[#2a2a2a]" : "bg-[#f7f7f5] border-[#eeeeec]"}`}>
                          <p className="text-[9px] text-[#888] uppercase tracking-[0.5px] mb-0.5">{label}</p>
                          <p className={`text-[15px] font-bold tracking-tight ${dm ? "text-[#e0e0e0]" : "text-[#111]"}`}>
                            {val}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <ScoreBar label="Health Score" val={item.healthScore} color="#2ecc7a" />
                      <ScoreBar label="Overall Score" val={item.spoonacularScore} color="#4a90e2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;