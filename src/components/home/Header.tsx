
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
          <span className="text-xl font-bold text-slate-800">
            HealthLead Pro
          </span>
        </div>
        <Button onClick={() => navigate("/login")} variant="outline" className="border-slate-200 hover:bg-slate-50">
          Área do Corretor
        </Button>
      </div>
    </header>
  );
};
