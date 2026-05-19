import { useEffect } from "react";

const Food_Page = ({ food, onBack, darkMode }) => {
    const dm = darkMode;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    if (!food) return null;

    const priceINR = ((food.pricePerServing / 100) * 84).toFixed(2);

    const dietTags = [
        food.glutenFree && "Gluten Free",
        food.dairyFree && "Dairy Free",
        food.vegan && "Vegan",
        food.vegetarian && "Vegetarian",
        food.veryHealthy && "Very Healthy",
        food.cheap && "Budget",
    ].filter(Boolean);

    return (

        <div className={`min-h-screen transition-colors ${dm ? "bg-[#0e0e0e] text-[#f0f0f0]" : "bg-white text-[#111]"}`}>
            <div className="max-w-4xl mx-auto px-4 py-6">

                <button onClick={onBack} className={`mb-6 flex items-center gap-1.5 text-sm border rounded-lg px-3 py-1.5 transition-colors
            ${dm
                        ? "text-[#aaa] border-[#333] hover:bg-[#1a1a1a]"
                        : "text-gray-500 border-gray-200 hover:bg-gray-50"}`}
                >
                    ← Back to results
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                        <img src={food.image} alt={food.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col gap-5">

                        <div>
                            <p className="text-xs uppercase tracking-wide text-[#888] font-medium mb-1">
                                {food.dishTypes?.[0] || "—"} · {food.cuisines?.[0] || "International"}
                            </p>
                            <h1 className="text-2xl font-semibold leading-snug">{food.title}</h1>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Ready in", value: `${food.readyInMinutes} min` },
                                { label: "Servings", value: food.servings },
                                { label: "Total Cost", value: `₹${priceINR}` },
                                { label: "Likes", value: food.aggregateLikes },
                            ].map(({ label, value }) => (
                                <div key={label}
                                    className={`rounded-xl px-4 py-3 border
                    ${dm ? "bg-[#141414] border-[#222]" : "bg-gray-50 border-gray-100"}`}>
                                    <p className="text-xs text-[#888] mb-0.5">{label}</p>
                                    <p className="text-lg font-semibold">{value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-6">
                            {[
                                { label: "Health score", val: food.healthScore, color: "bg-teal-500" },
                                { label: "Overall score", val: food.spoonacularScore, color: "bg-blue-500" },
                            ].map(({ label, val, color }) => (
                                <div key={label} className="flex-1">
                                    <p className="text-xs text-[#888] mb-1">{label}</p>
                                    <div className={`h-1.5 rounded-full overflow-hidden mb-1
                    ${dm ? "bg-[#2a2a2a]" : "bg-gray-200"}`}>
                                        <div className={`h-full ${color} rounded-full`} style={{ width: `${(val / 100) * 100}%` }} />
                                    </div>
                                    <p className="text-sm font-medium">{Math.round(val)} / 100</p>
                                </div>
                            ))}
                        </div>

                        {dietTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {dietTags.map((tag) => (
                                    <span key={tag}
                                        className={`text-xs px-3 py-1 rounded-full font-medium
                      ${dm ? "bg-[#1e1e1e] border border-[#333] text-[#ccc]" : "bg-gray-100 text-gray-600"}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <a href={food.sourceUrl} target="_blank" rel="noreferrer"
                                className={`flex items-center gap-1 text-sm border rounded-lg px-3 py-1.5 no-underline transition-colors
                  ${dm ? "text-[#aaa] border-[#333] hover:bg-[#1a1a1a]" : "text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                                ↗ Source recipe
                            </a>
                            <a href={food.spoonacularSourceUrl} target="_blank" rel="noreferrer"
                                className={`flex items-center gap-1 text-sm border rounded-lg px-3 py-1.5 no-underline transition-colors
                  ${dm ? "text-[#aaa] border-[#333] hover:bg-[#1a1a1a]" : "text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                                ↗ Spoonacular
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`border-t pt-8 ${dm ? "border-[#222]" : "border-gray-100"}`}>

                    <div
                        className={`text-sm leading-7 mb-8 prose prose-sm max-w-none
              ${dm ? "text-[#bbb] prose-invert" : "text-gray-600"}`}
                        dangerouslySetInnerHTML={{ __html: `<strong>Recipe:</strong> ${food.summary}` }}
                    />

                    <p className={`text-sm font-semibold mb-3 ${dm ? "text-[#e0e0e0]" : "text-[#111]"}`}>
                        Ingredients{" "}
                        <span className="font-normal text-[#888]">— {food.extendedIngredients?.length || 0} items</span>
                    </p>

                    <div className="grid grid-cols-1 [@media(min-width:480px)]:grid-cols-2 sm:grid-cols-3 gap-2">
                        {food.extendedIngredients?.map((ing, i) => (
                            <div key={i}
                                className={`flex items-center gap-2 text-sm rounded-xl px-3 py-2.5
                  ${dm ? "bg-[#141414] text-[#ccc] border border-[#222]" : "bg-gray-50 text-gray-600"}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                                {ing.original}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Food_Page;