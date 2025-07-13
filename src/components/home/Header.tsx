
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
            HealthLead Pro
          </span>
        </div>
        <Button onClick={() => navigate("/login")} variant="outline" className="border-orange-200 hover:bg-orange-50">
          Área do Cliente
        </Button>
      </div>
    </header>
  );
};
