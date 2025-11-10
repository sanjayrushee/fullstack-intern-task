import React, { useState, useEffect } from "react";
import axios from "axios";
import TemplateCard from "../Components/TemplateCard";
import SearchBar from "../Components/SearchBar";
import { API_CONFIG } from "../Route&apis/Apiconfig";

const TemplateListPage = () => {
  const [templates, setTemplates] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get(`${API_CONFIG.TemplateLink}/templates`);
        setTemplates(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Template fetch failed", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token || !userId) return; 

      try {
        const res = await axios.get(`${API_CONFIG.TemplateLink}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const ids = res.data.map((item) => item._id);
        setFavoriteIds(new Set(ids));
      } catch (err) {
        console.error("Favorite fetch failed:", err);
      }
    };

    fetchFavorites();
  }, [token, userId]);

  const toggleFavorite = async (templateId) => {
    if (!token) {
      alert("You must login to add favorites!");
      return;
    }

    const alreadyFav = favoriteIds.has(templateId);

    try {
      if (alreadyFav) {
        await axios.delete(`${API_CONFIG.TemplateLink}/favorites/${templateId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(templateId);
          return updated;
        });
      } else {
        await axios.post(
          `${API_CONFIG.TemplateLink}/favorites/${templateId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.add(templateId);
          return updated;
        });
      }
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
  };

  const isFavorited = (id) => favoriteIds.has(id);

  const filteredTemplates = templates.filter((template) => {
    const query = searchQuery.toLowerCase();
    return (
      template.title?.toLowerCase().includes(query) ||
      template.category?.toLowerCase().includes(query)
    );
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Templates</h1>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template._id}
            template={template}
            isFavorited={isFavorited(template._id)}
            onFavoriteClick={() => toggleFavorite(template._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateListPage;
