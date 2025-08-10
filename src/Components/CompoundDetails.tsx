import { useEffect, useState } from "react";
import CompoundCard, { type Compound } from "./CompoundCard";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button } from "./ui/button";
import { ArrowLeft, Car, Cross, Edit, Save } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

import { frontendCompoundSchema } from "../utils/compoundFormSchema";
export default function CompoundDetails() {
  const { id } = useParams<{ id: string }>();
  const [compound, setCompound] = useState<Compound | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    CompoundName: "",
    strImageSource: "",
    CompoundDescription: "",
  });

  console.log(errors);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/compounds/${id}`
        );
        setCompound(res.data);
        setFormData({
          CompoundName: res.data?.CompoundName || "",
          strImageSource: res.data?.strImageSource || "",
          CompoundDescription: res.data?.CompoundDescription || "",
        });
      } catch (err) {
        setError("Failed to load compound details.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, isEditable]);

  console.log(compound);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleCancel = () => {
    setFormData({
      CompoundName: compound?.CompoundName || "",
      strImageSource: compound?.strImageSource || "",
      CompoundDescription: compound?.CompoundDescription || "",
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = frontendCompoundSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [field, messages] of Object.entries(
        validation.error.flatten().fieldErrors
      )) {
        if (messages && messages.length > 0) {
          fieldErrors[field] = messages[0];
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // ✅ No validation errors
    setErrors({});
    try {
      const res = await axios.put(
        `http://localhost:3000/api/compounds/${id}`,
        formData
      );

      setCompound(res.data); // Update UI immediately
      setIsEditable(false);
    } catch {
      setError("Failed to update compound.");
    } // redirect after save
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!compound) return <div>No data found.</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex mb-6 item-center gap-6">
          <Button
            className="border-none shadow-sm shadow-bg-gray-500 font-bold hover:bg-blue-100"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft></ArrowLeft>
            Back to gallery
          </Button>
          <Button
            className="border-none shadow-sm shadow-bg-gray-500 font-bold hover:bg-blue-100"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            <Edit></Edit>
            Edit Compound
          </Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start mt-20">
          <div className="space-y-6">
            <Card className="bg-white/95 shadow-sm border-gray-200 py-6">
              <img src={compound.strImageSource} className="bg-gray-200"></img>
            </Card>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {compound.CompoundName}
            </h1>
            <Card className="bg-white/95 shadow-sm border-gray-200 py-6">
              <CardHeader className="font-bold text-2xl text-gray-600">
                Description
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed text-lg">
                {compound.CompoundDescription}
              </CardContent>
            </Card>
            {isEditable && (
              <div className="space-y-6">
                <Card className="bg-white/95 shadow-sm border-gray-200 py-6">
                  <CardHeader className="text-xl font-bold">
                    Edit Compound: {compound.CompoundName}
                  </CardHeader>
                  <CardContent className="px-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label className="text-sm" htmlFor="CompoundName">
                          Compound Name
                        </label>
                        <Input
                          className="border-none shadow-lg shadow-gray-500 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs    md:text-sm bg-gray-100 focus-visible:ring-ring/50 focus-visible:ring-[1px] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 "
                          id="CompoundName"
                          value={formData.CompoundName}
                          onChange={handleChange}
                        />
                        {errors.CompoundName && (
                          <p className="text-red-500">{errors.CompoundName}</p>
                        )}
                      </div>

                      {/* Compound Image */}
                      <div className="space-y-2">
                        <label htmlFor="strImageSource">
                          Compound Image URL
                        </label>
                        <Input
                          className="border-none shadow-lg shadow-gray-500 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs    md:text-sm bg-gray-100 focus-visible:ring-ring/50 focus-visible:ring-[1px] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 "
                          id="strImageSource"
                          value={formData.strImageSource}
                          onChange={handleChange}
                        />
                        {errors.strImageSource && (
                          <p className="text-red-500">
                            {errors.strImageSource}
                          </p>
                        )}
                      </div>

                      {/* Compound Description */}
                      <div className="space-y-2">
                        <label htmlFor="CompoundDescription">
                          Compound Description
                        </label>
                        <textarea
                          id="CompoundDescription"
                          value={formData.CompoundDescription}
                          onChange={handleChange}
                          className="h-[75px] w-full resize-none rounded-md bg-gray-100 p-2 text-base md:text-sm shadow-lg shadow-gray-500 focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[1px] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100"
                        />
                        {errors.CompoundDescription && (
                          <p className="text-red-500">
                            {errors.CompoundDescription}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button
                          className=" border-none shadow-sm shadow-bg-gray-500 flex-1 bg-black text-white items-center"
                          onClick={() => {
                            handleSubmit;
                          }}
                          type="submit"
                        >
                          <Save></Save>
                          Save Changes
                        </Button>
                        <Button
                          className="flex-1 border-none shadow-sm shadow-bg-gray-500"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
