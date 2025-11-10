import React, { useState, useEffect } from "react";
import axios from "axios";
import TemplateCard from "../Components/TemplateCard";
import { API_CONFIG } from "../Route&apis/Apiconfig";

const FavoriteTemplatesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${API_CONFIG.TemplateLink}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFavorites(res.data);

        const ids = res.data.map((item) => item._id);
        setFavoriteIds(new Set(ids));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchFavorites();
  }, [token]);

  const toggleFavorite = async (templateId) => {
    try {
      await axios.delete(`${API_CONFIG.TemplateLink}/favorites/${templateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavoriteIds((prev) => {
        const updated = new Set(prev);
        updated.delete(templateId);
        return updated;
      });

      setFavorites((prev) => prev.filter((t) => t._id !== templateId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  const isFavorited = (id) => favoriteIds.has(id);

  if (isLoading) return <div className="p-6">Loading favorites…</div>;
  if (error) return <div className="p-6">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Your Favorites
      </h1>

      {favorites.length === 0 && (
        <p className="text-gray-600">No favorite templates yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((template) => (
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

export default FavoriteTemplatesPage;
