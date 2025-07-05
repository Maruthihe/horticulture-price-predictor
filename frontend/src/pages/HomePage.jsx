import React, { useEffect, useState } from "react";
// If you're having problems with Lucide icons, comment out this import and use the fallback icons
// import { ChevronRight, ChevronLeft, TrendingUp, Cloud, Droplet, LineChart, AlertCircle, Camera, Leaf } from "lucide-react";

const HomePage = () => {
  const [message, setMessage] = useState("Loading...");
  const [username, setUsername] = useState("Farmer");
  const [showPopup, setShowPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  // Simple icon components as fallbacks if Lucide isn't working
  const IconFallbacks = {
    ChevronRight: () => <span className="text-2xl">→</span>,
    ChevronLeft: () => <span className="text-2xl">←</span>,
    TrendingUp: () => <span className="text-2xl">📈</span>,
    Cloud: () => <span className="text-2xl">☁️</span>,
    Droplet: () => <span className="text-2xl">💧</span>,
    LineChart: () => <span className="text-2xl">📊</span>,
    AlertCircle: () => <span className="text-2xl">⚠️</span>,
    Camera: () => <span className="text-2xl">📷</span>,
    Leaf: () => <span className="text-2xl">🌿</span>
  };

  // Use these instead of Lucide icons if they're not loading
  const {
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    Cloud,
    Droplet,
    LineChart,
    AlertCircle,
    Camera,
    Leaf
  } = IconFallbacks;

  const agricultureArticles = [
    {
      title: "Sustainable Farming Practices on the Rise",
      excerpt:
        "Farmers across the country are adopting more sustainable practices to improve soil health and crop yields.",
      imageUrl:
        "https://placehold.co/600x400/green/white?text=Sustainable+Farming",
      date: "May 18, 2025",
    },
    {
      title: "Weather Patterns Shifting for Summer Crops",
      excerpt:
        "Meteorologists predict changing rainfall patterns that may affect planting schedules for summer crops.",
      imageUrl:
        "https://placehold.co/600x400/green/white?text=Weather+Patterns",
      date: "May 15, 2025",
    },
    {
      title: "New Varieties Show Promise for Drought Resistance",
      excerpt:
        "Research reveals new crop varieties that perform well in low-water conditions, offering hope for dry regions.",
      imageUrl:
        "https://placehold.co/600x400/green/white?text=Drought+Resistant+Crops",
      date: "May 10, 2025",
    },
  ];

  // New agricultural image gallery
  const agricultureImages = [
    {
      url: "https://placehold.co/600x400/green/white?text=Wheat+Fields",
      caption: "Wheat fields at sunset"
    },
    {
      url: "https://placehold.co/600x400/green/white?text=Irrigation+Systems",
      caption: "Modern irrigation systems"
    },
    {
      url: "https://placehold.co/600x400/green/white?text=Organic+Harvest",
      caption: "Organic vegetable harvest"
    },
    {
      url: "https://placehold.co/600x400/green/white?text=Drone+Technology",
      caption: "Drone technology in agriculture"
    },
    {
      url: "https://placehold.co/600x400/green/white?text=Greenhouse+Methods",
      caption: "Greenhouse cultivation methods"
    },
    {
      url: "https://placehold.co/600x400/green/white?text=Farm+Equipment",
      caption: "Farm equipment during harvest season"
    }
  ];

  // Agricultural seasons gallery
  const seasonalImages = [
    {
      url: "https://placehold.co/400x300/green/white?text=Spring",
      season: "Spring",
      description: "Planting season with fresh green shoots"
    },
    {
      url: "https://placehold.co/400x300/green/white?text=Summer",
      season: "Summer",
      description: "Growing crops under sunny skies"
    },
    {
      url: "https://placehold.co/400x300/green/white?text=Fall",
      season: "Fall",
      description: "Harvest time with golden fields"
    },
    {
      url: "https://placehold.co/400x300/green/white?text=Winter",
      season: "Winter",
      description: "Planning and soil preparation"
    }
  ];

  // Agricultural innovations gallery
  const innovationImages = [
    {
      url: "https://placehold.co/500x350/green/white?text=Precision+Agriculture",
      title: "Precision Agriculture",
      description: "GPS-guided equipment for improved efficiency"
    },
    {
      url: "https://placehold.co/500x350/green/white?text=Vertical+Farming",
      title: "Vertical Farming",
      description: "Growing crops in vertical stacked layers"
    },
    {
      url: "https://placehold.co/500x350/green/white?text=Smart+Irrigation",
      title: "Smart Irrigation",
      description: "Water-efficient systems with moisture sensors"
    },
    {
      url: "https://placehold.co/500x350/green/white?text=Drone+Monitoring",
      title: "Drone Monitoring",
      description: "Aerial crop surveillance and analytics"
    }
  ];

  const marketTrends = [
    { crop: "Tomatoes", trend: "↑ 8%", forecast: "Rising" },
    { crop: "Onions", trend: "↓ 3%", forecast: "Stable" },
    { crop: "Potatoes", trend: "↑ 5%", forecast: "Rising" },
    { crop: "Cauliflower", trend: "↓ 2%", forecast: "Falling" },
  ];

  const tips = [
    "Monitor soil moisture levels regularly for optimal irrigation",
    "Consider crop rotation to improve soil health and prevent disease",
    "Track market prices weekly to determine the best time to sell",
    "Implement integrated pest management for sustainable crop protection",
  ];

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setMessage(`Welcome, ${username}`);
      setTimeout(() => setShowPopup(true), 1000);
    }, 1000);

    // News carousel interval
    const newsInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % agricultureArticles.length);
    }, 5000);

    // Gallery carousel interval (slower than news)
    const galleryInterval = setInterval(() => {
      setCurrentGalleryImage((prevImage) => (prevImage + 1) % agricultureImages.length);
    }, 7000);

    return () => {
      clearInterval(newsInterval);
      clearInterval(galleryInterval);
    };
  }, [username, agricultureArticles.length, agricultureImages.length]);

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout clicked");
    // You can add redirect logic here
  };

  const navigateGallery = (direction) => {
    if (direction === "next") {
      setCurrentGalleryImage((prev) => (prev + 1) % agricultureImages.length);
    } else {
      setCurrentGalleryImage((prev) => (prev === 0 ? agricultureImages.length - 1 : prev - 1));
    }
  };

  // Add Tailwind CSS directly in the head if it's not being loaded
  useEffect(() => {
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    document.head.appendChild(linkEl);

    return () => {
      document.head.removeChild(linkEl);
    };
  }, []);

  return (
    <div className="bg-green-50 min-h-screen p-8" style={{ backgroundColor: "#f0fdf4" }}>
      {/* Hero Section with Welcome Message */}
      <div className="flex justify-between items-center mb-8" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 className="text-3xl font-bold text-green-800" style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#166534" }}>
            FarmAssist Dashboard
          </h1>
          <p className="text-gray-600" style={{ color: "#4b5563" }}>{message}</p>
        </div>

      </div>

      {/* Agricultural Image Gallery - MAIN GALLERY */}
      <div className="mb-12" style={{ marginBottom: "3rem" }}>
        <div className="flex justify-between items-center mb-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 className="text-3xl font-bold text-green-800" style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#166534" }}>
            Agriculture Gallery
          </h2>
          <div className="flex gap-2" style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => navigateGallery("prev")}
              className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#dcfce7", borderRadius: "9999px", width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ChevronLeft size={24} color="#166534" />
            </button>
            <button
              onClick={() => navigateGallery("next")}
              className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#dcfce7", borderRadius: "9999px", width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ChevronRight size={24} color="#166534" />
            </button>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden h-96" style={{ position: "relative", borderRadius: "0.5rem", overflow: "hidden", height: "24rem" }}>
          {agricultureImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 bg-green-50 flex flex-col ${index === currentGalleryImage ? "opacity-100" : "opacity-0"
                }`}
              style={{
                position: "absolute",
                inset: "0px",
                width: "100%",
                height: "100%",
                transition: "opacity 500ms",
                backgroundColor: "#f0fdf4",
                display: "flex",
                flexDirection: "column",
                opacity: index === currentGalleryImage ? "1" : "0"
              }}
            >
              <div
                className="h-80 bg-cover bg-center"
                style={{
                  height: "20rem",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${image.url})`
                }}
              ></div>
              <div className="px-4 py-3 bg-green-800 text-white font-medium flex items-center gap-2"
                style={{ padding: "0.75rem 1rem", backgroundColor: "#166534", color: "white", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Camera size={16} />
                {image.caption}
              </div>
            </div>
          ))}

          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-10"
            style={{ position: "absolute", bottom: "4rem", left: "0", right: "0", display: "flex", justifyContent: "center", gap: "0.5rem", zIndex: "10" }}>
            {agricultureImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentGalleryImage(index)}
                className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer ${index === currentGalleryImage ? "bg-green-800" : "bg-white bg-opacity-70"
                  }`}
                style={{
                  width: "0.625rem",
                  height: "0.625rem",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: index === currentGalleryImage ? "#166534" : "rgba(255, 255, 255, 0.7)"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Latest Agricultural News */}
      <div className="mb-12" style={{ marginBottom: "3rem" }}>
        <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#166534", marginBottom: "1.5rem" }}>
          Latest Agricultural News
        </h2>
        <div className="flex overflow-hidden" style={{ display: "flex", overflow: "hidden" }}>
          {agricultureArticles.map((article, index) => (
            <div
              key={index}
              className={`${index === currentSlide ? "flex" : "hidden"
                } flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md w-full`}
              style={{
                display: index === currentSlide ? "flex" : "none",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                width: "100%"
              }}
            >
              <div
                className="md:w-2/5 h-64 bg-cover bg-center"
                style={{
                  height: "16rem",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${article.imageUrl})`
                }}
              ></div>
              <div className="md:w-3/5 p-8" style={{ padding: "2rem" }}>
                <p className="text-green-600 font-semibold" style={{ color: "#059669", fontWeight: "600" }}>{article.date}</p>
                <h3 className="text-2xl font-bold mb-2" style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{article.title}</h3>
                <p className="text-gray-600" style={{ color: "#4b5563" }}>{article.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Seasonal Agriculture Gallery */}
      <div className="mb-12" style={{ marginBottom: "3rem" }}>
        <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2"
          style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#166534", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Cloud size={24} />
          Seasonal Agriculture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: "1rem" }}>
          {seasonalImages.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "white", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  height: "12rem",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${item.url})`
                }}
              ></div>
              <div className="p-4" style={{ padding: "1rem" }}>
                <h3 className="text-xl font-bold text-green-800 mb-1"
                  style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#166534", marginBottom: "0.25rem" }}>{item.season}</h3>
                <p className="text-gray-600" style={{ color: "#4b5563" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trends Section */}
      <div className="mb-12" style={{ marginBottom: "3rem" }}>
        <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#166534", marginBottom: "1.5rem" }}>
          Market Trends
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: "1rem" }}>
          {marketTrends.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm"
              style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
              <h4 className="text-xl font-bold text-green-800"
                style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#166534" }}>{item.crop}</h4>
              <p className="text-base my-2" style={{ fontSize: "1rem", margin: "0.5rem 0" }}>Trend: <strong>{item.trend}</strong></p>
              <p className="text-gray-600" style={{ color: "#4b5563" }}>Forecast: {item.forecast}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Tips */}
      <div className="mb-16" style={{ marginBottom: "4rem" }}>
        <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#166534", marginBottom: "1.5rem" }}>
          Farming Tips
        </h2>
        <ul className="list-disc pl-6 text-gray-600" style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "#4b5563" }}>
          {tips.map((tip, index) => (
            <li key={index} className="mb-2" style={{ marginBottom: "0.5rem" }}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Welcome Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ position: "fixed", inset: "0px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "50" }}>
          <div className="bg-white p-8 rounded-lg shadow-xl text-center"
            style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", textAlign: "center" }}>
            <h3 className="text-2xl font-bold mb-4 text-green-600"
              style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#059669" }}>
              Welcome back, {username}!
            </h3>
            <p className="mb-6" style={{ marginBottom: "1.5rem" }}>Check out the latest updates to stay ahead in agriculture.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-green-600 text-white px-5 py-2 rounded-md font-medium"
              style={{ backgroundColor: "#059669", color: "white", padding: "0.5rem 1.25rem", borderRadius: "0.375rem", fontWeight: "500" }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;