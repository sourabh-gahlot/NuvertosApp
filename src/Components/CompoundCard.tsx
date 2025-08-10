import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription } from "./ui/card";
import axios from "axios";
import { Pagination } from "./Pagination";
import { useNavigate } from "react-router";

 export interface Compound {
  id: number;
  CompoundName: string;
  CompoundDescription: string;
  strImageSource: string;
  strImageAttribution: string;
}

export default function CompoundCard() {
  const [compounds, setCompounds] = useState<Compound[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log(currentPage);
  useEffect(() => {
    const fetchCompounds = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/compounds?page=${currentPage}&limit=10`
        );
        setCompounds(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching compounds:", error);
        setError("Failed to load compounds. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompounds();
  }, [currentPage]); // Add currentPage as dependency

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleNavigation = (id: number) => {
    navigate(`/compound/${id}`);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading compounds...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {compounds.map((compound) => (
          <Card
            key={compound.id}
            className="border-none shadow-sm shadow-gray-100 bg-gradient-to-br from-purple-50 to-pink-100 to-blue-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative overflow-hidden rounded-md m-1">
              <img
                className="h-[200px] w-full object-cover bg-white-100"
                src={compound.strImageSource}
                alt={compound.CompoundName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                }}
              />
            </div>
            <Card className="border-none shadow-none p-4 bg-white m-2">
              <div className="flex items-center justify-center mb-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {compound.CompoundName}
                </h3>
              </div>
              <CardDescription className="line-clamp-3">
                {compound.CompoundDescription}
              </CardDescription>
            </Card>
            <div className="m-4 mb-1">
              <Button
                className="bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm w-full"
                onClick={() => handleNavigation(compound.id)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-2">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
